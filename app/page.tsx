import type { Metadata } from 'next';
import Link from 'next/link';
import MiniRiskTerminal from '@/components/MiniRiskTerminal';
import { BLOG_POSTS } from '@/lib/blogData';
import { getPexelsImage } from '@/lib/pexels';
import { Calculator, ShieldCheck, BarChart3, TrendingUp, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Usman Trades | Practical Trading Education & Risk Management Tools',
  description: 'Master the financial markets with simple, evidence-based trading education. Access professional calculators for Forex, Gold, and Bitcoin designed for real-world risk management.',
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  const featuredPosts = [...BLOG_POSTS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const postsWithImages = await Promise.all(
    featuredPosts.map(async (post) => {
      const pexelsImage = await getPexelsImage(post.category);
      return {
        ...post,
        image: pexelsImage,
      };
    })
  );

  const leadPost = postsWithImages[0];
  const secondaryPosts = postsWithImages.slice(1);

  return (
    <div className="space-y-12 py-6">
      {/* 1. WSJ Editorial Style Platform Header */}
      <header className="border-b-4 border-double border-slate-900 pb-8 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-accent tracking-[0.2em] uppercase block">
              Practical Trading Education
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-slate-900 tracking-tight leading-none">
              The Usman Trades Journal
            </h1>
          </div>
          <div className="flex gap-4">
             <Link href="/tools" className="text-[10px] font-bold uppercase tracking-widest bg-slate-900 text-white px-4 py-2 rounded">
               Trading Tools
             </Link>
             <Link href="/blog" className="text-[10px] font-bold uppercase tracking-widest border border-slate-200 px-4 py-2 rounded">
               Library
             </Link>
          </div>
        </div>
      </header>

      {/* 2. Newspaper 2-Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: Main Articles Editorial Board (8 Cols) */}
        <main className="lg:col-span-8 space-y-16">
          {/* Main Lead Story */}
          {leadPost && (
            <article className="group space-y-6">
               <div className="flex items-center gap-2 text-accent">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">★ Editor&apos;s Lead Analysis</span>
              </div>
              <div className="relative aspect-[21/9] w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                <Image
                  src={leadPost.image.url}
                  alt={leadPost.image.alt}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 backdrop-blur px-3 py-1 rounded text-[10px] font-bold text-slate-900 uppercase tracking-widest shadow-sm">
                    {leadPost.category}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-950 leading-tight group-hover:text-accent transition-colors">
                  <Link href={leadPost.route} className="no-underline">
                    {leadPost.title}
                  </Link>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed line-clamp-3">
                  {leadPost.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">MU</div>
                    <span className="text-xs text-slate-500 font-medium">By {leadPost.author.name} • {leadPost.date}</span>
                  </div>
                  <Link
                    href={leadPost.route}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] uppercase tracking-widest px-6 py-3 rounded transition-all"
                  >
                    Read Guide &rarr;
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* Secondary Sub-Stories Grid */}
          <section className="space-y-8">
            <h3 className="text-xs font-black text-slate-950 uppercase tracking-[0.2em] border-b border-slate-900 pb-3">
              Latest from the Library
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
              {secondaryPosts.map((post) => (
                <article key={post.slug} className="group flex flex-col space-y-4">
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                    <Image
                      src={post.image.url}
                      alt={post.image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2 flex-1 flex flex-col">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                      {post.category}
                    </span>
                    <h4 className="text-xl font-bold font-serif text-slate-950 leading-snug group-hover:text-accent transition-colors">
                      <Link href={post.route} className="no-underline">
                        {post.title}
                      </Link>
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="pt-3 mt-auto border-t border-slate-50 flex justify-between items-center">
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{post.readTime}</span>
                       <Link href={post.route} className="text-[11px] font-bold text-accent hover:underline uppercase tracking-wider">
                         Learn More &rarr;
                       </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        {/* RIGHT COLUMN: Sidebar (4 Cols) */}
        <aside className="lg:col-span-4 space-y-10">
          {/* Quick Tool Widget */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-200 pb-3"> 
              Risk Terminal
            </h3>
            <MiniRiskTerminal />
            <p className="text-[10px] text-slate-400 text-center italic leading-relaxed px-4">
              Enter your account balance and stop loss to instantly calculate your professional position size.
            </p>
          </div>

          {/* Founder Introduction / Trust Signal */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
             <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-200 pb-3"> 
              Editorial Note
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-serif font-bold text-xl">U</div>
              <div>
                <span className="text-sm font-bold text-slate-900 block">MUHAMMAD USMAN</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Lead Analyst</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              &ldquo;I started this platform to strip away the noise of the trading world. Our mission is to give you the mathematical frameworks used by pros, but in a way that actually makes sense.&rdquo;
            </p>
            <div className="pt-2">
              <Link href="/about" className="text-[10px] font-bold text-accent hover:underline uppercase tracking-widest">Our Story &rarr;</Link>
            </div>
          </div>

          {/* Quick Utility Directory */}
          <div className="border border-slate-200 rounded-xl p-6 bg-white space-y-5 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-200 pb-3">
              Utility Suite
            </h3>
            <ul className="space-y-4 p-0 m-0 list-none">
              {[
                { href: "/tools/lot-size-calculator", label: "Lot Size Calculator", icon: Calculator, tag: "Risk Control" },
                { href: "/tools/risk-calculator", label: "Risk & Invalidation", icon: ShieldCheck, tag: "Defense" },
                { href: "/tools/pip-calculator", label: "Pip Value Estimator", icon: BarChart3, tag: "Valuation" },
                { href: "/tools/profit-calculator", label: "Profit Projection", icon: TrendingUp, tag: "Analysis" },
              ].map((tool) => (
                <li key={tool.href} className="group">
                  <Link href={tool.href} className="flex items-center justify-between no-underline">
                    <div className="flex items-center gap-3 text-slate-700 group-hover:text-accent transition-colors">
                      <tool.icon className="w-4 h-4 text-slate-400 group-hover:text-accent" />
                      <span className="text-xs font-bold">{tool.label}</span>
                    </div>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter group-hover:text-slate-400">{tool.tag}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Different */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-200 pb-3"> 
              Our Commitment
            </h3>
            <div className="space-y-5">
              {[
                { title: "Mathematical Accuracy", desc: "Pure financial equations for every calculation." },
                { title: "Editorial Integrity", desc: "High-integrity, human-written content only." },
                { title: "Zero Speculation", desc: "No signals, no hype. Just market reality." },
              ].map((value, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{value.title}</span>
                    <p className="text-[11px] text-slate-500 leading-snug">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* 3. Methodology Highlight Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-b border-slate-200 py-16 my-16 bg-slate-50/50 rounded-lg px-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Capital Preservation First</h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Consistent trading isn&apos;t about catching every move; it&apos;s about staying in the game. Our philosophy is rooted in mathematical risk management. By using our calculators to define your risk before you enter a trade, you remove the emotional stress that leads to common mistakes. We focus on helping you understand your downside so you can capture the upside with confidence.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Structural Market Logic</h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Markets move based on liquidity and order flow, not just lines on a chart. We help you look past basic retail patterns to understand where the real activity is happening. Our guides break down complex concepts like institutional supply zones and market architecture into clear, actionable lessons. Whether you trade Forex, Gold, or Bitcoin, our goal is to help you see the market through a professional lens.
          </p>
        </div>
      </section>

      {/* 4. Editorial Mission Section (Condensed) */}
      <section className="bg-slate-900 text-white p-12 md:p-16 rounded-3xl overflow-hidden relative shadow-xl">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>
        <div className="max-w-[700px] relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 text-accent font-bold text-[10px] uppercase tracking-[0.2em]">      
            <ShieldCheck className="w-4 h-4" />
            Human-Only Editorial Policy
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif leading-tight tracking-tight text-white">
            Human-first trading education. <span className="text-slate-500 italic">No AI fluff.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            In an era of AI-generated financial spam, we commit to publishing only high-integrity, human-written content. Every guide in our library is written by experienced analysts who have spent thousands of hours in the markets.
          </p>
          <div className="pt-4">
            <Link href="/about" className="bg-accent hover:bg-accent/90 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded transition-all inline-block">
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions (Grid Style) */}
      <section className="py-12 space-y-10">
        <div className="text-center md:text-left space-y-2">
           <span className="text-[11px] font-bold text-accent tracking-[0.2em] uppercase block">
            FAQ Desk
          </span>
          <h2 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 max-w-[640px]">
            Mathematically precise answers to common questions about risk management and market mechanics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {[
            {
              q: "How do I calculate Forex lot size correctly?",
              a: "Divide your cash risk (balance × risk %) by your stop loss distance. This ensures you lose exactly what you planned if the trade doesn't go your way."
            },
            {
              q: "What is a safe risk percentage per trade?",
              a: "Most professionals recommend risking 1% to 2% of your account per trade to survive natural market volatility sequences."
            },
            {
              q: "How do central banks affect Gold prices?",
              a: "Central banks buy gold to diversify reserves, creating strong long-term demand zones that influence higher timeframe price action."
            },
            {
              q: "How do I manage risk when trading Bitcoin?",
              a: "Due to higher volatility, use wider stop losses and reduced leverage while maintaining a strict 1% risk boundary on your capital."
            }
          ].map((item, idx) => (
            <div key={idx} className="space-y-3 p-6 rounded-xl border border-slate-100 bg-slate-50/30">
              <h3 className="text-lg font-bold text-slate-900 font-serif leading-snug">{item.q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Final Trust Banner */}
      <section className="bg-white border border-slate-200 p-12 md:p-16 rounded-3xl text-center space-y-6 shadow-sm border-t-8 border-t-slate-900">    
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-slate-900">Ready to trade with <span className="text-accent italic">precision?</span></h2>
          <p className="text-slate-500 max-w-[600px] mx-auto leading-relaxed">
            Our tools and guides are designed to be your primary resource for understanding risk and market structure.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link href="/blog" className="text-xs font-bold uppercase tracking-widest px-8 py-4 bg-slate-900 text-white rounded hover:bg-slate-800 transition-all">Start Reading</Link>
            <Link href="/tools" className="text-xs font-bold uppercase tracking-widest px-8 py-4 border border-slate-200 text-slate-900 rounded hover:border-slate-300 transition-all">Explore Tools</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
