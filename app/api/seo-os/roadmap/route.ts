import { NextResponse } from 'next/server';
import { getRoadmap } from '@/lib/seo-os/roadmap-engine';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const roadmap = getRoadmap();
    if (!roadmap) {
      return NextResponse.json({ error: 'No roadmap found' }, { status: 404 });
    }
    return NextResponse.json(roadmap);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
