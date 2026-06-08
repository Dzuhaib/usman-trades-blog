import { NextResponse } from 'next/server';
import { getPerformanceReport } from '@/lib/seo-os/analytics-engine';
import { performComprehensiveAudit } from '@/lib/seo-os/ai-engine';
import { saveAuditReport } from '@/lib/seo-os/audit-engine';
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
            error: `Unauthorized. Received token "${received}" does not match secrets.`,
            received: received,
            expected: [expectedCron, expectedDash] 
        }, { status: 401 });
    }

    await logAgentAction('Audit Agent', 'active', 'Manual audit triggered.');
    const gscData = await getPerformanceReport();
    const audit = await performComprehensiveAudit(gscData);
    await saveAuditReport({ ...audit, timestamp: new Date().toISOString() });
    
    await logAgentAction('Audit Agent', 'success', 'Manual audit complete.');
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Manual Audit Error Details:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
