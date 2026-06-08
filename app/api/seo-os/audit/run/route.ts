import { NextResponse } from 'next/server';
import { getPerformanceReport } from '@/lib/seo-os/analytics-engine';
import { performComprehensiveAudit, delegateAuditTasks } from '@/lib/seo-os/ai-engine';
import { saveAuditReport } from '@/lib/seo-os/audit-engine';
import { updateRoadmapWithNewTasks } from '@/lib/seo-os/roadmap-engine';
import { logAgentAction } from '@/lib/seo-os/log-engine';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Define valid secrets
    const expectedCron = process.env.CRON_SECRET || 'seo-os-automated-trigger-2026';
    const expectedDash = process.env.DASHBOARD_PASSWORD || '@Zuhaib467';
    const received = body.token;
    
    if (received !== expectedCron && received !== expectedDash) {
        console.error(`[Manual Audit] Unauthorized. Received: "${received}", Expected: "${expectedCron}" or "${expectedDash}"`);
        return NextResponse.json({ 
            error: `Unauthorized.`,
        }, { status: 401 });
    }

    await logAgentAction('Audit Agent', 'active', 'Manual audit triggered.');
    const gscData = await getPerformanceReport();
    
    // Perform Audit
    const audit = await performComprehensiveAudit(gscData);
    await saveAuditReport({ ...audit, timestamp: new Date().toISOString() });
    
    // Delegate Tasks
    const newTasks = await delegateAuditTasks(audit);
    await updateRoadmapWithNewTasks(newTasks);

    await logAgentAction('Audit Agent', 'success', `Manual audit complete. Delegated ${newTasks.length} tasks.`);
    
    return NextResponse.json({ success: true, delegatedCount: newTasks.length });
  } catch (error: any) {
    console.error('Manual Audit Error Details:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
