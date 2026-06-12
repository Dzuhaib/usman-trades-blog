import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'dsh_auth';
const SESSION_PREFIX = 'session:';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/dsh/login' || pathname.startsWith('/api/dsh-auth')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/dsh')) {
    const authCookie = request.cookies.get(COOKIE_NAME);

    if (!authCookie) {
      const loginUrl = new URL('/dsh/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const sessionToken = authCookie.value;
    if (!sessionToken || sessionToken.length < 20) {
      const loginUrl = new URL('/dsh/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dsh/:path*', '/api/dsh-auth/:path*'],
};
