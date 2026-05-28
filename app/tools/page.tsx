import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, ShieldAlert, BarChart3, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Trading Calculators | Lot Size, Risk, Pip and Profit Tools',
  description: 'Access free mathematically precise trading calculators for Forex, Gold XAUUSD, and Bitcoin. Calculate lot size, risk exposure, pip value, and projected profit instantly in your browser.',
  alternates: {
    canonical: '/tools',
  },
};

export default function ToolsLanding() {
  const tools = [
    {
      title: 'Lot Size Calculator',
      description: 'Calculate the exact contract size or units to trade based on your balance, stop loss pips, and risk percentage.',
      href: '/tools/lot-size-calculator',
      badge: 'Risk Control',
      icon: Calculator
    },
    {
      title: 'Risk Calculator',
      description: 'Determine your absolute cash risk, entry/exit coordinates, and pip gaps before committing any capital to a position.',
      href: '/tools/risk-calculator',
      badge: 'Account Defense',
      icon: ShieldAlert
    },
    {
      title: 'Pip Calculator',
      description: 'Instantly calculate the pip value in your account currency for standard, mini, and micro lots across major instruments.',
      href: '/tools/pip-calculator',
      badge: 'Contract Math',
      icon: BarChart3
    },
    {
      title: 'Profit Calculator',
      description: 'Calculate potential returns or losses based on entry price, exit targets, leverage contracts, and trade direction.',
      href: '/tools/profit-calculator',
      badge: 'Setup Valuation',
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-extrabold text-primary mb-2 md:text-4xl">Trading Utility Tools</h1>
        <p className="text-sm text-secondary font-medium">Mathematically sound, standard calculators designed for Forex, Gold (XAUUSD), and Bitcoin.</p>
      </header>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {tools.map((tool) => (
          <article 
            key={tool.title} 
            className="border border-border p-6 rounded-[4px] bg-white flex flex-col justify-between hover:shadow-md hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-[4px] inline-block">
                  {tool.badge}
                </span>
                <div className="p-2 bg-slate-50 rounded-full group-hover:bg-accent/10 transition-colors">
                  <tool.icon className="w-5 h-5 text-secondary group-hover:text-accent transition-colors" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                {tool.title}
              </h2>
              <p className="text-sm text-secondary leading-relaxed mb-6">
                {tool.description}
              </p>
            </div>
            <Link
              href={tool.href}
              className="inline-block text-center border border-border hover:border-primary text-primary font-semibold text-sm px-4 py-2.5 rounded-[4px] bg-surface hover:bg-white active:scale-[0.98] transition-all duration-200"
            >
              Open Calculator &rarr;
            </Link>
          </article>
        ))}
      </div>

      {/* Trust & Policy reminder */}
      <section className="bg-surface border border-border p-6 rounded-[4px] space-y-2 text-xs text-muted leading-relaxed">
        <h3 className="text-xs font-bold text-primary m-0">Zero Tracking Policy</h3>
        <p className="m-0">
          All calculations are handled entirely in your local browser using client-side JavaScript. None of your balance metrics, currency configurations, or trade coordinates are transmitted or stored on our servers. Safe, fast, and completely private.
        </p>
      </section>
    </div>
  );
}
