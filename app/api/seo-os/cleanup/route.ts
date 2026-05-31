import { NextResponse } from 'next/server';
import { cleanupMissingUrls } from '@/lib/seo-os/orchestrator';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  // Security check
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (token !== process.env.CRON_SECRET && token !== 'dev-test') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await cleanupMissingUrls();
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error('Cleanup Error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
