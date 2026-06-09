import { NextResponse } from 'next/server';
import { cleanupMissingUrls } from '@/lib/seo-os/orchestrator';
import { heavyLimiter, getIdentifier } from '../../../lib/seo-os/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  // Rate limit first
  const id = getIdentifier(request);
  const { success: withinLimit } = await heavyLimiter.limit(id);
  if (!withinLimit) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  // Auth: Accept only the CRON_SECRET env var value
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const vercelCronSecret = request.headers.get('x-vercel-cron-secret');

  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error('[Cleanup] CRON_SECRET env var is not set.');
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
  }

  const isAuthorized = vercelCronSecret === cronSecret || token === cronSecret;

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await cleanupMissingUrls();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Cleanup Error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
