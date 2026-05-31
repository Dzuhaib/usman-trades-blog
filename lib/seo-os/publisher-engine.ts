import fs from 'fs';
import path from 'path';
import { BLOG_POSTS, BlogPost } from '@/lib/blogData';

/**
 * Phase 7: Publish Agent
 * Handles file system operations to make content live.
 */
export async function publishArticle(slug: string, title: string, content: string, category: any) {
  const postsDir = path.join(process.cwd(), 'app/blog/posts', slug);
  const pagePath = path.join(postsDir, 'page.tsx');
  const blogDataPath = path.join(process.cwd(), 'lib/blogData.ts');

  // 1. Create directory
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  // 2. Prepare Page Content (Wrapped in Next.js layout)
  const pageTemplate = `
import { Metadata } from 'next';
import SmartText from '@/components/SmartText';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthorBio from '@/components/AuthorBio';

export const metadata: Metadata = {
  title: '${title} | Usman Trades',
  description: '${title}',
};

export default function Page() {
  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: '${title}', href: '#' }]} />
      <header className="mb-12 space-y-4">
        <span className="text-accent font-black uppercase tracking-widest text-xs">${category}</span>
        <h1 className="text-4xl md:text-6xl font-bold font-serif text-slate-900 leading-tight">${title}</h1>
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
           <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">U</div>
           <div>
              <span className="block text-sm font-bold text-slate-900">MUHAMMAD USMAN</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Lead Analyst • Published ${new Date().toLocaleDateString()}</span>
           </div>
        </div>
      </header>

      <div className="prose prose-slate prose-lg max-w-none prose-headings:font-serif prose-a:text-accent">
        <SmartText text={\`${content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`} />
      </div>

      <footer className="mt-20 pt-12 border-t border-slate-100">
         <AuthorBio name="MUHAMMAD USMAN" role="Head of Research" bio="Professional trader with over 12 years of experience in global macro markets and risk management." />
      </footer>
    </article>
  );
}
`;

  fs.writeFileSync(pagePath, pageTemplate);

  // 3. Update blogData.ts
  const newPost: BlogPost = {
    slug,
    title,
    excerpt: content.substring(0, 160) + '...',
    category,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    updatedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    readTime: '7 min read',
    route: `/blog/posts/${slug}`,
    author: {
      name: 'MUHAMMAD USMAN',
      role: 'Head of Research',
      bio: 'Professional trader with over 12 years of experience in global macro markets and risk management.'
    }
  };

  const blogDataContent = fs.readFileSync(blogDataPath, 'utf8');
  // Simple injection logic - assuming BLOG_POSTS is exported as an array literal
  const updatedContent = blogDataContent.replace(
    'export const BLOG_POSTS: BlogPost[] = [',
    `export const BLOG_POSTS: BlogPost[] = [\n  ${JSON.stringify(newPost, null, 2)},`
  );

  fs.writeFileSync(blogDataPath, updatedContent);

  return { success: true, url: `/blog/posts/${slug}` };
}
