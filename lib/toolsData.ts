export interface Tool {
  title: string;
  description: string;
  href: string;
  badge: string;
}

export const TOOLS: Tool[] = [
  {
    title: 'Lot Size Calculator',
    description: 'Calculate the exact trade size based on your account balance and stop loss pips.',
    href: '/tools/lot-size-calculator',
    badge: 'Risk Control',
  },
  {
    title: 'Risk Calculator',
    description: 'Find out exactly how much cash you are risking before you enter the market.',
    href: '/tools/risk-calculator',
    badge: 'Defense',
  },
  {
    title: 'Pip Calculator',
    description: 'Understand the monetary value of every pip across different assets and lot sizes.',
    href: '/tools/pip-calculator',
    badge: 'Valuation',
  },
  {
    title: 'Profit Calculator',
    description: 'Estimate your potential gains or losses based on your technical price targets.',
    href: '/tools/profit-calculator',
    badge: 'Projection',
  },
  {
    title: 'Risk Reward Calculator',
    description: 'Analyze the relationship between your potential profit and loss on any setup.',
    href: '/tools/risk-reward-calculator',
    badge: 'Strategy',
  },
  {
    title: 'Compound Growth',
    description: 'Project your long term account path through the power of consistent gains.',
    href: '/tools/compound-growth-calculator',
    badge: 'Wealth',
  },
  {
    title: 'Drawdown Calculator',
    description: 'See the mathematical reality of account recovery after a period of losses.',
    href: '/tools/drawdown-calculator',
    badge: 'Recovery',
  },
  {
    title: 'Margin Calculator',
    description: 'Calculate the deposit required by your broker to maintain leveraged positions.',
    href: '/tools/margin-calculator',
    badge: 'Collateral',
  },
  {
    title: 'Spread Cost Tool',
    description: 'Calculate the real dollar cost of entry based on current broker spreads.',
    href: '/tools/spread-cost-calculator',
    badge: 'Expenses',
  },
  {
    title: 'Session Timer',
    description: 'Track global market hours and identify high liquidity session overlaps.',
    href: '/tools/session-timer',
    badge: 'Timing',
  }
];
