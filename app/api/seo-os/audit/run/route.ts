import { NextResponse } from 'next/server';
import { getPerformanceReport } from '@/lib/seo-os/analytics-engine';
import { performComprehensiveAudit } from '@/lib/seo-os/ai-engine';
import { saveAuditReport } from '@/lib/seo-os/audit-engine';
import { logAgentAction } from '@/lib/seo-os/log-engine';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('[Manual Audit] Request received.');
    
    if (body.token !== (process.env.CRON_SECRET || 'seo-os-automated-trigger-2026')) {
        console.error('[Manual Audit] Unauthorized token attempt.');
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await logAgentAction('Audit Agent', 'active', 'Manual audit triggered.');
    console.log('[Manual Audit] Fetching GSC data...');
    const gscData = await getPerformanceReport();
    
    console.log('[Manual Audit] Performing AI Audit...');
    const audit = await performComprehensiveAudit(gscData);
    
    console.log('[Manual Audit] Saving report...');
    await saveAuditReport({ ...audit, timestamp: new Date().toISOString() });
    
    await logAgentAction('Audit Agent', 'success', 'Manual audit complete.');
    console.log('[Manual Audit] Success.');
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Manual Audit Error Details:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
