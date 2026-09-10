import { NextResponse } from 'next/server';
import { getRoadmap, saveRoadmap } from '@/lib/seo-os/roadmap-engine';
import { logAgentAction } from '@/lib/seo-os/log-engine';

export const dynamic = 'force-dynamic';

export async function GET() {
  const roadmap = await getRoadmap();
  return NextResponse.json(roadmap);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const { action, status } = body;
    const roadmap = await getRoadmap();
    
    if (!roadmap) return NextResponse.json({ error: 'No roadmap found' }, { status: 404 });

    if (action === 'toggle-status') {
      if (!status || (status !== 'active' && status !== 'paused')) {
        return NextResponse.json({ error: 'Status must be "active" or "paused".' }, { status: 400 });
      }
      roadmap.systemStatus = status;
      await saveRoadmap(roadmap);
      
      if (status === 'active') {
        await logAgentAction('Orchestrator', 'success', 'Professional SEO Experts Activated. System in high-alert mode.');
      } else {
        await logAgentAction('Orchestrator', 'idle', 'System Hibernated. Agents on standby.');
      }

      return NextResponse.json({ success: true, status: roadmap.systemStatus });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
