import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calculator, 
  ShieldAlert, 
  BarChart3, 
  TrendingUp, 
  ArrowLeftRight, 
  Coins, 
  TrendingDown, 
  Lock, 
  Scale, 
  Clock 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trading Utility Suite | Professional Calculators and Tools',
  description: 'Access our full suite of professional trading tools. Calculate lot size, risk reward, compound growth, and margin requirements for Forex, Gold, and Bitcoin.',
  alternates: {
    canonical: '/tools',
  },
};

export default function ToolsLanding() {
  const tools = [
    {
      title: 'Lot Size Calculator',
      description: 'Calculate the exact trade size based on your account balance and stop loss pips.',
      href: '/tools/lot-size-calculator',
      badge: 'Risk Control',
      icon: Calculator
    },
    {
      title: 'Risk Calculator',
      description: 'Find out exactly how much cash you are risking before you enter the market.',
      href: '/tools/risk-calculator',
      badge: 'Defense',
      icon: ShieldAlert
    },
    {
      title: 'Pip Calculator',
      description: 'Understand the monetary value of every pip across different assets and lot sizes.',
      href: '/tools/pip-calculator',
      badge: 'Valuation',
      icon: BarChart3
    },
    {
      title: 'Profit Calculator',
      description: 'Estimate your potential gains or losses based on your technical price targets.',
      href: '/tools/profit-calculator',
      badge: 'Projection',
      icon: TrendingUp
    },
    {
      title: 'Risk Reward Calculator',
      description: 'Analyze the relationship between your potential profit and loss on any setup.',
      href: '/tools/risk-reward-calculator',
      badge: 'Strategy',
      icon: ArrowLeftRight
    },
    {
      title: 'Compound Growth',
      description: 'Project your long term account path through the power of consistent gains.',
      href: '/tools/compound-growth-calculator',
      badge: 'Wealth',
      icon: Coins
    },
    {
      title: 'Drawdown Calculator',
      description: 'See the mathematical reality of account recovery after a period of losses.',
      href: '/tools/drawdown-calculator',
      badge: 'Recovery',
      icon: TrendingDown
    },
    {
      title: 'Margin Calculator',
      description: 'Calculate the deposit required by your broker to maintain leveraged positions.',
      href: '/tools/margin-calculator',
      badge: 'Collateral',
      icon: Lock
    },
    {
      title: 'Spread Cost Tool',
      description: 'Calculate the real dollar cost of entry based on current broker spreads.',
      href: '/tools/spread-cost-calculator',
      badge: 'Expenses',
      icon: Scale
    },
    {
      title: 'Session Timer',
      description: 'Track global market hours and identify high liquidity session overlaps.',
      href: '/tools/session-timer',
      badge: 'Timing',
      icon: Clock
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Header */}
      <header className="space-y-6 max-w-[700px]">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 tracking-tight">Trading Utility Suite</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Our suite of professional calculators is designed to help you make objective, mathematically sound decisions. We focus on risk management and market mechanics to ensure your longevity in the financial world.
        </p>
      </header>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {tools.map((tool) => (
          <article 
            key={tool.title} 
            className="border border-slate-100 p-8 rounded-2xl bg-white flex flex-col justify-between hover:shadow-xl hover:border-accent/10 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black text-accent bg-accent/5 px-3 py-1 rounded-full uppercase tracking-widest">
                  {tool.badge}
                </span>
                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-accent/10 transition-colors">
                  <tool.icon className="w-5 h-5 text-slate-400 group-hover:text-accent transition-colors" />
                </div>
              </div>
              <h2 className="text-2xl font-bold font-serif text-slate-900 mb-3">
                {tool.title}
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                {tool.description}
              </p>
            </div>
            <Link
              href={tool.href}
              className="inline-block text-center border border-slate-200 text-slate-900 font-bold text-xs uppercase tracking-widest py-4 rounded-xl bg-slate-50 hover:bg-white hover:border-slate-900 active:scale-[0.98] transition-all duration-200 no-underline"
            >
              Open Calculator &rarr;
            </Link>
          </article>
        ))}
      </div>

      {/* Policy Section */}
      <section className="bg-slate-900 text-white rounded-3xl p-10 md:p-16 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-[600px] relative z-10 space-y-4">
          <h3 className="text-2xl font-bold font-serif">Your Data Privacy</h3>
          <p className="text-slate-400 leading-relaxed">
            All calculations are performed locally in your browser. We do not store, track, or transmit your trading data, balances, or strategies to any external server. Our tools are built for speed, accuracy, and absolute privacy.
          </p>
          <div className="pt-4">
             <Link href="/privacy-policy" className="text-accent font-bold text-sm hover:underline uppercase tracking-widest">Privacy Policy &rarr;</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
