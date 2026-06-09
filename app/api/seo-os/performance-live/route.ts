import { NextResponse } from 'next/server';
import { getPerformanceReport } from '@/lib/seo-os/analytics-engine';
import { verifyApiAuth } from '@/lib/seo-os/auth';
import { apiLimiter, getIdentifier } from '@/lib/seo-os/rate-limit';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Rate limit
  const id = getIdentifier(request);
  const { success: withinLimit } = await apiLimiter.limit(id);
  if (!withinLimit) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  // Auth check
  const auth = verifyApiAuth(request);
  if (auth instanceof NextResponse) return auth;

  console.log('[API] Performance Request Received');
  try {
    const siteUrl = process.env.GSC_SITE_URL || 'https://usmantrades.co.uk/';
    const reports = await getPerformanceReport();
    console.log(`[API] Performance data returned: ${reports.length} rows for ${siteUrl}`);
    return NextResponse.json({ 
      success: true, 
      data: reports,
      siteUrl: siteUrl 
    });
  } catch (error: any) {
    console.error('[API] Performance Error:', error.message);
    
    // User-friendly error messages — no internal config details exposed
    let userFriendlyError = 'Failed to fetch performance data. Check server logs.';
    if (error.message.includes('403')) {
      userFriendlyError = 'Access Denied (403): Ensure the GSC service account has Full access to the property.';
    } else if (error.message.includes('404')) {
      userFriendlyError = 'Property Not Found (404): The GSC site URL may not match your account property exactly.';
    } else if (error.message.includes('Missing GSC credentials')) {
      userFriendlyError = 'GSC credentials are not configured. Set GSC_CLIENT_ID, GSC_CLIENT_SECRET, and GSC_REFRESH_TOKEN in your environment variables.';
    }

    return NextResponse.json({ 
      success: false, 
      error: userFriendlyError,
      data: [],
    }, { status: 500 });
  }
}
