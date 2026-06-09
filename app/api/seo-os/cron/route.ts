import { NextResponse } from 'next/server';
import { runDailyCycle } from '@/lib/seo-os/orchestrator';
import { heavyLimiter, getIdentifier } from '../../../../lib/seo-os/rate-limit';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Rate limit first
  const id = getIdentifier(request);
  const { success: withinLimit } = await heavyLimiter.limit(id);
  if (!withinLimit) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  // Primary: Vercel sends CRON_SECRET automatically as a header (most secure — token never in URL)
  const vercelCronSecret = request.headers.get('x-vercel-cron-secret');

  // Secondary: Allow manual dashboard triggers via the secret token as a query param
  const { searchParams } = new URL(request.url);
  const tokenParam = searchParams.get('token');
  const isManual = searchParams.get('manual') === 'true';

  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error('[Cron] CRON_SECRET env var is not set.');
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
  }

  const isAuthorized =
    vercelCronSecret === cronSecret || // Vercel automated header
    tokenParam === cronSecret;         // Manual dashboard call with token param

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await runDailyCycle(isManual);
    return NextResponse.json({
      success: true,
      message: isManual ? 'Manual cycle triggered.' : 'Daily cycle completed.',
    });
  } catch (error: any) {
    console.error('Cron Error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
