import { NextResponse } from 'next/server';
import { getAuditReport } from '@/lib/seo-os/audit-engine';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const report = await getAuditReport();
    return NextResponse.json(report || { technical: 'No audit run yet.', seo: 'No audit run yet.', geo: 'No audit run yet.', aio: 'No audit run yet.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
