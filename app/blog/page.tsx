import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS, CATEGORIES } from '@/lib/blogData';
import { getPexelsImage } from '@/lib/pexels';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Trading Education Blog | Free Guides for Forex, Gold and Bitcoin',
  description: 'Read free professional trading guides covering Forex education, Gold XAUUSD analysis, Bitcoin risk management, position sizing, trading psychology, and technical analysis with support and resistance.',
  alternates: {
    canonical: '/blog',
  },
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogIndex({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const activeCategory = resolvedParams.category || 'All';

  // Filter posts based on active category
  const filteredPosts = activeCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  // Fetch Pexels cover images for each filtered post in parallel (extremely fast on Next.js Server)
  const postsWithImages = await Promise.all(
    filteredPosts.map(async (post) => {
      const pexelsImage = await getPexelsImage(post.category);
      return {
        ...post,
        image: pexelsImage,
      };
    })
  );

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-extrabold text-primary mb-2 md:text-4xl">Educational Trading Guides</h1>
        <p className="text-sm text-secondary">Mathematical modeling, psychological blueprints, and institutional structural analysis.</p>
      </header>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-6">
        {CATEGORIES.map((category) => {
          const isActive = category === activeCategory;
          const href = category === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(category)}`;
          return (
            <Link
              key={category}
              href={href}
              className={`text-xs font-semibold px-4 py-2 rounded-[4px] border no-underline transition-all duration-200 active:scale-[0.97] ${
                isActive
                  ? 'bg-accent border-accent text-white shadow-sm'
                  : 'bg-surface border-border text-secondary hover:border-primary hover:text-primary'
              }`}
            >
              {category}
            </Link>
          );
        })}
      </div>

      {/* Blog Post List (Grid structure) */}
      {postsWithImages.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {postsWithImages.map((post, index) => (
            <article
              key={post.slug}
              className="border border-border rounded-[4px] bg-white overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div>
                {/* Dynamic SEO Pexels cover image */}
                <div className="relative aspect-[16/9] w-full bg-surface border-b border-border">
                  <Image
                    src={post.image.url}
                    alt={post.image.alt}
                    fill
                    priority={index < 2}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-[4px]">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-primary mb-2">
                    <Link href={post.route} className="text-primary hover:text-accent no-underline">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-secondary leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between px-6 pb-6 pt-2">
                <span className="text-xs text-muted">{post.readTime}</span>
                <Link
                  href={post.route}
                  className="text-xs font-bold text-accent uppercase tracking-wider no-underline hover:text-accent-dark"
                >
                  Read Article &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-border rounded-[4px]">
          <p className="text-sm text-secondary">No articles found in this category.</p>
          <Link href="/blog" className="text-xs font-bold text-accent mt-2 inline-block">
            View All Articles
          </Link>
        </div>
      )}
    </div>
  );
}
