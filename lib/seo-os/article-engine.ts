/**
 * SEO-OS Article Engine via Upstash Redis
 * Handles storage of AI-generated articles since Vercel FS is read-only.
 */

import { Redis } from '@upstash/redis';
import { BlogPost } from '@/lib/blogData';

const redis = Redis.fromEnv();
const DYNAMIC_POSTS_KEY = 'seo-os:dynamic-posts';

export async function getDynamicPosts(): Promise<BlogPost[]> {
  try {
    const posts = await redis.get<BlogPost[]>(DYNAMIC_POSTS_KEY);
    return posts || [];
  } catch (e) {
    console.error('Redis Fetch Error:', e);
    return [];
  }
}

export async function saveDynamicPost(post: BlogPost) {
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
