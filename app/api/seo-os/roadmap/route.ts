import { NextResponse } from 'next/server';
import { getRoadmap, saveRoadmap } from '@/lib/seo-os/roadmap-engine';
import { logAgentAction } from '@/lib/seo-os/log-engine';

export const dynamic = 'force-dynamic';

export async function GET() {
  const roadmap = getRoadmap();
  return NextResponse.json(roadmap);
}

export async function POST(request: Request) {
  try {
    const { action, status, task } = await request.json();
    const roadmap = getRoadmap();
    
    if (!roadmap) return NextResponse.json({ error: 'No roadmap found' }, { status: 404 });

    if (action === 'toggle-status' && status) {
      roadmap.systemStatus = status;
      saveRoadmap(roadmap);
      
      if (status === 'active') {
        logAgentAction('Orchestrator', 'success', 'Professional SEO Experts Activated. System in high-alert mode.');
        logAgentAction('Monitor Agent', 'active', 'Standing by for performance shifts...');
        logAgentAction('Researcher Agent', 'active', 'Scanning market trends for new opportunities...');
      } else {
        logAgentAction('Orchestrator', 'idle', 'System Hibernated. Agents on standby.');
      }

      return NextResponse.json({ success: true, status: roadmap.systemStatus });
    }

    if (action === 'add-task' && task) {
      // Add the new expert task to the top of the pending list
      const newTask = {
        day: roadmap.tasks.length + 1,
        keyword: task.keyword,
        type: task.type || 'article',
        priority: task.priority || 'high',
        status: 'pending' as const,
        expert_note: task.expert_note || 'Manually approved opportunity.'
      };
      
      roadmap.tasks.unshift(newTask);
      saveRoadmap(roadmap);
      
      logAgentAction('Strategist Agent', 'success', `Manually approved task added: ${task.keyword}`);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}