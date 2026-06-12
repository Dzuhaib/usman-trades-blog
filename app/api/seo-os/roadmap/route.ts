import { NextResponse } from 'next/server';
import { getRoadmap, saveRoadmap, RoadmapTask, TaskType } from '@/lib/seo-os/roadmap-engine';
import { logAgentAction } from '@/lib/seo-os/log-engine';
import { verifyApiAuth } from '@/lib/seo-os/auth';
import { apiLimiter, getIdentifier } from '@/lib/seo-os/rate-limit';
import { runDailyCycle } from '@/lib/seo-os/orchestrator';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Rate limit
  const id = getIdentifier(request);
  const { success: withinLimit } = await apiLimiter.limit(id);
  if (!withinLimit) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  // Auth check
  const auth = await verifyApiAuth(request);
  if (auth instanceof NextResponse) return auth;

  const roadmap = await getRoadmap();
  return NextResponse.json(roadmap);
}

export async function POST(request: Request) {
  // Rate limit
  const id = getIdentifier(request);
  const { success: withinLimit } = await apiLimiter.limit(id);
  if (!withinLimit) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  // Auth check
  const auth = await verifyApiAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const { action, status, task } = body;
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
        runDailyCycle(true).catch(e => console.error('[Cycle] Background cycle error:', e));
      } else {
        await logAgentAction('Orchestrator', 'idle', 'System Hibernated. Agents on standby.');
      }

      return NextResponse.json({ success: true, status: roadmap.systemStatus });
    }

    if (action === 'add-task') {
      if (!task || typeof task !== 'object' || !task.keyword || typeof task.keyword !== 'string') {
        return NextResponse.json({ error: 'Task must have a valid keyword.' }, { status: 400 });
      }

      const validTypes = ['article', 'tool_improvement', 'faq', 'glossary'];
      const validPriorities = ['high', 'medium', 'low'];

      const taskTypeMap: Record<string, TaskType> = {
        article: 'CREATE_CONTENT',
        tool_improvement: 'TOOL_IMPROVEMENT',
        faq: 'CREATE_CONTENT',
        glossary: 'GLOSSARY_ENTRY',
      };

      const newTask: RoadmapTask = {
        day: roadmap.tasks.length + 1,
        keyword: task.keyword,
        task_type: taskTypeMap[task.type] || 'CREATE_CONTENT',
        priority: validPriorities.includes(task.priority) ? task.priority : 'high',
        status: 'pending',
        expert_note: task.expert_note || 'Manually approved opportunity.',
        pipeline: [
          { agent: 'Writer Agent', status: 'pending' as const, message: 'Waiting for research context.' },
          { agent: 'Review Agent', status: 'pending' as const, message: 'Waiting for content draft.' },
          { agent: 'Linking Agent', status: 'pending' as const, message: 'Waiting for final polish.' },
          { agent: 'Publish Agent', status: 'pending' as const, message: 'Waiting for deployment signal.' },
        ]
      };
      
      roadmap.tasks.unshift(newTask);
      await saveRoadmap(roadmap);
      
      await logAgentAction('Strategist Agent', 'success', `Manually approved task added: ${task.keyword}`);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
