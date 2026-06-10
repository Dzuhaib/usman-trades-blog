/**
 * SEO-OS Article Engine via Upstash Redis
 * Handles storage of AI-generated articles since Vercel FS is read-only.
 */

import 'dotenv/config';
import { Redis } from '@upstash/redis';
import { BlogPost } from '@/lib/blogData';

function getRedis() {
  return new Redis({
    url: (process.env.UPSTASH_REDIS_REST_URL || '').replace(/^["']|["']$/g, ''),
    token: (process.env.UPSTASH_REDIS_REST_TOKEN || '').replace(/^["']|["']$/g, ''),
  });
}

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

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // Check static posts first (from lib/blogData)
  const { BLOG_POSTS } = await import('@/lib/blogData');
  const staticPost = BLOG_POSTS.find(p => p.slug === slug);
  if (staticPost) return staticPost;

  // Check dynamic posts in Redis
  const dynamicPosts = await getDynamicPosts();
  return dynamicPosts.find(p => p.slug === slug) || null;
}
