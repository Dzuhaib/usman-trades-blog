import { NextResponse } from 'next/server';
import { getPerformanceReport } from '@/lib/seo-os/analytics-engine';

export const dynamic = 'force-dynamic';

export async function GET() {
  console.log('[API] Performance Request Received');
  try {
    const reports = await getPerformanceReport();
    console.log(`[API] Performance data returned: ${reports.length} rows`);
    return NextResponse.json({ success: true, data: reports });
  } catch (error: any) {
    console.error('[API] Performance Error:', error.message);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      data: [] 
    }, { status: 500 });
  }
}
