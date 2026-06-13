/**
 * SEO-OS Article Engine via Upstash Redis
 * Handles storage of AI-generated articles since Vercel FS is read-only.
 */

import { BlogPost } from '@/lib/blogData';
import { getRedis } from './redis';

const DYNAMIC_POSTS_KEY = 'seo-os:dynamic-posts';

export async function getDynamicPosts(): Promise<BlogPost[]> {
  const redis = getRedis();
  try {
    const posts = await redis.get<BlogPost[]>(DYNAMIC_POSTS_KEY);
    return posts || [];
  } catch (e) {
    console.error('Redis Fetch Error:', e);
    return [];
  }
}

export async function saveDynamicPost(post: BlogPost) {
  const redis = getRedis();
  const posts = await getDynamicPosts();
  
  // Check if post already exists (update it) or add new one
  const existingIdx = posts.findIndex(p => p.slug === post.slug);
  if (existingIdx >= 0) {
    posts[existingIdx] = post;
  } else {
    posts.unshift(post);
  }

  await redis.set(DYNAMIC_POSTS_KEY, posts);
}

const CONTENT_OVERRIDE_PREFIX = 'seo-os:content-override:';

export interface ContentOverride {
  content: string;
  title?: string;
  excerpt?: string;
}

export async function getContentOverride(slug: string): Promise<ContentOverride | null> {
  const redis = getRedis();
  try {
    const data = await redis.get<ContentOverride>(`${CONTENT_OVERRIDE_PREFIX}${slug}`);
    return data;
  } catch (e) {
    console.error('[ContentOverride] Redis read error:', e);
    return null;
  }
}

export async function saveContentOverride(slug: string, override: ContentOverride) {
  const redis = getRedis();
  await redis.set(`${CONTENT_OVERRIDE_PREFIX}${slug}`, override);
}

export async function deleteContentOverride(slug: string) {
  const redis = getRedis();
  await redis.del(`${CONTENT_OVERRIDE_PREFIX}${slug}`);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { BLOG_POSTS } = await import('@/lib/blogData');
  const staticPost = BLOG_POSTS.find(p => p.slug === slug);

  if (staticPost) {
    const override = await getContentOverride(slug);
    if (override) {
      return {
        ...staticPost,
        content: override.content,
        title: override.title || staticPost.title,
        excerpt: override.excerpt || staticPost.excerpt,
        updatedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      };
    }
    return staticPost;
  }

  const dynamicPosts = await getDynamicPosts();
  return dynamicPosts.find(p => p.slug === slug) || null;
}
