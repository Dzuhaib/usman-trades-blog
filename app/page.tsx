import type { Metadata } from 'next';
import Link from 'next/link';
import MiniRiskTerminal from '@/components/MiniRiskTerminal';
import { BLOG_POSTS } from '@/lib/blogData';
import { getPexelsImage } from '@/lib/pexels';
import { Calculator, ShieldAlert, BarChart3, TrendingUp, BookOpen, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Usman Trades | Practical Trading Education & Risk Management Tools',
  description: 'Master the financial markets with simple, evidence-based trading education. Access professional calculators for Forex, Gold, and Bitcoin designed for real-world risk management.',
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  const featuredPosts = BLOG_POSTS.slice(0, 5);

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
    <div className="space-y-24 py-10 md:py-16">
      {/* 1. Hero Section: Refined for Clarity & Human Touch */}
      <header className="max-w-[800px] mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold uppercase tracking-widest">
          <BookOpen className="w-3 h-3" />
          Practical Trading Education
        </div>
        <h1 className="text-4xl md:text-6xl font-bold font-serif text-slate-900 tracking-tight leading-[1.1]">
          Better Trading Starts with <span className="text-accent italic">Better Math.</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-[640px] mx-auto">
          We provide clear, evidence-based guides and professional-grade tools to help you manage risk and understand market mechanics—without the hype.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link href="/tools" className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-8 py-4 rounded-md transition-all shadow-lg shadow-slate-200">
            Explore Trading Tools
          </Link>
          <Link href="/blog" className="bg-white border border-slate-200 hover:border-slate-300 text-slate-900 font-bold text-sm px-8 py-4 rounded-md transition-all">
            Browse Learning Library
          </Link>
        </div>
      </header>

      {/* 2. Main Layout: 2-Column Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* LEFT COLUMN: Featured Guides (8 Cols) */}
        <main className="lg:col-span-8 space-y-16">
          <section className="space-y-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Featured Education</h2>
              <Link href="/blog" className="text-xs font-bold text-accent hover:underline">View All Guides &rarr;</Link>
            </div>

            {leadPost && (
              <article className="group space-y-6">
                <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                  <Image 
                    src={leadPost.image.url} 
                    alt={leadPost.image.alt} 
                    fill
                    priority 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded text-[10px] font-bold text-slate-900 uppercase tracking-widest shadow-sm">
                      {leadPost.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold font-serif text-slate-950 leading-tight group-hover:text-accent transition-colors">
                    <Link href={leadPost.route} className="no-underline">
                      {leadPost.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed line-clamp-2">
                    {leadPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">MU</div>
                      <span className="text-xs text-slate-500 font-medium">By {leadPost.author.name}</span>
                    </div>
                    <span className="text-xs text-slate-300">&bull;</span>
                    <span className="text-xs text-slate-400">{leadPost.date}</span>
                  </div>
                </div>
              </article>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
              {secondaryPosts.map((post) => (
                <article key={post.slug} className="group space-y-4">
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                    <Image 
                      src={post.image.url} 
                      alt={post.image.alt} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                      {post.category}
                    </span>
                    <h4 className="text-lg font-bold font-serif text-slate-950 leading-snug group-hover:text-accent transition-colors">
                      <Link href={post.route} className="no-underline">
                        {post.title}
                      </Link>
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        {/* RIGHT COLUMN: Sidebar (4 Cols) */}
        <aside className="lg:col-span-4 space-y-12">
          {/* Quick Tool Widget */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-200 pb-4">
              Quick Calculator
            </h3>
            <MiniRiskTerminal />
            <p className="text-[11px] text-slate-500 text-center italic">
              Use this widget for instant lot-size estimates based on 1% risk.
            </p>
          </div>

          {/* Founder Introduction / Trust Signal */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-serif font-bold text-xl">U</div>
              <div>
                <span className="text-sm font-bold text-slate-900 block">MUHAMMAD USMAN</span>
                <span className="text-xs text-slate-500">Founder & Lead Analyst</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              &ldquo;I started Usman Trades because I was tired of the complexity and hype in the trading world. My goal is to give you the same mathematical frameworks used by pros, but in a way that actually makes sense.&rdquo;
            </p>
            <div className="pt-2">
              <Link href="/about" className="text-[11px] font-bold text-accent hover:underline uppercase tracking-wider">Our Editorial Mission &rarr;</Link>
            </div>
          </div>

          {/* Core Values / Human Touch */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-200 pb-4">
              Why We Are Different
            </h3>
            <div className="space-y-4">
              {[
                { title: "No Signals", desc: "We teach you how to fish, we don't sell you the fish." },
                { title: "Zero Hype", desc: "No lambos, no fake profits. Just market reality." },
                { title: "Open Math", desc: "All our tools show you the logic behind the numbers." },
              ].map((value, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{value.title}</span>
                    <p className="text-[11px] text-slate-500">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* 3. Tools Showcase Section: Addressing Point 8 */}
      <section className="bg-slate-50 border-y border-slate-100 py-20 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 space-y-16">
          <div className="max-w-[600px] space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 tracking-tight">Professional Tools, Simplified.</h2>
            <p className="text-lg text-slate-600">
              Our calculators are designed to help you make objective decisions in seconds. No complex spreadsheets required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                <Calculator className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">Lot Size Calculator</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  The most important tool in your arsenal. Define your risk in dollars, and we tell you the exact position size to use.
                </p>
                <div className="pt-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Example: $10,000 Acc + 1% Risk + 20 Pip SL = 0.5 Lots
                </div>
              </div>
              <Link href="/tools/lot-size-calculator" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline">
                Open Tool <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">Risk Calculator</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Verify your stop loss logic and see how much of your account is at stake before you pull the trigger.
                </p>
                <div className="pt-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Features: Invalidation levels, Drawdown defense
                </div>
              </div>
              <Link href="/tools/risk-calculator" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline">
                Open Tool <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">Profit Calculator</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Run the numbers on your trade ideas to see potential outcomes and reward-to-risk ratios.
                </p>
                <div className="pt-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Metrics: R:R Ratio, P&L Projection
                </div>
              </div>
              <Link href="/tools/profit-calculator" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline">
                Open Tool <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Methodology Section: Humanized Tone */}
      <section className="py-20 px-6">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">Focusing on Capital Preservation</h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We believe that consistent trading isn&apos;t about catching every move; it&apos;s about staying in the game. Our philosophy is rooted in mathematical risk management. By using our calculators to define your risk before you enter a trade, you remove the emotional stress that leads to common mistakes. We focus on helping you understand your downside so you can capture the upside with confidence.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">Understanding Market Logic</h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Markets move based on liquidity and order flow, not just lines on a chart. We help you look past basic retail patterns to understand where the real activity is happening. Our guides break down complex concepts like institutional supply zones and market architecture into clear, actionable lessons. Whether you trade Forex, Gold, or Bitcoin, our goal is to help you see the market through a professional lens.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Editorial Mission Section: Point 7 */}
      <section className="bg-slate-900 text-white p-12 md:p-24 rounded-[40px] overflow-hidden relative">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>
        <div className="max-w-[700px] relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-[0.2em]">
            <ShieldCheck className="w-4 h-4" />
            Our Editorial Commitment
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-serif leading-tight tracking-tight text-white">
            Human-first trading education. <span className="text-slate-500 italic">No AI fluff.</span>
          </h2>
          <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
            <p>
              In an era of AI-generated financial spam, we commit to publishing only high-integrity, human-written content. Every guide in our library is written by experienced analysts who have spent thousands of hours in the markets.
            </p>
            <p>
              We don&apos;t chase trending keywords for the sake of traffic. We solve actual problems that traders face every day: how to size a position correctly, how to find logical entry zones, and how to manage the psychological toll of risk.
            </p>
          </div>
          <div className="pt-4">
            <Link href="/about" className="bg-accent hover:bg-accent/90 text-white font-bold px-8 py-4 rounded-md transition-all inline-block">
              Read Our Full Story
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FAQ Section: Clean & Readable */}
      <section className="max-w-[900px] mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold font-serif text-slate-900">Common Questions</h2>
          <p className="text-slate-500 max-w-[500px] mx-auto">
            Practical answers to frequently asked questions about risk management and market mechanics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {[
            {
              q: "How do I calculate Forex lot size correctly?",
              a: "To find your correct size, divide your cash risk (balance × risk %) by your stop loss distance. This ensures you lose exactly what you planned if the trade doesn't go your way."
            },
            {
              q: "What is a safe risk percentage per trade?",
              a: "Most professional traders recommend risking 1% to 2% of your account per trade. This helps you survive a series of losses without causing significant damage to your capital."
            },
            {
              q: "How do central banks affect Gold prices?",
              a: "Gold often moves in response to US interest rates and Dollar strength. Central banks also hold gold as a reserve asset, which creates long-term demand zones."
            },
            {
              q: "How do I manage risk when trading Bitcoin?",
              a: "Because Bitcoin is more volatile, you often need wider stop losses and smaller position sizes compared to traditional forex pairs to stay within your risk limits."
            }
          ].map((item, idx) => (
            <div key={idx} className="space-y-3 p-6 rounded-xl border border-slate-50 bg-slate-50/30">
              <h3 className="text-lg font-bold text-slate-900 font-serif leading-snug">{item.q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Final Trust Banner */}
      <section className="bg-white border border-slate-200 p-12 md:p-16 rounded-3xl text-center space-y-6 shadow-sm">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-slate-900">Ready to trade with <span className="text-accent italic">precision?</span></h2>
          <p className="text-slate-500 max-w-[600px] mx-auto leading-relaxed">
            Our tools and guides are designed to be your primary resource for understanding risk and market structure. Join thousands of traders using Usman Trades.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link href="/blog" className="text-xs font-bold uppercase tracking-widest px-8 py-4 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-all">Start Reading</Link>
            <Link href="/tools" className="text-xs font-bold uppercase tracking-widest px-8 py-4 border border-slate-200 text-slate-900 rounded-md hover:border-slate-300 transition-all">Explore Tools</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
