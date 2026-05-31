import { NextResponse } from 'next/server';
import { getPerformanceReport } from '@/lib/seo-os/analytics-engine';

export async function GET() {
  try {
    const reports = await getPerformanceReport();
    return NextResponse.json(reports);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
