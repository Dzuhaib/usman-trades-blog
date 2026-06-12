import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blogData';
import { TOOLS } from '@/lib/toolsData';
import { getDynamicPosts } from '@/lib/seo-os/article-engine';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

/**
 * Sitemap Generator
 * Ensures all static, blog, and dynamic SEO-OS posts are indexed.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://usmantrades.co.uk';

  // Helper to ensure valid dates for XML serialization
  const ensureValidDate = (dateStr: string | undefined): Date => {
    if (!dateStr) return new Date();
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? new Date() : d;
  };

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const blogPosts: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}${post.route}`,
    lastModified: ensureValidDate(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Fetch and include dynamic posts from Redis with fallback
  let dynamicBlogPosts: MetadataRoute.Sitemap = [];
  try {
    const dynamicPosts = await getDynamicPosts();
    if (Array.isArray(dynamicPosts)) {
      dynamicBlogPosts = dynamicPosts.map((post) => ({
        url: `${baseUrl}${post.route}`,
        lastModified: ensureValidDate(post.updatedAt || post.date),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('[Sitemap Error] Dynamic Posts Fetch:', error);
    // Fallback to empty if Redis fails
  }

  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...blogPosts, ...dynamicBlogPosts, ...toolPages];
}
