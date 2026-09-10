import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS, CATEGORIES } from '@/lib/blogData';
import { getDynamicPosts } from '@/lib/seo-os/article-engine';
import { getPexelsImage } from '@/lib/pexels';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Usman Trades | Free Forex, Gold and Bitcoin Trading Tools and Education',
  description: 'Master the financial markets with simple, evidence-based trading education. Access professional calculators for Forex, Gold, and Bitcoin designed for real-world risk management.',
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  const dynamicPosts = await getDynamicPosts();
  const combinedPosts = [...BLOG_POSTS, ...dynamicPosts];

  const seenTitles = new Set<string>();
  const seenSlugs = new Set<string>();
  const allPosts = combinedPosts.filter(post => {
    const normalizedTitle = post.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (seenTitles.has(normalizedTitle) || seenSlugs.has(post.slug)) return false;
    seenTitles.add(normalizedTitle);
    seenSlugs.add(post.slug);
    return true;
  });

  const sortedPosts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const postsWithImages = await Promise.all(
    sortedPosts.map(async (post) => {
      const pexelsImage = await getPexelsImage(post.title);
      return { ...post, image: pexelsImage };
    })
  );

  return (
    <div className="space-y-16 py-8">
      <header className="space-y-6 max-w-[700px]">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 tracking-tight">Trading Education Library</h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          Our editorial guides break down complex market mechanics into practical, understandable lessons for consistent trading.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const isActive = category === 'All';
          const href = category === 'All' ? '/' : `/blog?category=${encodeURIComponent(category)}`;
          return (
            <Link
              key={category}
              href={href}
              className={`text-[11px] font-bold px-4 py-2 rounded-full border transition-all duration-200 no-underline ${
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {postsWithImages.map((post, index) => (
          <article key={post.slug} className="group flex flex-col space-y-5">
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
            <div className="space-y-3 flex-1 flex flex-col">
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
              </div>
              <h2 className="text-xl font-bold font-serif text-slate-900 leading-tight group-hover:text-accent transition-colors">
                <Link href={post.route} className="no-underline">{post.title}</Link>
              </h2>
            </div>
            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-400 uppercase">
                  {post.author.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-[11px] font-bold text-slate-600">{post.author.name}</span>
              </div>
              <Link href={post.route} className="text-[11px] font-black text-accent uppercase tracking-[0.1em] no-underline hover:text-accent-dark transition-colors">
                Read Guide &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
