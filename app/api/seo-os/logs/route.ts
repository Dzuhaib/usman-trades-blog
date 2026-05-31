import { NextResponse } from 'next/server';
import { getLogs, getAgentsStatus } from '@/lib/seo-os/log-engine';

export async function GET() {
  try {
    const logs = getLogs();
    const status = getAgentsStatus();
    return NextResponse.json({ logs, status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
