import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS, CATEGORIES } from '@/lib/blogData';
import { TOOLS } from '@/lib/toolsData';
import { getPexelsImage } from '@/lib/pexels';
import Image from 'next/image';
import { Calendar, User, Calculator, ShieldAlert, BarChart3, TrendingUp, ArrowLeftRight, Coins, TrendingDown, Lock, Scale, Clock, ArrowRight, Sparkles, ShieldCheck, BookOpen, TrendingUp as TrendingUpIcon, Globe, DollarSign, PieChart, Target, Award } from 'lucide-react';
import dynamic from 'next/dynamic';

const LiveTicker = dynamic(() => import('@/components/LiveTicker'), { ssr: false });
const MiniRiskTerminal = dynamic(() => import('@/components/MiniRiskTerminal'), { ssr: false });

const ICON_MAP: Record<string, any> = {
  'Lot Size Calculator': Calculator,
  'Risk Calculator': ShieldAlert,
  'Pip Calculator': BarChart3,
  'Profit Calculator': TrendingUp,
  'Risk Reward Calculator': ArrowLeftRight,
  'Compound Growth': Coins,
  'Drawdown Calculator': TrendingDown,
  'Margin Calculator': Lock,
  'Spread Cost Tool': Scale,
  'Session Timer': Clock
};

export const metadata: Metadata = {
  title: 'Usman Trades | Free Forex, Gold and Bitcoin Trading Tools and Education',
  description: 'Master the financial markets with simple, evidence-based trading education. Access professional calculators for Forex, Gold, and Bitcoin designed for real-world risk management.',
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  const allPosts = BLOG_POSTS;
  const sortedPosts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const featuredPost = sortedPosts[0];
  const recentPosts = sortedPosts.slice(1);

  const postsWithImages = await Promise.all(
    sortedPosts.map(async (post) => {
      const pexelsImage = await getPexelsImage(post.title);
      return { ...post, image: pexelsImage };
    })
  );

  const featuredImage = postsWithImages[0]?.image;
  const recentPostsWithImages = postsWithImages.slice(1);

  return (
    <div className="space-y-0 py-0">
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-accent">Live Market Data</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight tracking-tight">
                Trade Smarter, Not Harder
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed">
                Professional trading education and free calculators for Forex, Gold, and Bitcoin. Built by a senior market analyst with over a decade of experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/blog" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-6 py-3.5 rounded-xl transition-all no-underline hover:shadow-lg hover:shadow-accent/20 text-sm">
                  Explore Education <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/tools" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all no-underline text-sm border border-slate-700">
                  Open Tools <Sparkles className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center">
                <DollarSign className="w-6 h-6 text-accent mx-auto mb-3" />
                <div className="text-3xl font-bold font-serif">$7T+</div>
                <div className="text-xs text-slate-400 mt-1">Daily Forex Volume</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center">
                <BookOpen className="w-6 h-6 text-accent mx-auto mb-3" />
                <div className="text-3xl font-bold font-serif">8</div>
                <div className="text-xs text-slate-400 mt-1">Expert Guides</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center">
                <Calculator className="w-6 h-6 text-accent mx-auto mb-3" />
                <div className="text-3xl font-bold font-serif">10</div>
                <div className="text-xs text-slate-400 mt-1">Free Tools</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center">
                <ShieldCheck className="w-6 h-6 text-accent mx-auto mb-3" />
                <div className="text-3xl font-bold font-serif">100%</div>
                <div className="text-xs text-slate-400 mt-1">Free Forever</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Ticker */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="mt-[-24px] relative z-20">
          <LiveTicker />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-6 md:px-12 space-y-16 py-12">
        
        {/* Featured Article */}
        {featuredImage && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-accent" />
                Featured Guide
              </h2>
              <Link href="/blog" className="text-sm font-bold text-accent hover:underline no-underline">
                View All <ArrowRight className="w-4 h-4 inline" />
              </Link>
            </div>
            
            <Link href={featuredPost?.route || '#'} className="block group">
              <article className="relative border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
                  <Image
                    src={featuredImage.url}
                    alt={featuredImage.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                      {featuredPost?.category}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl md:text-4xl font-bold font-serif text-white leading-tight">
                      {featuredPost?.title}
                    </h3>
                    <p className="text-slate-300 text-sm mt-2 leading-relaxed line-clamp-2">
                      {featuredPost?.excerpt}
                    </p>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-black">
                      {featuredPost?.author.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{featuredPost?.author.name}</div>
                      <div className="text-[10px] text-slate-500">{featuredPost?.date} &bull; {featuredPost?.readTime}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            </Link>
          </section>
        )}

        {/* Latest Articles */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
              <Globe className="w-6 h-6 text-accent" />
              Latest Guides
            </h2>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter(c => c !== 'All').slice(0, 4).map((category) => (
                <Link
                  key={category}
                  href={`/blog?category=${encodeURIComponent(category)}`}
                  className="text-[10px] font-bold px-3 py-1.5 rounded-full border border-slate-200 text-slate-500 hover:border-accent hover:text-accent transition-all no-underline uppercase tracking-wider"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPostsWithImages.map((post, index) => (
              <article key={post.slug} className="group flex flex-col space-y-5">
                <Link href={post.route} className="block relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm">
                  <Image
                    src={post.image.url}
                    alt={post.image.alt}
                    fill
                    priority={index < 1}
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
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold font-serif text-slate-900 leading-tight group-hover:text-accent transition-colors line-clamp-2">
                    <Link href={post.route} className="no-underline">{post.title}</Link>
                  </h3>
                </div>
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-400 uppercase">
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-[11px] font-bold text-slate-600">{post.author.name}</span>
                  </div>
                  <Link href={post.route} className="text-[11px] font-black text-accent uppercase tracking-[0.1em] no-underline hover:text-accent-dark transition-colors">
                    Read &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Market Analysis Section */}
        <section className="space-y-8 pt-12 border-t border-slate-100">
          <h2 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
            <Target className="w-6 h-6 text-accent" />
            Risk Management Toolkit
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-serif text-slate-900 mb-3">Master Your Risk Before Every Trade</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Proper risk management is the foundation of long term trading success. Whether you trade Forex, Gold, or Bitcoin, understanding how to calculate your position size, determine your risk reward ratio, and manage your drawdown is essential. Our free tools are built by a senior market analyst with 12+ years of experience and are designed to help you make mathematically sound decisions every time.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Position Sizing</h4>
                        <p className="text-[10px] text-slate-500">Calculate exact lot sizes based on risk</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">Never risk more than you can afford. Calculate the correct position size for every trade based on your account balance and stop loss distance.</p>
                    <Link href="/tools/lot-size-calculator" className="text-[11px] font-bold text-accent hover:underline no-underline">Open Lot Size Calculator &rarr;</Link>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50/10 flex items-center justify-center">
                        <ShieldAlert className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Risk Management</h4>
                        <p className="text-[10px] text-slate-500">Know your exact cash exposure</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">Calculate exactly how much cash you are risking before entering any trade. Set your risk percentage and let the calculator do the math.</p>
                    <Link href="/tools/risk-calculator" className="text-[11px] font-bold text-blue-600 hover:underline no-underline">Open Risk Calculator &rarr;</Link>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50/10 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Pip Valuation</h4>
                        <p className="text-[10px] text-slate-500">Understand pip value across assets</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">Every pip matters. Understand the monetary value of each price movement across different lot sizes and currency pairs with our Pip Calculator.</p>
                    <Link href="/tools/pip-calculator" className="text-[11px] font-bold text-emerald-600 hover:underline no-underline">Open Pip Calculator &rarr;</Link>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-50/10 flex items-center justify-center">
                        <ArrowLeftRight className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Risk Reward Ratio</h4>
                        <p className="text-[10px] text-slate-500">Validate every trade setup</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">Analyze whether a trade setup offers sufficient reward relative to the risk taken. Aim for setups with at least 1:2 or higher risk reward ratios.</p>
                    <Link href="/tools/risk-reward-calculator" className="text-[11px] font-bold text-purple-600 hover:underline no-underline">Open Risk Reward &rarr;</Link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="sticky top-24">
                <MiniRiskTerminal />
              </div>
            </div>
          </div>
        </section>

        {/* Complete Tools Grid */}
        <section className="space-y-8 pt-12 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-accent" />
              All Trading Tools
            </h2>
            <Link href="/tools" className="text-sm font-bold text-accent hover:underline no-underline">
              View All Tools <ArrowRight className="w-4 h-4 inline" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((tool) => {
              const Icon = ICON_MAP[tool.title] || Calculator;
              return (
                <Link key={tool.title} href={tool.href} className="block group">
                  <article className="border border-slate-100 p-6 rounded-2xl bg-white hover:shadow-xl hover:border-accent/10 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] font-black text-accent bg-accent/5 px-3 py-1 rounded-full uppercase tracking-widest">
                        {tool.badge}
                      </span>
                      <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-accent/10 transition-colors">
                        <Icon className="w-4 h-4 text-slate-400 group-hover:text-accent transition-colors" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold font-serif text-slate-900 mb-2 group-hover:text-accent transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {tool.description}
                    </p>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Learning Paths */}
        <section className="space-y-8 pt-12 border-t border-slate-100">
          <h2 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-accent" />
            Learning Paths
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/blog?category=Forex+Education" className="block group border border-slate-100 rounded-2xl p-6 bg-white hover:shadow-xl hover:border-accent/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold font-serif text-slate-900 mb-2 group-hover:text-accent transition-colors">Forex Education</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Start from the basics. Learn what Forex is, how currency pairs work, and understand market mechanics with our comprehensive guides.</p>
              <span className="text-xs font-bold text-accent mt-4 inline-flex items-center gap-1">
                4 Guides <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/blog?category=Risk+Management" className="block group border border-slate-100 rounded-2xl p-6 bg-white hover:shadow-xl hover:border-accent/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-50/10 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold font-serif text-slate-900 mb-2 group-hover:text-accent transition-colors">Risk Management</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Master position sizing, stop loss placement, and risk reward calculations. Protect your capital and trade with confidence.</p>
              <span className="text-xs font-bold text-accent mt-4 inline-flex items-center gap-1">
                2 Guides <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/blog?category=Trading+Psychology" className="block group border border-slate-100 rounded-2xl p-6 bg-white hover:shadow-xl hover:border-accent/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-50/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold font-serif text-slate-900 mb-2 group-hover:text-accent transition-colors">Trading Psychology</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Master your emotions, develop a probabilistic mindset, and learn to trade with discipline. The mental edge that separates pros from amateurs.</p>
              <span className="text-xs font-bold text-accent mt-4 inline-flex items-center gap-1">
                2 Guides <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </section>

        {/* Trust Section */}
        <section className="space-y-8 pt-12 border-t border-slate-100">
          <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl font-bold font-serif">Built for Traders, By a Trader</h2>
              <p className="text-slate-400 leading-relaxed max-w-2xl text-lg">
                All content and tools are created by MUHAMMAD USMAN, a senior market analyst with 12+ years of experience specializing in XAUUSD and global liquidity cycles. Every guide is human written, mathematically verified, and designed for real world application.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                  <Award className="w-8 h-8 text-accent mx-auto mb-3" />
                  <div className="text-2xl font-bold font-serif">12+</div>
                  <div className="text-xs text-slate-400 mt-1">Years Experience</div>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                  <BookOpen className="w-8 h-8 text-accent mx-auto mb-3" />
                  <div className="text-2xl font-bold font-serif">8+</div>
                  <div className="text-xs text-slate-400 mt-1">Expert Guides</div>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                  <ShieldCheck className="w-8 h-8 text-accent mx-auto mb-3" />
                  <div className="text-2xl font-bold font-serif">0</div>
                  <div className="text-xs text-slate-400 mt-1">Hidden Fees</div>
                </div>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link href="/about" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-6 py-3.5 rounded-xl transition-all no-underline text-sm">
                  Read Our Story <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/editorial-policy" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl transition-all no-underline text-sm border border-slate-700">
                  Editorial Policy
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="space-y-4 pt-8 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 space-y-4">
            <h3 className="text-lg font-bold font-serif text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-accent" />
              Why Trust Usman Trades?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-accent font-black mt-0.5">1.</span>
                  <p className="text-sm text-slate-600 leading-relaxed">All content is human written by a senior market analyst with real world experience. No AI generated fluff.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent font-black mt-0.5">2.</span>
                  <p className="text-sm text-slate-600 leading-relaxed">Every formula and calculation is mathematically verified against industry standards.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent font-black mt-0.5">3.</span>
                  <p className="text-sm text-slate-600 leading-relaxed">We do not accept payments from brokers to promote their services. Our advice is independent and unbiased.</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-accent font-black mt-0.5">4.</span>
                  <p className="text-sm text-slate-600 leading-relaxed">All tools perform calculations locally in your browser. Your data is never stored or transmitted.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent font-black mt-0.5">5.</span>
                  <p className="text-sm text-slate-600 leading-relaxed">We never guarantee profits or promise specific outcomes. Trading involves significant risk.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent font-black mt-0.5">6.</span>
                  <p className="text-sm text-slate-600 leading-relaxed">Our educational library covers Forex, Gold, Bitcoin, risk management, and trading psychology.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
