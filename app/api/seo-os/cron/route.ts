import { NextResponse } from 'next/server';
import { runDailyCycle } from '@/lib/seo-os/orchestrator';
import { heavyLimiter, getIdentifier } from '@/lib/seo-os/rate-limit';
import { verifyApiAuth } from '@/lib/seo-os/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const id = getIdentifier(request);
  const { success: withinLimit } = await heavyLimiter.limit(id);
  if (!withinLimit) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  const vercelCronSecret = request.headers.get('x-vercel-cron-secret');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error('[Cron] CRON_SECRET env var is not set.');
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
  }

  if (vercelCronSecret === cronSecret) {
    try {
      await runDailyCycle(false);
      return NextResponse.json({ success: true, message: 'Daily cycle completed.' });
    } catch (error: any) {
      console.error('Cron Error:', error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  const auth = await verifyApiAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    await runDailyCycle(true);
    return NextResponse.json({ success: true, message: 'Manual cycle triggered.' });
  } catch (error: any) {
    console.error('Cron Error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
