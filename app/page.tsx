import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS, CATEGORIES } from '@/lib/blogData';
import { TOOLS } from '@/lib/toolsData';
import { getPexelsImage } from '@/lib/pexels';
import Image from 'next/image';
import { Calendar, User, Calculator, ShieldAlert, BarChart3, TrendingUp, ArrowLeftRight, Coins, TrendingDown, Lock, Scale, Clock, ArrowRight, Sparkles, ShieldCheck, BookOpen, TrendingUp as TrendingUpIcon, Globe, DollarSign, PieChart, Target, Award } from 'lucide-react';
import dynamic from 'next/dynamic';

const LiveTicker = dynamic(() => import('@/components/LiveTicker'));
const MiniRiskTerminal = dynamic(() => import('@/components/MiniRiskTerminal'));

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

  const usedUrls = new Set<string>();
  const postsWithImages = await Promise.all(
    sortedPosts.map(async (post) => {
      const pexelsImage = await getPexelsImage(post.slug, usedUrls);
      return { ...post, image: pexelsImage };
    })
  );

  const featuredImage = postsWithImages[0]?.image;
  const recentPostsWithImages = postsWithImages.slice(1);

  return (
    <div className="space-y-0 py-0">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a0e27] via-[#0f1639] to-[#0a0e27] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0f1639] to-slate-950"></div>
        <div className="absolute top-0 right-0 w-[14rem] h-[14rem] md:w-[28rem] md:h-[28rem] bg-accent/15 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-blue-500/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 md:w-96 md:h-96 bg-accent/8 blur-[180px] rounded-full translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-12 py-12 md:py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-10">
              <div className="inline-flex items-center gap-2.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[11px] md:text-xs uppercase font-black tracking-[0.2em] text-accent">Live Market Data</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold font-serif leading-[1.1] tracking-tight text-white">
                Trade Smarter,{' '}
                <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">Not Harder</span>
              </h1>
              <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-lg">
                Professional trading education and free calculators for Forex, Gold, and Bitcoin. Built by a senior market analyst with over a decade of experience.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/blog" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-6 py-3 rounded-xl transition-all no-underline hover:shadow-lg hover:shadow-accent/30 text-sm min-h-[44px]">
                  Explore Education <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/tools" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-all no-underline text-sm border border-white/20 backdrop-blur-sm min-h-[44px]">
                  Open Tools <Sparkles className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { icon: DollarSign, value: '$7T+', label: 'Daily Forex Volume', color: 'from-emerald-500/20 to-emerald-600/5' },
                { icon: BookOpen, value: '8+', label: 'Expert Guides', color: 'from-accent/20 to-accent/5' },
                { icon: Calculator, value: '10', label: 'Free Tools', color: 'from-blue-500/20 to-blue-600/5' },
                { icon: ShieldCheck, value: '100%', label: 'Free Forever', color: 'from-amber-500/20 to-amber-600/5' },
              ].map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-accent mx-auto mb-2 md:mb-3" />
                  <div className="text-2xl md:text-3xl font-bold font-serif bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-[11px] md:text-xs text-slate-400 mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Ticker */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-12">
        <div className="mt-[-16px] md:mt-[-24px] relative z-20">
          <LiveTicker />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-12 space-y-10 md:space-y-16 py-8 md:py-12">
        
        {/* Featured Article */}
{featuredImage && (
 <section className="space-y-4 md:space-y-6 pt-6 md:pt-8 border-t border-white/5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  Featured Guide
                </h2>
               <Link href="/blog" className="text-xs md:text-sm font-bold text-accent hover:underline no-underline min-h-[44px] flex items-center">
                 View All <ArrowRight className="w-4 h-4 inline" />
               </Link>
             </div>
             
             <Link href={featuredPost?.route || '#'} className="block group">
               <article className="relative border border-slate-100 rounded-xl md:rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 group">
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
                   <div className="absolute top-3 left-3 md:top-4 md:left-4">
                     <span className="bg-accent text-white text-[9px] md:text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                       {featuredPost?.category}
                     </span>
                   </div>
                   <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                     <h3 className="text-xl md:text-2xl lg:text-4xl font-bold font-serif text-white leading-tight">
                       {featuredPost?.title}
                     </h3>
                     <p className="text-xs md:text-sm mt-1 md:mt-2 leading-relaxed line-clamp-2">
                       {featuredPost?.excerpt}
                     </p>
                   </div>
                 </div>
                 <div className="p-4 md:p-6 flex items-center justify-between border-t border-slate-100">
                   <div className="flex items-center gap-2 md:gap-3">
                     <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] md:text-xs font-black">
                       {featuredPost?.author.name.split(' ').map(n => n[0]).join('')}
                     </div>
                     <div>
                       <div className="text-xs md:text-sm font-bold text-slate-900">{featuredPost?.author.name}</div>
                       <div className="text-[10px] md:text-[11px] text-slate-500">{featuredPost?.date} &bull; {featuredPost?.readTime}</div>
                     </div>
                   </div>
                   <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
                 </div>
               </article>
             </Link>
           </section>
         )}

{/* Latest Articles */}
        <section className="space-y-6 md:space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl md:text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 md:w-6 md:h-6 text-accent" />
              Latest Guides
            </h2>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter(c => c !== 'All').slice(0, 4).map((category) => (
                <Link
                  key={category}
                  href={`/blog?category=${encodeURIComponent(category)}`}
                  className="text-xs md:text-[10px] font-bold px-3 py-2 rounded-full border border-white/20 text-slate-600 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all no-underline uppercase tracking-wider min-h-[44px] flex items-center"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {recentPostsWithImages.map((post, index) => (
              <article key={post.slug} className="group flex flex-col space-y-4">
                <Link href={post.route} className="block relative aspect-[16/10] w-full rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                  <Image
                    src={post.image.url}
                    alt={post.image.alt}
                    fill
                    priority={index < 1}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] md:text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </Link>
                <div className="space-y-2 md:space-y-3 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 md:gap-4 text-[11px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-bold font-serif text-slate-900 leading-tight group-hover:text-accent transition-colors line-clamp-2">
                    <Link href={post.route} className="no-underline">{post.title}</Link>
                  </h3>
                </div>
                <div className="pt-3 md:pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] md:text-[11px] font-black text-slate-400 uppercase">
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-[11px] md:text-xs font-bold text-slate-600">{post.author.name}</span>
                  </div>
                  <Link href={post.route} className="text-[11px] md:text-xs font-black text-accent uppercase tracking-[0.1em] no-underline hover:text-accent-dark transition-colors min-h-[44px] flex items-center">
                    Read &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

{/* Market Analysis Section */}
        <section className="space-y-6 md:space-y-8 pt-8 md:pt-12 border-t border-white/5">
          <h2 className="text-xl md:text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            Risk Management Toolkit
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8 space-y-4 md:space-y-6 shadow-sm">
                <div>
                  <h3 className="text-lg md:text-xl font-bold font-serif text-slate-900 mb-2 md:mb-3">Master Your Risk Before Every Trade</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Proper risk management is the foundation of long term trading success. Whether you trade Forex, Gold, or Bitcoin, understanding how to calculate your position size, determine your risk reward ratio, and manage your drawdown is essential. Our free tools are built by a senior market analyst with 12+ years of experience and are designed to help you make mathematically sound decisions every time.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-white border border-white/20 rounded-xl p-4 md:p-5 space-y-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Position Sizing</h4>
                        <p className="text-[11px] md:text-xs text-slate-500">Calculate exact lot sizes based on risk</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">Never risk more than you can afford. Calculate the correct position size for every trade based on your account balance and stop loss distance.</p>
                    <Link href="/tools/lot-size-calculator" className="text-[11px] md:text-xs font-bold text-accent hover:underline no-underline min-h-[44px] flex items-center">Open Lot Size Calculator &rarr;</Link>
                  </div>
                  <div className="bg-white border border-white/20 rounded-xl p-4 md:p-5 space-y-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50/10 flex items-center justify-center">
                        <ShieldAlert className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Risk Management</h4>
                        <p className="text-[11px] md:text-xs text-slate-500">Know your exact cash exposure</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">Calculate exactly how much cash you are risking before entering any trade. Set your risk percentage and let the calculator do the math.</p>
                    <Link href="/tools/risk-calculator" className="text-[11px] md:text-xs font-bold text-blue-600 hover:underline no-underline min-h-[44px] flex items-center">Open Risk Calculator &rarr;</Link>
                  </div>
                  <div className="bg-white border border-white/20 rounded-xl p-4 md:p-5 space-y-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50/10 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Pip Valuation</h4>
                        <p className="text-[11px] md:text-xs text-slate-500">Understand pip value across assets</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">Every pip matters. Understand the monetary value of each price movement across different lot sizes and currency pairs with our Pip Calculator.</p>
                    <Link href="/tools/pip-calculator" className="text-[11px] md:text-xs font-bold text-emerald-600 hover:underline no-underline min-h-[44px] flex items-center">Open Pip Calculator &rarr;</Link>
                  </div>
                  <div className="bg-white border border-white/20 rounded-xl p-4 md:p-5 space-y-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-50/10 flex items-center justify-center">
                        <ArrowLeftRight className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Risk Reward Ratio</h4>
                        <p className="text-[11px] md:text-xs text-slate-500">Validate every trade setup</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">Analyze whether a trade setup offers sufficient reward relative to the risk taken. Aim for setups with at least 1:2 or higher risk reward ratios.</p>
                    <Link href="/tools/risk-reward-calculator" className="text-[11px] md:text-xs font-bold text-purple-600 hover:underline no-underline min-h-[44px] flex items-center">Open Risk Reward &rarr;</Link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="sticky top-16 md:top-24">
                <MiniRiskTerminal />
              </div>
            </div>
          </div>
        </section>

        {/* Complete Tools Grid */}
        <section className="space-y-6 md:space-y-8 pt-8 md:pt-12 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl md:text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 md:w-6 md:h-6 text-accent" />
              All Trading Tools
            </h2>
            <Link href="/tools" className="text-xs md:text-sm font-bold text-accent hover:underline no-underline min-h-[44px] flex items-center">
              View All Tools <ArrowRight className="w-4 h-4 inline" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {TOOLS.map((tool) => {
              const Icon = ICON_MAP[tool.title] || Calculator;
              return (
                <Link key={tool.title} href={tool.href} className="block group">
                  <article className="border border-slate-100 p-4 md:p-6 rounded-xl md:rounded-2xl bg-white hover:shadow-xl hover:border-accent/10 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <span className="text-[10px] md:text-[11px] font-black text-accent bg-accent/5 px-2.5 py-1 rounded-full uppercase tracking-widest">
                        {tool.badge}
                      </span>
                      <div className="p-1.5 md:p-2 bg-slate-50 rounded-lg group-hover:bg-accent/10 transition-colors">
                        <Icon className="w-4 h-4 text-slate-400 group-hover:text-accent transition-colors" />
                      </div>
                    </div>
                    <h3 className="text-base md:text-lg font-bold font-serif text-slate-900 mb-2 group-hover:text-accent transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                      {tool.description}
                    </p>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Learning Paths */}
        <section className="space-y-6 md:space-y-8 pt-8 md:pt-12 border-t border-white/5">
          <h2 className="text-xl md:text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
            <PieChart className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            Learning Paths
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Link href="/blog?category=Forex+Education" className="block group border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 bg-white hover:shadow-xl hover:border-accent/20 transition-all duration-300">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-accent/10 flex items-center justify-center mb-3 md:mb-4">
                <Globe className="w-5 h-5 md:w-6 md:h-6 text-accent" />
              </div>
              <h3 className="text-base md:text-lg font-bold font-serif text-slate-900 mb-2 group-hover:text-accent transition-colors">Forex Education</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Start from the basics. Learn what Forex is, how currency pairs work, and understand market mechanics with our comprehensive guides.</p>
              <span className="text-xs font-bold text-accent mt-3 md:mt-4 inline-flex items-center gap-1">
                4 Guides <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/blog?category=Risk+Management" className="block group border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 bg-white hover:shadow-xl hover:border-accent/20 transition-all duration-300">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-50/10 flex items-center justify-center mb-3 md:mb-4">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <h3 className="text-base md:text-lg font-bold font-serif text-slate-900 mb-2 group-hover:text-accent transition-colors">Risk Management</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Master position sizing, stop loss placement, and risk reward calculations. Protect your capital and trade with confidence.</p>
              <span className="text-xs font-bold text-accent mt-3 md:mt-4 inline-flex items-center gap-1">
                2 Guides <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/blog?category=Trading+Psychology" className="block group border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 bg-white hover:shadow-xl hover:border-accent/20 transition-all duration-300">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-purple-50/10 flex items-center justify-center mb-3 md:mb-4">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
              <h3 className="text-base md:text-lg font-bold font-serif text-slate-900 mb-2 group-hover:text-accent transition-colors">Trading Psychology</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Master your emotions, develop a probabilistic mindset, and learn to trade with discipline. The mental edge that separates pros from amateurs.</p>
              <span className="text-xs font-bold text-accent mt-3 md:mt-4 inline-flex items-center gap-1">
                2 Guides <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </section>

        {/* Trust Section */}
        <section className="space-y-6 md:space-y-8 pt-8 md:pt-12 border-t border-white/5">
          <div className="relative bg-gradient-to-br from-[#0f1639] via-[#111838] to-[#0f1639] rounded-xl md:rounded-3xl p-4 md:p-8 lg:p-14 overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-accent/15 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-blue-600/10 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3"></div>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            <div className="relative z-10 space-y-6 md:space-y-10">
              <div className="flex items-center gap-3">
                <span className="w-1 h-6 md:h-8 bg-accent rounded-full"></span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">Built for Traders, By a Trader</h2>
              </div>
              <p className="text-sm md:text-lg text-slate-300 leading-relaxed max-w-2xl">
                All content and tools are created by MUHAMMAD USMAN, a senior market analyst with 12+ years of experience specializing in XAUUSD and global liquidity cycles. Every guide is human written, mathematically verified, and designed for real world application.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {[
                  { icon: Award, value: '12+', label: 'Years Experience', gradient: 'from-accent to-blue-500' },
                  { icon: BookOpen, value: '8+', label: 'Expert Guides', gradient: 'from-blue-500 to-cyan-500' },
                  { icon: ShieldCheck, value: '0', label: 'Hidden Fees', gradient: 'from-cyan-500 to-emerald-500' },
                ].map((stat, index) => (
                  <div key={index} className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 rounded-xl md:rounded-xl p-4 md:p-6 text-center hover:border-accent/25 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
                    <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-accent mx-auto mb-3 md:mb-4" />
                    <div className="text-2xl md:text-3xl font-bold font-serif bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">{stat.value}</div>
                    <div className="text-[11px] md:text-xs text-slate-400 mt-1 md:mt-2 font-medium uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="pt-3 md:pt-4 flex flex-wrap gap-3">
                <Link href="/about" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-6 py-3 rounded-xl transition-all no-underline hover:shadow-lg hover:shadow-accent/30 text-sm min-h-[44px]">
                  Read Our Story <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/editorial-policy" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold px-6 py-3 rounded-xl transition-all no-underline text-sm border border-white/20 backdrop-blur-sm min-h-[44px]">
                  Editorial Policy
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="space-y-4 pt-6 md:pt-8 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl p-4 md:p-8 space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-accent" />
              Why Trust Usman Trades?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-3">
                {[
                  'All content is human written by a senior market analyst with real world experience. No AI generated fluff.',
                  'Every formula and calculation is mathematically verified against industry standards.',
                  'We do not accept payments from brokers to promote their services. Our advice is independent and unbiased.',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="bg-accent text-white font-black mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] md:text-xs">{i + 1}</span>
                    <p className="text-sm text-slate-600 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  'All tools perform calculations locally in your browser. Your data is never stored or transmitted.',
                  'We never guarantee profits or promise specific outcomes. Trading involves significant risk.',
                  'Our educational library covers Forex, Gold, Bitcoin, risk management, and trading psychology.',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="bg-accent text-white font-black mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] md:text-xs">{i + 4}</span>
                    <p className="text-sm text-slate-600 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
