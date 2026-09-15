import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, BLOG_POST_IMAGES, BLOG_POST_INLINE_IMAGES, CATEGORIES, BlogPost } from '@/lib/blogData';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthorBio from '@/components/AuthorBio';
import { getPostBySlug } from '@/lib/seo-os/article-engine';
import { generateBlogSchema, generateBreadcrumbSchema } from '@/lib/seo-os/schema-engine';
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
    keywords: [post.category, post.title.split(' ').slice(0, 3).join(' '), 'trading', 'forex', 'gold', 'XAUUSD', 'risk management'],
    alternates: {
      canonical: `/blog/posts/${slug}`,
    },
  };
}

const RELATED_POSTS_LIMIT = 3;

function getRelatedPosts(slug: string, category: string): BlogPost[] {
  return BLOG_POSTS
    .filter(p => p.slug !== slug && p.category === category)
    .slice(0, RELATED_POSTS_LIMIT);
}

// Extract FAQ pairs from the post's own markdown content:
// "## Frequently Asked Questions" followed by "### Question" + answer paragraphs
function extractFAQs(content?: string): { q: string; a: string }[] {
  if (!content) return [];
  const faqSection = content.split(/## Frequently Asked Questions/i)[1];
  if (!faqSection) return [];
  const faqs: { q: string; a: string }[] = [];
  const blocks = faqSection.split(/^### /m).slice(1);
  for (const block of blocks) {
    const lines = block.trim().split('\n');
    const q = lines[0].trim();
    const a = lines
      .slice(1)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (q && a) faqs.push({ q, a });
  }
  return faqs;
}

function buildFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const featuredImage = BLOG_POST_IMAGES[slug] || post.image || { url: 'https://images.pexels.com/photos/14902702/pexels-photo-14902702.jpeg', alt: 'Gold trading analysis' };

  const blogSchema = generateBlogSchema({
    title: post.title,
    excerpt: post.excerpt,
    image: featuredImage.url,
    date: post.date,
    updatedAt: post.updatedAt,
    route: post.route,
    author: { name: post.author.name, url: 'https://www.usmantrades.co.uk/about' },
  });

  const relatedPosts = getRelatedPosts(slug, post.category);

  // Breadcrumb items shared by the visible nav and the JSON-LD schema
  const breadcrumbItems = [
    { label: 'Library', href: '/blog' },
    { label: post.category, href: '/blog?category=' + encodeURIComponent(post.category) },
    { label: post.title, href: post.route },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  // Extract this post's own FAQs from its content for schema
  const faqs = extractFAQs(post.content);
  const faqSchema = faqs.length > 0 ? buildFAQSchema(faqs) : null;

  // Split content by image placeholders [IMAGE_X]
  const contentParts = post.content ? post.content.split(/\[IMAGE_\d+\]/) : [post.excerpt];
  
  // Build images array: featured + per-post inline images (or shared fallback)
  const inlineImages = BLOG_POST_INLINE_IMAGES[slug] ?? [
    { url: 'https://images.pexels.com/photos/3231234/pexels-photo-3231234.jpeg', alt: `${slug} trading data analysis` },
    { url: 'https://images.pexels.com/photos/4383217/pexels-photo-4383217.jpeg', alt: `${slug} investment portfolio` },
    { url: 'https://images.pexels.com/photos/5123456/pexels-photo-5123456.jpeg', alt: `${slug} market trends` },
    { url: 'https://images.pexels.com/photos/14902702/pexels-photo-14902702.jpeg', alt: `${slug} financial market` },
  ];
  const allImages: { url: string; alt: string }[] = [featuredImage, ...inlineImages];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <article className="max-w-[720px] mx-auto space-y-12 py-8 px-4">
        <Breadcrumbs items={breadcrumbItems} />

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
                  <img
                    src={allImages[index].url}
                    alt={allImages[index].alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <AuthorBio author={post.author} updatedAt={post.updatedAt} />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="space-y-6 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold font-serif text-slate-900">Related Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={relatedPost.route}
                  className="block p-4 border border-slate-200 rounded-xl hover:border-accent hover:bg-slate-50 transition-all no-underline"
                >
                  <h3 className="font-bold text-slate-900 text-sm">{relatedPost.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{relatedPost.category} &bull; {relatedPost.readTime}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer Navigation */}
        <footer className="border-t border-border pt-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-sm pb-12">
          <Link href="/blog" className="text-secondary no-underline hover:text-primary transition-colors">
            &larr; Back to Library
          </Link>
          <Link href="/tools" className="text-accent font-bold no-underline hover:text-accent-dark uppercase tracking-widest text-sm">
            Try Our Tools &rarr;
          </Link>
        </footer>
      </article>
    </>
  );
}
