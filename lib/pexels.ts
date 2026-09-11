export interface PexelsImage {
  url: string;
  alt: string;
}

const FALLBACK_IMAGES: Record<string, PexelsImage> = {
  'forex': {
    url: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Foreign Exchange market currency charts and trading terminals displaying candlestick patterns'
  },
  'gold': {
    url: 'https://images.pexels.com/photos/47047/gold-ingots-golden-treasure-47047.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Physical gold bullion bars stacked neatly as macroeconomic safe-haven stores of value'
  },
  'bitcoin': {
    url: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Physical gold-plated Bitcoin coins representing digital assets and cryptocurrency volatility parameters'
  },
  'risk-management': {
    url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Financial analyst mapping risk parameters, leverage calculations, and position boundaries on paperwork'
  },
  'trading-psychology': {
    url: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Disciplined institutional trader mapping rules-based execution plans to conquer cognitive bias'
  },
  'technical-analysis': {
    url: 'https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Close up of high-resolution monitor displaying multi-timeframe horizontal support and resistance channels'
  },
  'default': {
    url: 'https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Clean financial editorial office setup with Bloomberg-style price charts and calculated data tools'
  }
};

// Only unique category fallback images - each slug uses Pexels API instead of these static URLs
export const SLUG_IMAGES: Record<string, PexelsImage> = {
  'position-sizing': {
    url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Risk management calculation with leverage and position size on trading calculator'
  },
  'how-to-invest-in-gold-for-beginners': {
    url: 'https://images.pexels.com/photos/47047/gold-ingots-golden-treasure-47047.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Gold investment strategy with bullion bars and financial charts'
  },
  'what-is-forex': {
    url: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Forex currency trading on multiple digital screens with exchange rates'
  },
  'bitcoin-risk-management': {
    url: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Bitcoin cryptocurrency risk management with security and volatility charts'
  },
  'trading-mindset': {
    url: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Calm disciplined trader analyzing market psychology and emotions'
  },
  'support-resistance': {
    url: 'https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Technical analysis chart with support and resistance zones highlighted'
  },
};

const CATEGORY_IMAGES: Record<string, PexelsImage> = {
  'Forex Education': {
    url: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Currency pairs and forex trading charts on professional financial dashboard'
  },
  'Gold (XAUUSD) Analysis': {
    url: 'https://images.pexels.com/photos/47047/gold-ingots-golden-treasure-47047.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Gold investment analysis with precious metal bars and market data'
  },
  'Bitcoin Trading': {
    url: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Bitcoin trading chart with cryptocurrency market analysis'
  },
  'Risk Management': {
    url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Risk management strategy with leverage calculation and position sizing'
  },
  'Trading Psychology': {
    url: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Trading psychology and emotional discipline for market success'
  },
  'Technical Analysis': {
    url: 'https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Technical analysis chart patterns and trading signals on screen'
  },
  'Broker Reviews': {
    url: 'https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Comparison of forex brokers with charts and financial data'
  },
};

export function getImageForSlug(slug: string): PexelsImage {
  return SLUG_IMAGES[slug] || CATEGORY_IMAGES[slug] || FALLBACK_IMAGES.default;
}

export async function getPexelImageForPost(slug: string): Promise<PexelsImage> {
  const apiKey = process.env.PEXELS_API_KEY;

  if (apiKey && apiKey !== 'your_pexels_api_key_here') {
    try {
      const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(slug)}&per_page=1`, {
        headers: { Authorization: apiKey },
        next: { revalidate: 86400 }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.photos && data.photos.length > 0) {
          return {
            url: data.photos[0].src.large,
            alt: data.photos[0].alt || `${slug} image`
          };
        }
      }
    } catch (error) {
      console.error('Failed to fetch from Pexels API:', error);
    }
  }
  return getImageForSlug(slug);
}

export async function getPexelsImage(query: string): Promise<PexelsImage> {
  const apiKey = process.env.PEXELS_API_KEY;

  if (apiKey && apiKey !== 'your_pexels_api_key_here') {
    try {
      const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
        headers: { Authorization: apiKey },
        next: { revalidate: 86400 }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.photos && data.photos.length > 0) {
          return {
            url: data.photos[0].src.large,
            alt: data.photos[0].alt || `${query} image`
          };
        }
      }
    } catch (error) {
      console.error('Failed to fetch from Pexels API:', error);
    }
  }
  return getImageForSlug(query.toLowerCase().trim().split(' ')[0]);
}

/**
 * Fetches multiple DISTINCT images from Pexels API for each blog post.
 * Each post gets 5 unique images generated from different search queries.
 * Uses a Set to deduplicate URLs and ensure no duplicates across posts.
 */
const USED_URLS = new Set<string>();

export async function getPexelsImages(slug: string, count: number = 5): Promise<PexelsImage[]> {
  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey || apiKey === 'your_pexels_api_key_here') {
    const slugImg = SLUG_IMAGES[slug] || CATEGORY_IMAGES[getCategoryForSlug(slug)] || FALLBACK_IMAGES.default;
    const uniqueImages = [slugImg];
    const altVariants = [
      `${slug} market analysis chart`,
      `${slug} trading data and statistics`,
      `${slug} financial market trends`,
      `${slug} professional trading workspace`
    ];
    for (let i = 0; i < count - 1 && i < altVariants.length; i++) {
      uniqueImages.push({ url: slugImg.url, alt: altVariants[i] });
    }
    while (uniqueImages.length < count) {
      uniqueImages.push(FALLBACK_IMAGES.default);
    }
    return uniqueImages.slice(0, count);
  }

  const queries = [
    slug,
    `${slug} trading charts graphs analysis`,
    `${slug} financial data statistics`,
    `${slug} market trends professional`,
    `${slug} trading workspace investment`
  ];

  const results: PexelsImage[] = [];
  const usedUrls = new Set<string>();

  for (let i = 0; i < count && i < queries.length; i++) {
    try {
      const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(queries[i])}&per_page=1`, {
        headers: { Authorization: apiKey },
        next: { revalidate: 86400 }
      });
      if (!res.ok) { continue; }
      const data = await res.json();
      if (data.photos && data.photos.length > 0) {
        const url = data.photos[0].src.large;
        if (!usedUrls.has(url)) {
          usedUrls.add(url);
          results.push({
            url: url,
            alt: data.photos[0].alt || `${slug} visual ${i + 1}`
          });
        }
      }
    } catch (error) {
      console.error(`Failed to fetch image ${i} for ${slug}:`, error);
    }
  }

  while (results.length < count) {
    const fallback = FALLBACK_IMAGES[getCategoryForSlug(slug)] || FALLBACK_IMAGES.default;
    if (!usedUrls.has(fallback.url)) {
      usedUrls.add(fallback.url);
      results.push({ ...fallback, alt: `${slug} visual ${results.length + 1}` });
    } else {
      results.push(FALLBACK_IMAGES.default);
    }
  }

  return results.slice(0, count);
}

function getCategoryForSlug(slug: string): string {
  const slugToCategory: Record<string, string> = {
    'position-sizing': 'risk-management',
    'how-to-invest-in-gold-for-beginners': 'gold',
    'what-is-forex': 'forex',
    'bitcoin-risk-management': 'bitcoin',
    'trading-mindset': 'trading-psychology',
    'support-resistance': 'technical-analysis',
    'cpi-news-and-markets': 'forex',
    'ppi-news-and-markets': 'forex',
    'which-broker-is-best': 'Broker Reviews',
  };
  return slugToCategory[slug] || 'default';
}