import { NextResponse } from 'next/server';
import { getPerformanceReport } from '@/lib/seo-os/analytics-engine';

export const dynamic = 'force-dynamic';

export async function GET() {
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
    
    // Provide a more helpful error message for common issues
    let userFriendlyError = error.message;
    if (error.message.includes('403')) {
      userFriendlyError = `Access Denied (403): Ensure the service account email is added as a 'Full' user to the property in Google Search Console. [Site: ${process.env.GSC_SITE_URL || 'https://usmantrades.co.uk/'}]`;
    } else if (error.message.includes('404')) {
      userFriendlyError = `Property Not Found (404): The site URL "${process.env.GSC_SITE_URL}" was not found in your GSC account. Ensure it matches exactly.`;
    }

    return NextResponse.json({ 
      success: false, 
      error: userFriendlyError,
      data: [],
      debug: {
        siteUrl: process.env.GSC_SITE_URL,
        clientEmail: process.env.GSC_CLIENT_EMAIL ? `${process.env.GSC_CLIENT_EMAIL.slice(0, 5)}...${process.env.GSC_CLIENT_EMAIL.slice(-10)}` : 'missing',
        hasKey: !!process.env.GSC_PRIVATE_KEY
      }
    }, { status: 500 });
  }
}
