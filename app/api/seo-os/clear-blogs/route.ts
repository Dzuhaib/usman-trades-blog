import { NextResponse } from 'next/server';
import { getRedis } from '@/lib/seo-os/redis';
import { verifyApiAuth } from '@/lib/seo-os/auth';
import { apiLimiter, getIdentifier } from '@/lib/seo-os/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const id = getIdentifier(request);
  const { success: withinLimit } = await apiLimiter.limit(id);
  if (!withinLimit) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  const auth = await verifyApiAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const redis = getRedis();

    const dynResult = await redis.del('seo-os:dynamic-posts');

    const keys = await redis.keys('seo-os:content-override:*');
    let overrideResult = 0;
    if (keys.length > 0) {
      overrideResult = await redis.del(...keys);
    }

    return NextResponse.json({
      success: true,
      cleared: { dynamicPosts: dynResult, contentOverrides: overrideResult },
    });
  } catch (error: any) {
    console.error('[Clear Blogs Error]:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
