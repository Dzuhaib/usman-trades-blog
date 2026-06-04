import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPexelsImages } from '@/lib/pexels';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthorBio from '@/components/AuthorBio';
import { getPostBySlug } from '@/lib/seo-os/article-engine';
import { generateBlogSchema } from '@/lib/seo-os/schema-engine';
import SmartText from '@/components/SmartText';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Usman Trades`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/posts/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Use post title, category, and specific descriptive terms for unique image generation
  const imageSearchTerms = [
    post.title,
    post.category,
    post.slug.replace(/-/g, ' '),
    'professional trading',
    'financial analysis'
  ].join(' ');
  
  const images = await getPexelsImages(imageSearchTerms, 3);

  const blogSchema = generateBlogSchema({
    title: post.title,
    excerpt: post.excerpt,
    image: images[0]?.url || '',
    date: post.date,
    updatedAt: post.updatedAt,
    route: post.route,
    author: post.author,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <article className="max-w-[720px] mx-auto space-y-12 py-8">
        <Breadcrumbs items={[
          { label: 'Library', href: '/blog' },
          { label: post.category, href: '/blog?category=' + post.category },
          { label: post.title, href: post.route }
        ]} />

        {/* Introduction */}
        <header className="border-b border-border pb-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-[4px]">
              {post.category}
            </span>
            <span className="text-xs text-muted">Updated {post.updatedAt}</span>
            <span className="text-xs text-muted">&bull; {post.readTime}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-primary md:text-5xl leading-tight">
            {post.title}
          </h1>
        </header>

        {/* Featured Image */}
        {images[0] && (
          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-xl overflow-hidden">
            <Image 
              src={images[0].url} 
              alt={post.title} 
              fill 
              className="object-cover" 
              sizes="(max-width: 768px) 100vw, 720px" 
              priority 
            />
          </div>
        )}

        {/* Content Body */}
        <div className="article-content space-y-8 text-primary leading-relaxed text-lg">
          <SmartText text={post.content || post.excerpt} />
        </div>

        {/* Middle Image if available */}
        {images[1] && (
          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-xl overflow-hidden my-12">
            <Image 
              src={images[1].url} 
              alt="Technical analysis visualization" 
              fill 
              className="object-cover" 
              sizes="(max-width: 768px) 100vw, 720px" 
            />
          </div>
        )}

        <AuthorBio author={post.author} updatedAt={post.updatedAt} />

        {/* Footer Navigation */}
        <footer className="border-t border-border pt-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-sm pb-12">
          <Link href="/blog" className="text-secondary no-underline hover:text-primary transition-colors">
            &larr; Back to Library
          </Link>
        </footer>
      </article>
    </>
  );
}
