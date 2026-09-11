export interface PexelsImage {
  url: string;
  alt: string;
}

// Fallback images to ensure the site looks gorgeous even if the user has not entered their API key yet.
const FALLBACK_IMAGES: Record<string, PexelsImage> = {
  'forex': {
    url: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Foreign Exchange market currency charts and trading terminals displaying candlestick patterns'
  },
  'gold': {
    url: 'https://images.pexels.com/photos/47047/gold-ingots-golden-treasure-47047.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Physical gold bullion bars stacked neatly as macroeconomic safe-haven stores of value'
  },
  'bitcoin': {
    url: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Physical gold-plated Bitcoin coins representing digital assets and cryptocurrency volatility parameters'
  },
  'risk-management': {
    url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Financial analyst mapping risk parameters, leverage calculations, and position boundaries on paperwork'
  },
  'trading-psychology': {
    url: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Disciplined institutional trader mapping rules-based execution plans to conquer cognitive bias'
  },
  'technical-analysis': {
    url: 'https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Close up of high-resolution monitor displaying multi-timeframe horizontal support and resistance channels'
  },
  'what-is-forex': {
    url: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Currency exchange rates on digital screens in a modern trading office'
  },
  'how-to-invest-in-gold-for-beginners': {
    url: 'https://images.pexels.com/photos/47047/gold-ingots-golden-treasure-47047.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Shining gold bars on a dark surface representing wealth and investment'
  },
  'position-sizing': {
    url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Trader calculating risk on a spreadsheet with risk management tools'
  },
  'support-resistance': {
    url: 'https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Price chart with horizontal support and resistance lines drawn on screen'
  },
  'trading-mindset': {
    url: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Focused trader sitting calmly at desk with multiple monitors'
  },
  'bitcoin-risk-management': {
    url: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Bitcoin and cryptocurrency coins with security lock symbol'
  },
  'cpi-news-and-markets': {
    url: 'https://images.pexels.com/photos/56935/cpi-data-on-screen.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Consumer Price Index data displayed on financial terminal screen'
  },
  'ppi-news-and-markets': {
    url: 'https://images.pexels.com/photos/589540/pexels-photo-589540.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Producer Price Index charts and economic data on trading screen'
  },
  'default': {
    url: 'https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Clean financial editorial office setup with Bloomberg-style price charts and calculated data tools'
  }
};

// Unique fallback images per slug for guaranteed uniqueness across all blog posts
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
  'cpi-news-and-markets': {
    url: 'https://images.pexels.com/photos/56935/cpi-data-on-screen.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Consumer Price Index economic data affecting currency markets'
  },
  'ppi-news-and-markets': {
    url: 'https://images.pexels.com/photos/589540/pexels-photo-589540.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Producer Price Index inflation data on financial trading screen'
  },
};

// Category-based fallback images for list views
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
};

export function getImageForSlug(slug: string): PexelsImage {
  return SLUG_IMAGES[slug] || CATEGORY_IMAGES[slug] || FALLBACK_IMAGES.default;
}

export async function getPexelImageForPost(slug: string): Promise<PexelsImage> {
  const slugImage = SLUG_IMAGES[slug];
  if (slugImage) return slugImage;

  const apiKey = process.env.PEXELS_API_KEY;
  const cleanQuery = slug.toLowerCase().trim();

  if (!apiKey || apiKey === 'your_pexels_api_key_here') {
    return getImageForSlug(slug);
  }

  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(cleanQuery)}&per_page=1`, {
      headers: { Authorization: apiKey },
      next: { revalidate: 86400 }
    });
    if (!res.ok) return getImageForSlug(slug);
    const data = await res.json();
    if (data.photos && data.photos.length > 0) {
      return {
        url: data.photos[0].src.large,
        alt: data.photos[0].alt || `${slug} image`
      };
    }
  } catch (error) {
    console.error('Failed to fetch from Pexels API:', error);
  }
  return getImageForSlug(slug);
}

export async function getPexelsImage(query: string): Promise<PexelsImage> {
  const slugMatch = query.toLowerCase().trim().split(' ')[0];
  const slugImage = SLUG_IMAGES[slugMatch];
  if (slugImage) return slugImage;
  return getImageForSlug(query.toLowerCase().trim().split(' ')[0]);
}

/**
 * Fetches multiple distinct images dynamically from Pexels API for blog posts.
 * Each image uses a unique query based on post title, category, and index.
 */
export async function getPexelsImages(slug: string, count: number = 5): Promise<PexelsImage[]> {
  const apiKey = process.env.PEXELS_API_KEY;

  // If we have a dedicated slug image, use it as the primary and generate variations
  const slugImage = SLUG_IMAGES[slug];
  const category = getCategoryForSlug(slug);

  if (!apiKey || apiKey === 'your_pexels_api_key_here') {
    // Return unique fallback images based on slug and index
    const slugImg = slugImage || FALLBACK_IMAGES[category] || FALLBACK_IMAGES.default;
    const uniqueImages = [slugImg];
    const altVariants = [
      `${slug} market analysis chart`,
      `${slug} trading data and statistics`,
      `${slug} financial market trends`,
      `${slug} professional trading workspace`
    ];
    for (let i = 0; i < count - 1 && i < altVariants.length; i++) {
      uniqueImages.push({
        url: slugImg.url,
        alt: altVariants[i]
      });
    }
    while (uniqueImages.length < count) {
      uniqueImages.push(FALLBACK_IMAGES.default);
    }
    return uniqueImages.slice(0, count);
  }

  const queries = [
    slug,
    `${slug} charts graphs market data`,
    `${slug} financial statistics analysis`,
    `${slug} market trends trading`,
    `${slug} professional trading workspace`
  ];

  const results: PexelsImage[] = [];
  for (let i = 0; i < count && i < queries.length; i++) {
    try {
      const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(queries[i])}&per_page=1`, {
        headers: { Authorization: apiKey },
        next: { revalidate: 86400 }
      });
      if (!res.ok) { results.push(getImageForSlug(slug)); continue; }
      const data = await res.json();
      if (data.photos && data.photos.length > 0) {
        results.push({
          url: data.photos[0].src.large,
          alt: data.photos[0].alt || `${slug} visual ${i + 1}`
        });
      } else {
        results.push(getImageForSlug(slug));
      }
    } catch (error) {
      console.error(`Failed to fetch image ${i}:`, error);
      results.push(getImageForSlug(slug));
    }
  }

  while (results.length < count) {
    results.push(FALLBACK_IMAGES.default);
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
  };
  return slugToCategory[slug] || 'default';
}
