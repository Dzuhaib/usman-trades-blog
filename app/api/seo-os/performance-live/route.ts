import { NextResponse } from 'next/server';
import { getPerformanceReport } from '@/lib/seo-os/analytics-engine';

export const dynamic = 'force-dynamic';

export async function GET() {
  console.log('[API] Performance Request Received');
  try {
    const reports = await getPerformanceReport();
    console.log(`[API] Performance data returned: ${reports.length} rows`);
    return NextResponse.json(reports);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
