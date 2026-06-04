import { NextResponse } from 'next/server';
import { getTechnicalAudit } from '@/lib/seo-os/technical-engine';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const issues = getTechnicalAudit();
    return NextResponse.json({ success: true, issues });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
