import { NextResponse } from 'next/server';
import { getRoadmap, saveRoadmap } from '@/lib/seo-os/roadmap-engine';
import { logAgentAction } from '@/lib/seo-os/log-engine';
import { verifyApiAuth } from '@/lib/seo-os/auth';
import { apiLimiter, getIdentifier } from '@/lib/seo-os/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const id = getIdentifier(request);
  const { success: withinLimit } = await apiLimiter.limit(id);
  if (!withinLimit) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  const auth = await verifyApiAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const roadmap = await getRoadmap();
    if (!roadmap) {
      return NextResponse.json({ error: 'No roadmap found' }, { status: 404 });
    }

    let resetCount = 0;
    roadmap.tasks.forEach(task => {
      if (task.status === 'completed') {
        task.status = 'pending';
        task.pipeline = [];
        task.publishedUrl = undefined;
        task.completedAt = undefined;
        task.rawContent = null;
        task.reviewedContent = null;
        task.finalContent = null;
        resetCount++;
      }
    });

    roadmap.updatedAt = new Date().toISOString();
    await saveRoadmap(roadmap);

    await logAgentAction('Orchestrator', 'success', `Reset ${resetCount} completed tasks back to pending for re-execution.`);

    return NextResponse.json({ success: true, resetCount });
  } catch (error: any) {
    console.error('[Reset Tasks Error]:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
