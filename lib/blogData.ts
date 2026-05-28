export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Forex Education' | 'Gold (XAUUSD) Analysis' | 'Bitcoin Trading' | 'Risk Management' | 'Trading Psychology' | 'Technical Analysis';
  date: string;
  readTime: string;
  route: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'position-sizing',
    title: 'The Mathematics of Position Sizing in Leveraged Markets',
    excerpt: 'Why standard lot sizing fails, and how to calculate mathematically perfect trades based on your account metrics and stop loss coordinates.',
    category: 'Risk Management',
    date: 'May 28, 2026',
    readTime: '6 min read',
    route: '/blog/posts/position-sizing'
  },
  {
    slug: 'xauusd-guide',
    title: 'Gold Trading Guide: Navigating Macro Liquidity & Sentiment',
    excerpt: "Gold has a unique behavior in financial markets. We explore how macroeconomic indicators and treasury yields impact the physical metal's order book.",
    category: 'Gold (XAUUSD) Analysis',
    date: 'May 28, 2026',
    readTime: '8 min read',
    route: '/blog/posts/xauusd-guide'
  },
  {
    slug: 'what-is-forex',
    title: 'Forex Education: Core Market Architecture & Order Types',
    excerpt: 'Understanding liquidity providers, major and minor pairs, and why order execution types like market, limit, and stop orders dictate your spreads.',
    category: 'Forex Education',
    date: 'May 28, 2026',
    readTime: '7 min read',
    route: '/blog/posts/what-is-forex'
  },
  {
    slug: 'bitcoin-risk-management',
    title: 'Bitcoin Risk Management: Volatility Profiles & Drawdown Defense',
    excerpt: 'A blueprint on handling cryptocurrency volatility. We explain standard deviations of intraday ranges and asset allocation bounds.',
    category: 'Bitcoin Trading',
    date: 'May 28, 2026',
    readTime: '9 min read',
    route: '/blog/posts/bitcoin-risk-management'
  },
  {
    slug: 'trading-mindset',
    title: 'Trading Psychology: Mitigating Cognitive Biases in Executions',
    excerpt: 'Explore prospect theory, loss aversion, and confirmation bias in active trading, and learn rules-based procedures to manage behavioral risks.',
    category: 'Trading Psychology',
    date: 'May 28, 2026',
    readTime: '5 min read',
    route: '/blog/posts/trading-mindset'
  },
  {
    slug: 'support-resistance',
    title: 'Technical Analysis: Support, Resistance, and Price Action Liquidity',
    excerpt: 'Move past basic retail diagonal lines. Learn to map horizontal order blocks, liquidity voids, and institutional supply/demand pools.',
    category: 'Technical Analysis',
    date: 'May 28, 2026',
    readTime: '8 min read',
    route: '/blog/posts/support-resistance'
  }
];

export const CATEGORIES = [
  'All',
  'Forex Education',
  'Gold (XAUUSD) Analysis',
  'Bitcoin Trading',
  'Risk Management',
  'Trading Psychology',
  'Technical Analysis'
];
