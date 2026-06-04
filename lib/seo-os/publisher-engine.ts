import fs from 'fs';
import path from 'path';
import { BLOG_POSTS, BlogPost } from '@/lib/blogData';

/**
 * Phase 7: Publish Agent
 * Handles data updates to make AI content live via dynamic routing.
 */
export async function publishArticle(slug: string, title: string, content: string, category: any) {
  const blogDataPath = path.join(process.cwd(), 'lib/blogData.ts');

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

  // 2. Read and Update blogData.ts
  try {
    const blogDataContent = fs.readFileSync(blogDataPath, 'utf8');
    
    // Inject the new post at the start of the BLOG_POSTS array
    const updatedContent = blogDataContent.replace(
      'export const BLOG_POSTS: BlogPost[] = [',
      `export const BLOG_POSTS: BlogPost[] = [\n  ${JSON.stringify(newPost, null, 2)},`
    );

    fs.writeFileSync(blogDataPath, updatedContent);
    return { success: true, url: `/blog/posts/${slug}` };
  } catch (error: any) {
    console.error('Publish Agent File Error:', error.message);
    return { success: false, error: error.message };
  }
}
