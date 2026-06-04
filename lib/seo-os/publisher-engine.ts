import { BLOG_POSTS, BlogPost } from '@/lib/blogData';
import { saveDynamicPost, getDynamicPosts } from './article-engine';

/**
 * Phase 7: Publish Agent
 * Handles data updates to make AI content live via dynamic routing.
 */
export async function publishArticle(slug: string, title: string, content: string, category: any) {
  // 1. Determine the best publication time (4-hour gap enforcement)
  const dynamicPosts = await getDynamicPosts();
  let publishDate = new Date();

  if (dynamicPosts.length > 0) {
    const lastPost = dynamicPosts[0];
    const lastDate = new Date(lastPost.updatedAt || lastPost.date);
    
    if (!isNaN(lastDate.getTime())) {
      const fourHoursInMs = 4 * 60 * 60 * 1000;
      const nextAvailableSlot = lastDate.getTime() + fourHoursInMs;
      
      // If the next slot is in the future relative to 'now', we continue the chain
      // If 'now' is already past the lastDate + 4h, we use 'now'
      if (nextAvailableSlot > publishDate.getTime()) {
        publishDate = new Date(nextAvailableSlot);
      }
    }
  }

  const dateOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true 
  };
  const formattedDate = publishDate.toLocaleDateString('en-US', dateOptions);

  // 2. Prepare Metadata Object
  const newPost: BlogPost = {
    slug,
    title,
    excerpt: content.substring(0, 160).replace(/\n/g, ' ') + '...',
    content, // The full AI-generated article
    category: category || 'Risk Management',
    date: formattedDate,
    updatedAt: formattedDate,
    readTime: `${Math.ceil(content.split(' ').length / 200)} min read`,
    route: `/blog/posts/${slug}`,
    author: {
      name: 'MUHAMMAD USMAN',
      role: 'Head of Research',
      bio: 'Professional trader with over 12 years of experience in global macro markets and risk management.'
    }
  };

  // 3. Save to Redis Database (Bypasses read-only FS)
  try {
    await saveDynamicPost(newPost);
    return { success: true, url: `/blog/posts/${slug}` };
  } catch (error: any) {
    console.error('Publish Agent Error:', error);
    return { success: false, error: `Database failed: ${error.message}` };
  }
}
