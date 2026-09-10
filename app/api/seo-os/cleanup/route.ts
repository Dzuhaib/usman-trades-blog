import { NextResponse } from 'next/server';
import { cleanupMissingUrls } from '@/lib/seo-os/orchestrator';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const result = await cleanupMissingUrls();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Cleanup Error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
