import { NextResponse } from 'next/server';
import { getPerformanceReport } from '@/lib/seo-os/analytics-engine';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const siteUrl = process.env.GSC_SITE_URL || 'https://usmantrades.co.uk/';
    const reports = await getPerformanceReport();
    return NextResponse.json({ success: true, data: reports, siteUrl });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message, data: [] }, { status: 500 });
  }
}
