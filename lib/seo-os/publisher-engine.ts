import { BLOG_POSTS, BlogPost } from '@/lib/blogData';
import { saveDynamicPost } from './article-engine';

/**
 * Phase 7: Publish Agent
 * Handles data updates to make AI content live via dynamic routing.
 */
export async function publishArticle(slug: string, title: string, content: string, category: any) {
  // 1. Prepare Metadata Object
  const newPost: BlogPost = {
    slug,
    title,
    excerpt: content.substring(0, 160).replace(/\n/g, ' ') + '...',
    content, // The full AI-generated article
    category: category || 'Risk Management',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    updatedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    readTime: `${Math.ceil(content.split(' ').length / 200)} min read`,
    route: `/blog/posts/${slug}`,
    author: {
      name: 'MUHAMMAD USMAN',
      role: 'Head of Research',
      bio: 'Professional trader with over 12 years of experience in global macro markets and risk management.'
    }
  };

  // 2. Save to Redis Database (Bypasses read-only FS)
  try {
    await saveDynamicPost(newPost);
    return { success: true, url: `/blog/posts/${slug}` };
  } catch (error: any) {
    console.error('Publish Agent Error:', error);
    return { success: false, error: `Database failed: ${error.message}` };
  }
}
