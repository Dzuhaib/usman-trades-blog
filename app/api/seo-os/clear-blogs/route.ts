import { NextResponse } from 'next/server';
import { getRedis } from '@/lib/seo-os/redis';

export const dynamic = 'force-dynamic';

export async function POST() {
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
