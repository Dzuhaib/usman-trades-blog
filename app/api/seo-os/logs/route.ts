import { NextResponse } from 'next/server';
import { getLogs, getAgentsStatus } from '../../../lib/seo-os/log-engine';
import { verifyApiAuth } from '../../../lib/seo-os/auth';
import { apiLimiter, getIdentifier } from '../../../lib/seo-os/rate-limit';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Rate limit
  const id = getIdentifier(request);
  const { success: withinLimit } = await apiLimiter.limit(id);
  if (!withinLimit) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  // Auth check
  const auth = verifyApiAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const logs = await getLogs();
    const status = await getAgentsStatus();
    return NextResponse.json({ logs, status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
