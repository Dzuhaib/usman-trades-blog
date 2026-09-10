export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Forex Education' | 'Gold (XAUUSD) Analysis' | 'Bitcoin Trading' | 'Risk Management' | 'Trading Psychology' | 'Technical Analysis';
  date: string;
  updatedAt: string;
  readTime: string;
  route: string;
  author: {
    name: string;
    role: string;
    bio: string;
  };
  content?: string;
}

export function getTodayDate(): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'position-sizing',
    title: 'Position Sizing Formula: How to Calculate Your Lot Size',
    excerpt: 'Stop guessing your trade size. Learn the simple mathematical formula to calculate lot sizes for Forex, Gold, and Bitcoin based on your risk with real world examples.',
    category: 'Risk Management',
    date: 'May 29, 2026',
    updatedAt: 'May 29, 2026',
    readTime: '12 min read',
    route: '/blog/posts/position-sizing',
    content: '@/content/blog/position-sizing.md',
    author: {
      name: 'MUHAMMAD USMAN',
      role: 'Senior Market Analyst',
      bio: 'Professional macro trader with 12+ years of experience specializing in XAUUSD and global liquidity cycles.'
    }
  },
{
    slug: 'how-to-invest-in-gold-for-beginners',
    title: 'How to Invest in Gold for Beginners: The Senior Analyst Guide to XAUUSD',
    excerpt: 'Learn how to invest in Gold with this comprehensive beginner\'s guide covering XAUUSD analysis, risk management, and practical trading strategies.',
    category: 'Gold (XAUUSD) Analysis',
    date: 'June 16, 2026',
    updatedAt: 'June 16, 2026',
    readTime: '15 min read',
    route: '/blog/posts/how-to-invest-in-gold-for-beginners',
    content: '@/content/blog/how-to-invest-in-gold-for-beginners.md',
    author: {
      name: 'MUHAMMAD USMAN',
      role: 'Senior Market Analyst',
      bio: 'Professional macro trader with 12+ years of experience specializing in XAUUSD and global liquidity cycles.'
    }
  },
{
    slug: 'what-is-forex',
    title: 'What is Forex Trading? A Simple Guide to the Global Market',
    excerpt: 'Learn how the currency markets actually work. We break down liquidity, major pairs, and the hidden costs of trading in plain English with real world examples.',
    category: 'Forex Education',
    date: 'June 1, 2026',
    updatedAt: 'June 1, 2026',
    readTime: '11 min read',
    route: '/blog/posts/what-is-forex',
    content: '@/content/blog/what-is-forex.md',
    author: {
      name: 'MUHAMMAD USMAN',
      role: 'Senior Market Analyst',
      bio: 'Professional macro trader with 12+ years of experience specializing in XAUUSD and global liquidity cycles.'
    }
  },
  {
    slug: 'bitcoin-risk-management',
    title: 'Bitcoin Risk Management: How to Handle Crypto Volatility',
    excerpt: 'Learn how to manage risk and protect your crypto investments during high volatility periods.',
    category: 'Bitcoin Trading',
    date: 'June 7, 2026',
    updatedAt: 'June 7, 2026',
    readTime: '12 min read',
    route: '/blog/posts/bitcoin-risk-management',
    content: '@/content/blog/bitcoin-risk-management.md',
    author: {
      name: 'MUHAMMAD USMAN',
      role: 'Senior Market Analyst',
      bio: 'Professional macro trader with 12+ years of experience specializing in XAUUSD and global liquidity cycles.'
    }
  },
  {
    slug: 'trading-mindset',
    title: 'Trading Psychology: How to Keep a Cool Head in the Market',
    excerpt: 'Master your emotions while trading. Learn how to overcome common mental mistakes like fear and greed to build a disciplined approach with real world examples.',
    category: 'Trading Psychology',
    date: 'June 4, 2026',
    updatedAt: 'June 4, 2026',
    readTime: '11 min read',
    route: '/blog/posts/trading-mindset',
    content: '@/content/blog/trading-mindset.md',
    author: {
      name: 'MUHAMMAD USMAN',
      role: 'Senior Market Analyst',
      bio: 'Professional macro trader with 12+ years of experience specializing in XAUUSD and global liquidity cycles.'
    }
  },
{
    slug: 'support-resistance',
    title: 'Technical Analysis: Finding High-Probability Entry Zones',
    excerpt: 'Move past basic trendlines. Learn how to identify where large institutions are actually trading using supply, demand, and order blocks with real world examples.',
    category: 'Technical Analysis',
    date: 'June 10, 2026',
    updatedAt: 'June 10, 2026',
    readTime: '11 min read',
    route: '/blog/posts/support-resistance',
    content: '@/content/blog/support-resistance.md',
    author: {
      name: 'MUHAMMAD USMAN',
      role: 'Senior Market Analyst',
      bio: 'Professional macro trader with 12+ years of experience specializing in XAUUSD and global liquidity cycles.'
    }
  },
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