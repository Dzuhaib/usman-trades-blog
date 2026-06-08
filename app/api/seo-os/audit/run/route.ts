import { NextResponse } from 'next/server';
import { getPerformanceReport } from '@/lib/seo-os/analytics-engine';
import { performComprehensiveAudit } from '@/lib/seo-os/ai-engine';
import { saveAuditReport } from '@/lib/seo-os/audit-engine';
import { logAgentAction } from '@/lib/seo-os/log-engine';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    if (token !== (process.env.CRON_SECRET || 'seo-os-automated-trigger-2026')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await logAgentAction('Audit Agent', 'active', 'Manual audit triggered.');
    const gscData = await getPerformanceReport();
    const audit = await performComprehensiveAudit(gscData);
    await saveAuditReport({ ...audit, timestamp: new Date().toISOString() });
    await logAgentAction('Audit Agent', 'success', 'Manual audit complete.');
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Manual Audit Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
