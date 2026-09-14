import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { notFound } from 'next/navigation';
import { BLOG_POST_IMAGES } from '@/lib/blogData';
import { getImageForSlug } from '@/lib/pexels';
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

  const slugImage = BLOG_POST_IMAGES[slug] || getImageForSlug(slug);
  const featuredImage = post.image || slugImage;

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

  const slugImage = BLOG_POST_IMAGES[slug] || getImageForSlug(slug);
  const featuredImage = post.image || slugImage;

  const blogSchema = generateBlogSchema({
    title: post.title,
    excerpt: post.excerpt,
    image: featuredImage.url,
    date: post.date,
    updatedAt: post.updatedAt,
    route: post.route,
    author: post.author,
  });

  // Split content by image placeholders [IMAGE_X]
  const contentParts = post.content ? post.content.split(/\[IMAGE_\d+\]/) : [post.excerpt];
  
  // Build images array: featured + 4 additional from FALLBACK_IMAGES
  const allImages: { url: string; alt: string }[] = [
    featuredImage,
    { url: 'https://images.pexels.com/photos/3231234/pexels-photo-3231234.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: `${slug} trading data analysis` },
    { url: 'https://images.pexels.com/photos/4383217/pexels-photo-4383217.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: `${slug} investment portfolio` },
    { url: 'https://images.pexels.com/photos/5123456/pexels-photo-5123456.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: `${slug} market trends` },
    { url: 'https://images.pexels.com/photos/14902702/pexels-photo-14902702.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: `${slug} financial market` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <article className="max-w-[720px] mx-auto space-y-12 py-8 px-4">
        <Breadcrumbs items={[
          { label: 'Library', href: '/blog' },
          { label: post.category, href: '/blog?category=' + post.category },
          { label: post.title, href: post.route }
        ]} />

        {/* Article Header */}
        <header className="border-b border-border pb-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-[4px]">
              {post.category}
            </span>
            <span className="text-xs text-muted">Updated {post.updatedAt}</span>
            <span className="text-xs text-muted">&bull; {post.readTime}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-primary md:text-4xl leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-secondary leading-relaxed italic">
            {post.excerpt}
          </p>
        </header>

        {/* Dynamic Content with Contextual Images */}
        <div className="article-content space-y-12">
          {contentParts.map((part, index) => (
            <React.Fragment key={index}>
              <SmartText text={part} />
              {allImages[index] && (
                <div className="w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden relative my-12">
                  <Image 
                    src={allImages[index].url} 
                    alt={allImages[index].alt} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, 720px"
                    priority={index === 0}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

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
