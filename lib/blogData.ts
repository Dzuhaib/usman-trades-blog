export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Forex Education' | 'Gold (XAUUSD) Analysis' | 'Bitcoin Trading' | 'Risk Management' | 'Trading Psychology' | 'Technical Analysis';
  date: string;
  updatedAt: string;
  readTime: string;
  route: string;
  content?: string;
  author: {
    name: string;
    role: string;
    bio: string;
  };
}

// Utility to get today's date in 'Month DD, YYYY' format
export function getTodayDate(): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'position-sizing',
    title: 'Position Sizing Formula: How to Calculate Your Lot Size',
    excerpt: 'Stop guessing your trade size. Learn the simple mathematical formula to calculate lot sizes for Forex, Gold, and Bitcoin based on your risk.',
    category: 'Risk Management',
    date: 'May 29, 2026',
    updatedAt: 'May 29, 2026',
    readTime: '6 min read',
    route: '/blog/posts/position-sizing',
    author: {
      name: 'MUHAMMAD USMAN',
      role: 'Head of Research',
      bio: 'Professional trader with over 12 years of experience in global macro markets and risk management.'
    }
  },
  {
    slug: 'xauusd-guide',
    title: 'Gold Trading Guide: How to Trade XAUUSD with Confidence',
    excerpt: "Understand what actually moves the gold market. We explore central bank activity, US dollar correlation, and how to manage gold's volatility.",
    category: 'Gold (XAUUSD) Analysis',
    date: 'May 29, 2026',
    updatedAt: 'May 29, 2026',
    readTime: '8 min read',
    route: '/blog/posts/xauusd-guide',
    author: {
      name: 'MUHAMMAD USMAN',
      role: 'Head of Research',
      bio: 'Professional trader with over 12 years of experience in global macro markets and risk management.'
    }
  },
  {
    slug: 'what-is-forex',
    title: 'What is Forex Trading? A Simple Guide to the Global Market',
    excerpt: 'Learn how the currency markets actually work. We break down liquidity, major pairs, and the hidden costs of trading in plain English.',
    category: 'Forex Education',
    date: 'May 29, 2026',
    updatedAt: 'May 29, 2026',
    readTime: '7 min read',
    route: '/blog/posts/what-is-forex',
    author: {
      name: 'MUHAMMAD USMAN',
      role: 'Head of Research',
      bio: 'Professional trader with over 12 years of experience in global macro markets and risk management.'
    }
  },
  {
    slug: 'bitcoin-risk-management',
    title: 'Bitcoin Risk Management: How to Handle Crypto Volatility',
    excerpt: 'Trading Bitcoin doesn&apos;t have to be a gamble. Learn how to protect your account from big swings and manage your crypto positions safely.',
    category: 'Bitcoin Trading',
    date: 'May 29, 2026',
    updatedAt: 'May 29, 2026',
    readTime: '9 min read',
    route: '/blog/posts/bitcoin-risk-management',
    author: {
      name: 'MUHAMMAD USMAN',
      role: 'Head of Research',
      bio: 'Professional trader with over 12 years of experience in global macro markets and risk management.'
    }
  },
  {
    slug: 'trading-mindset',
    title: 'Trading Psychology: How to Keep a Cool Head in the Market',
    excerpt: 'Master your emotions while trading. Learn how to overcome common mental mistakes like fear and greed to build a disciplined approach.',
    category: 'Trading Psychology',
    date: 'May 29, 2026',
    updatedAt: 'May 29, 2026',
    readTime: '5 min read',
    route: '/blog/posts/trading-mindset',
    author: {
      name: 'MUHAMMAD USMAN',
      role: 'Head of Research',
      bio: 'Professional trader with over 12 years of experience in global macro markets and risk management.'
    }
  },
  {
    slug: 'support-resistance',
    title: 'Technical Analysis: Finding High-Probability Entry Zones',
    excerpt: 'Move past basic trendlines. Learn how to identify where large institutions are actually trading using supply, demand, and order blocks.',
    category: 'Technical Analysis',
    date: 'May 29, 2026',
    updatedAt: 'May 29, 2026',
    readTime: '8 min read',
    route: '/blog/posts/support-resistance',
    author: {
      name: 'MUHAMMAD USMAN',
      role: 'Head of Research',
      bio: 'Professional trader with over 12 years of experience in global macro markets and risk management.'
    }
  },
  {
    slug: 'what-moves-gold',
    title: 'What Moves Gold Prices Every Day? The 4 Core Drivers',
    excerpt: 'Understand why gold prices fluctuate. We break down the relationship between interest rates, the US dollar, and central bank activity.',
    category: 'Gold (XAUUSD) Analysis',
    date: 'May 29, 2026',
    updatedAt: 'May 29, 2026',
    readTime: '10 min read',
    route: '/blog/posts/what-moves-gold',
    author: {
      name: 'MUHAMMAD USMAN',
      role: 'Head of Research',
      bio: 'Professional trader with over 12 years of experience in global macro markets and risk management.'
    }
  },
  {
    slug: 'best-risk-percentage',
    title: 'What Is The Best Risk Percentage Per Trade? A Complete Guide',
    excerpt: 'Find your optimal risk level to survive and grow. We explain why 1% is the gold standard and how deep losses can ruin your compounding math.',
    category: 'Risk Management',
    date: 'May 31, 2026',
    updatedAt: 'May 31, 2026',
    readTime: '12 min read',
    route: '/blog/posts/best-risk-percentage',
    author: {
      name: 'MUHAMMAD USMAN',
      role: 'Head of Research',
      bio: 'Professional trader with over 12 years of experience in global macro markets and risk management.'
    }
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
