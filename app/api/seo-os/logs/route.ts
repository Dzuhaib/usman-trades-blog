import { NextResponse } from 'next/server';
import { getLogs, getAgentsStatus } from '@/lib/seo-os/log-engine';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const logs = await getLogs();
    const status = await getAgentsStatus();
    return NextResponse.json({ logs, status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
