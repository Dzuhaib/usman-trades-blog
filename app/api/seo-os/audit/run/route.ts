import { NextResponse } from 'next/server';
import { getPerformanceReport } from '@/lib/seo-os/analytics-engine';
import { performComprehensiveAudit, delegateAuditTasks } from '@/lib/seo-os/ai-engine';
import { saveAuditReport } from '@/lib/seo-os/audit-engine';
import { updateRoadmapWithNewTasks } from '@/lib/seo-os/roadmap-engine';
import { logAgentAction } from '@/lib/seo-os/log-engine';
import { verifyApiAuth } from '@/lib/seo-os/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const auth = await verifyApiAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    await logAgentAction('Audit Agent', 'active', 'Manual audit triggered.');
    const gscData = await getPerformanceReport();

    const audit = await performComprehensiveAudit(gscData);
    await saveAuditReport({ ...audit, timestamp: new Date().toISOString() });

    const newTasks = await delegateAuditTasks(audit);
    await updateRoadmapWithNewTasks(newTasks);

    await logAgentAction('Audit Agent', 'success', `Manual audit complete. Delegated ${newTasks.length} tasks.`);

    return NextResponse.json({ success: true, delegatedCount: newTasks.length });
  } catch (error: any) {
    console.error('Manual Audit Error Details:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
