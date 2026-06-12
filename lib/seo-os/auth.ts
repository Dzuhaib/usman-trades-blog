import { NextResponse } from 'next/server';
import { getRedis } from './redis';

const COOKIE_NAME = 'dsh_auth';
const SESSION_PREFIX = 'session:';

export async function verifyApiAuth(request: Request): Promise<{ authorized: true } | NextResponse> {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = cookieHeader.split(';').reduce<Record<string, string>>((acc, c) => {
    const [key, val] = c.trim().split('=');
    if (key && val) acc[key] = val;
    return acc;
  }, {});

  const sessionToken = cookies[COOKIE_NAME];

  if (!sessionToken || sessionToken.length < 20) {
    return NextResponse.json({ error: 'Unauthorized. No valid session.' }, { status: 401 });
  }

  const redis = getRedis();
  const session = await redis.get(`${SESSION_PREFIX}${sessionToken}`);

  if (session !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized. Session expired or invalid.' }, { status: 401 });
  }

  return { authorized: true };
}
