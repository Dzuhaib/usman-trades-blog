import { NextResponse } from 'next/server';
import { runDailyCycle } from '@/lib/seo-os/orchestrator';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
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

  try {
    await runDailyCycle(true);
    return NextResponse.json({ success: true, message: 'Manual cycle triggered.' });
  } catch (error: any) {
    console.error('Cron Error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
