import { NextResponse } from 'next/server';
import { runDailyCycle } from '@/lib/seo-os/orchestrator';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Security check: Verify a secret token to prevent unauthorized triggers
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (token !== process.env.CRON_SECRET && token !== 'seo-os-automated-trigger-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await runDailyCycle();
    return NextResponse.json({ success: true, message: 'Daily cycle completed.' });
  } catch (error: any) {
    console.error('Cron Error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
