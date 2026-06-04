import { NextResponse } from 'next/server';
import { getRoadmap, saveRoadmap } from '@/lib/seo-os/roadmap-engine';

export const dynamic = 'force-dynamic';

export async function GET() {
  const roadmap = getRoadmap();
  return NextResponse.json(roadmap);
}

export async function POST(request: Request) {
  try {
    const { action, status } = await request.json();
    const roadmap = getRoadmap();
    
    if (!roadmap) return NextResponse.json({ error: 'No roadmap found' }, { status: 404 });

    if (action === 'toggle-status' && status) {
      roadmap.systemStatus = status;
      saveRoadmap(roadmap);
      return NextResponse.json({ success: true, status: roadmap.systemStatus });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}