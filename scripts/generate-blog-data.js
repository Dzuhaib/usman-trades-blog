const fs = require('fs');
const path = require('path');

const blogDir = 'content/blog';
const posts = ['position-sizing', 'how-to-invest-in-gold-for-beginners', 'what-is-forex', 'bitcoin-risk-management', 'trading-mindset', 'support-resistance'];

const meta = {
  'position-sizing': { slug: 'position-sizing', title: 'Position Sizing Formula: How to Calculate Your Lot Size', excerpt: 'Stop guessing your trade size. Learn the simple mathematical formula to calculate lot sizes for Forex, Gold, and Bitcoin based on your risk with real world examples.', category: 'Risk Management', date: 'May 29, 2026', updatedAt: 'May 29, 2026', readTime: '12 min read', route: '/blog/posts/position-sizing' },
  'how-to-invest-in-gold-for-beginners': { slug: 'how-to-invest-in-gold-for-beginners', title: 'How to Invest in Gold for Beginners: The Senior Analyst Guide to XAUUSD', excerpt: 'Learn how to invest in Gold with this comprehensive beginner guide covering XAUUSD analysis, risk management, and practical trading strategies.', category: 'Gold (XAUUSD) Analysis', date: 'June 16, 2026', updatedAt: 'June 16, 2026', readTime: '15 min read', route: '/blog/posts/how-to-invest-in-gold-for-beginners' },
  'what-is-forex': { slug: 'what-is-forex', title: 'What is Forex Trading? A Simple Guide to the Global Market', excerpt: 'Learn how the currency markets actually work. We break down liquidity, major pairs, and the hidden costs of trading in plain English with real world examples.', category: 'Forex Education', date: 'June 1, 2026', updatedAt: 'June 1, 2026', readTime: '11 min read', route: '/blog/posts/what-is-forex' },
  'bitcoin-risk-management': { slug: 'bitcoin-risk-management', title: 'Bitcoin Risk Management: How to Handle Crypto Volatility', excerpt: 'Learn how to manage risk and protect your crypto investments during high volatility periods.', category: 'Bitcoin Trading', date: 'June 7, 2026', updatedAt: 'June 7, 2026', readTime: '12 min read', route: '/blog/posts/bitcoin-risk-management' },
  'trading-mindset': { slug: 'trading-mindset', title: 'Trading Psychology: How to Keep a Cool Head in the Market', excerpt: 'Master your emotions while trading. Learn how to overcome common mental mistakes like fear and greed to build a disciplined approach with real world examples.', category: 'Trading Psychology', date: 'June 4, 2026', updatedAt: 'June 4, 2026', readTime: '11 min read', route: '/blog/posts/trading-mindset' },
  'support-resistance': { slug: 'support-resistance', title: 'Technical Analysis: Finding High-Probability Entry Zones', excerpt: 'Move past basic trendlines. Learn how to identify where large institutions are actually trading using supply, demand, and order blocks with real world examples.', category: 'Technical Analysis', date: 'June 10, 2026', updatedAt: 'June 10, 2026', readTime: '11 min read', route: '/blog/posts/support-resistance' }
};

const author = '{ name: "MUHAMMAD USMAN", role: "Senior Market Analyst", bio: "Professional macro trader with 12+ years of experience specializing in XAUUSD and global liquidity cycles." }';

let body = `export interface BlogPost {\n  slug: string;\n  title: string;\n  excerpt: string;\n  category: string;\n  date: string;\n  updatedAt: string;\n  readTime: string;\n  route: string;\n  content?: string;\n  author: { name: string; role: string; bio: string; };\n}\n\nexport function getTodayDate(): string {\n  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };\n  return new Date().toLocaleDateString("en-US", options);\n}\n\nexport const BLOG_POSTS: BlogPost[] = [\n`;

for (const slug of posts) {
  const md = fs.readFileSync(path.join(blogDir, slug + '.md'), 'utf-8');
  const escaped = md.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
  const m = meta[slug];
  body += `  {\n    slug: "${m.slug}",\n    title: "${m.title}",\n    excerpt: "${m.excerpt}",\n    category: "${m.category}",\n    date: "${m.date}",\n    updatedAt: "${m.updatedAt}",\n    readTime: "${m.readTime}",\n    route: "${m.route}",\n    content: "${escaped}",\n    author: ${author}\n  },\n`;
}

body += `];\n\nexport const CATEGORIES = ["All", "Forex Education", "Gold (XAUUSD) Analysis", "Bitcoin Trading", "Risk Management", "Trading Psychology", "Technical Analysis"];\n`;

fs.writeFileSync('lib/blogData.ts', body);
console.log('Done');
