import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS, CATEGORIES } from '@/lib/blogData';
import { getPexelsImage } from '@/lib/pexels';
import Image from 'next/image';
import { Search, Clock, Calendar, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trading Education Library | Practical Guides for Forex, Gold and Bitcoin',
  description: 'Explore our comprehensive library of trading guides. Learn about risk management, market psychology, and technical analysis with clear, approachable education.',
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
  const filteredPosts = (activeCategory === 'All'
    ? [...BLOG_POSTS]
    : BLOG_POSTS.filter(post => post.category === activeCategory))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Fetch Pexels cover images
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
    <div className="space-y-16 py-8">
      {/* Page Header */}
      <header className="space-y-6 max-w-[700px]">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 tracking-tight">Trading Education Library</h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          Our editorial guides break down complex market mechanics into practical, understandable lessons for consistent trading.
        </p>
      </header>

      {/* Filter & Search Bar */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const isActive = category === activeCategory;
              const href = category === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(category)}`;
              return (
                <Link
                  key={category}
                  href={href}
                  className={`text-[11px] font-bold px-4 py-2 rounded-full border transition-all duration-200 active:scale-[0.97] uppercase tracking-wider no-underline ${
                    isActive
                      ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900'
                  }`}
                >
                  {category}
                </Link>
              );
            })}
          </div>
          
          <div className="relative group max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search guides..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:border-accent outline-none transition-all font-medium"
            />
          </div>
        </div>

        {/* Blog Post List */}
        {postsWithImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {postsWithImages.map((post, index) => (
              <article
                key={post.slug}
                className="group flex flex-col space-y-5"
              >
                <Link href={post.route} className="block relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm">
                  <Image
                    src={post.image.url}
                    alt={post.image.alt}
                    fill
                    priority={index < 2}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black text-slate-900 uppercase tracking-widest shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </Link>
                
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold font-serif text-slate-900 leading-tight group-hover:text-accent transition-colors">
                    <Link href={post.route} className="no-underline">
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-400 uppercase">
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-[11px] font-bold text-slate-600">{post.author.name}</span>
                  </div>
                  <Link
                    href={post.route}
                    className="text-[11px] font-black text-accent uppercase tracking-[0.1em] no-underline hover:text-accent-dark transition-colors"
                  >
                    Read Guide &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-500 font-medium italic">No articles found in this category.</p>
            <Link href="/blog" className="text-sm font-bold text-accent mt-4 inline-block hover:underline">
              View All Articles
            </Link>
          </div>
        )}
      </div>

      {/* AEO/FAQ Section for Blog Index */}
      <section className="bg-slate-900 text-white rounded-3xl p-10 md:p-16 space-y-12">
        <div className="max-w-[600px] space-y-4">
          <h2 className="text-3xl font-bold font-serif tracking-tight">Education FAQ</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Quick answers to common questions about our editorial approach and trading philosophy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {[
            {
              q: "Who writes these guides?",
              a: "Every article in our library is written by MUHAMMAD USMAN, a trader with over a decade of experience in financial markets, focusing on data-driven risk management."
            },
            {
              q: "How often is the content updated?",
              a: "We review our core guides quarterly to ensure the examples and mathematical frameworks remain accurate in changing market environments."
            },
            {
              q: "Is this financial advice?",
              a: "No. All content is strictly educational. We teach you the mechanics of the market and risk math, but we never recommend specific trades or assets."
            },
            {
              q: "Can I use the calculators for free?",
              a: "Yes. Our tool suite is completely free and runs locally in your browser to prioritize your privacy and data security."
            }
          ].map((faq, i) => (
            <div key={i} className="space-y-3">
              <h3 className="text-lg font-bold font-serif text-accent">{faq.q}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
