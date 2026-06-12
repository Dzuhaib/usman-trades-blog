import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getRedis } from '@/lib/seo-os/redis';

const COOKIE_NAME = 'dsh_auth';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SESSION_PREFIX = 'session:';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.DASHBOARD_PASSWORD;

    if (!correctPassword) {
      console.error('[Auth] DASHBOARD_PASSWORD env var is not configured.');
      return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
    }

    if (!password || password !== correctPassword) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return NextResponse.json({ error: 'Invalid authorization key.' }, { status: 401 });
    }

    const raw = crypto.getRandomValues(new Uint8Array(32));
    const sessionToken = Array.from(raw, b => b.toString(16).padStart(2, '0')).join('');

    const redis = getRedis();
    await redis.set(`${SESSION_PREFIX}${sessionToken}`, 'authenticated', { ex: COOKIE_MAX_AGE });

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
  return response;
}
