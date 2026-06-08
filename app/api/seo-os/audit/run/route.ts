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
    const validSecrets = [
      process.env.CRON_SECRET || 'seo-os-automated-trigger-2026',
      process.env.DASHBOARD_PASSWORD || '@Zuhaib467'
    ];
    
    if (!validSecrets.includes(body.token)) {
        console.error('[Manual Audit] Unauthorized token attempt.');
        return NextResponse.json({ error: `Unauthorized. Received token mismatch.` }, { status: 401 });
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
