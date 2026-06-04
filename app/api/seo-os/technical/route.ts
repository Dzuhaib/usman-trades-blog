import { NextResponse } from 'next/server';
import { getTechnicalAudit, resolveTechnicalIssue } from '@/lib/seo-os/technical-engine';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const issues = await getTechnicalAudit();
    return NextResponse.json({ success: true, issues });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    const success = await resolveTechnicalIssue(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
