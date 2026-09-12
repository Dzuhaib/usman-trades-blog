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
    alt: 'Bitcoin cryptocurrency risk management with security and volatility charts'
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
    url: 'https://images.pexels.com/photos/14902702/pexels-photo-14902702.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Financial market trading news and economic data on screens'
  }
};

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
    url: 'https://images.pexels.com/photos/19867469/pexels-photo-19867469.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Consumer Price Index economic data on financial dashboard'
  },
  'ppi-news-and-markets': {
    url: 'https://images.pexels.com/photos/102152/pexels-photo-102152.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Producer Price Index wholesale data on trading screen'
  },
  'which-broker-is-best': {
    url: 'https://images.pexels.com/photos/7173046/pexels-photo-7173046.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Comparison of forex brokers with charts and financial data on screens'
  },
  'us-cpi-xau-usd-gold': {
    url: 'https://images.pexels.com/photos/28682356/pexels-photo-28682356.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Consumer Price Index data affecting gold and XAU/USD trading'
  },
};

const CATEGORY_IMAGES: Record<string, PexelsImage> = {
  'Forex Education': {
    url: 'https://images.pexels.com/photos/16902140/pexels-photo-16902140.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Forex trading news update on financial dashboard'
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
    url: 'https://images.pexels.com/photos/7173046/pexels-photo-7173046.jpeg?auto=compress&cs=tinysrgb&w=1200',
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

export async function getPexelsImage(query: string, usedUrls?: Set<string>): Promise<PexelsImage> {
  const apiKey = process.env.PEXELS_API_KEY;
  const sharedUsedUrls = usedUrls || new Set<string>();

  if (apiKey && apiKey !== 'your_pexels_api_key_here') {
    try {
      const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
        headers: { Authorization: apiKey },
        next: { revalidate: 86400 }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.photos && data.photos.length > 0) {
          const url = data.photos[0].src.large;
          if (!sharedUsedUrls.has(url)) {
            sharedUsedUrls.add(url);
            return { url, alt: data.photos[0].alt || `${query} image` };
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch from Pexels API:', error);
    }
  }

  const fallback = getImageForSlug(query.toLowerCase().trim().split(' ')[0]);
  if (!sharedUsedUrls.has(fallback.url)) {
    sharedUsedUrls.add(fallback.url);
    return fallback;
  }
  return FALLBACK_IMAGES.default;
}

export async function getPexelsImages(slug: string, count: number = 5, usedUrls?: Set<string>): Promise<PexelsImage[]> {
  const apiKey = process.env.PEXELS_API_KEY;
  const sharedUsedUrls = usedUrls || new Set<string>();

  const slugImage = SLUG_IMAGES[slug];
  const category = getCategoryForSlug(slug);

  if (!apiKey || apiKey === 'your_pexels_api_key_here') {
    const slugImg = slugImage || CATEGORY_IMAGES[category] || FALLBACK_IMAGES.default;
    const uniqueImages: PexelsImage[] = [];
    const altVariants = [
      `${slug} market analysis chart`,
      `${slug} trading data and statistics`,
      `${slug} financial market trends`,
      `${slug} professional trading workspace`
    ];
    uniqueImages.push({ ...slugImg, alt: altVariants[0] });
    for (let i = 1; i < count && i < altVariants.length; i++) {
      const fallback = FALLBACK_IMAGES[category] || FALLBACK_IMAGES.default;
      if (!sharedUsedUrls.has(fallback.url)) {
        sharedUsedUrls.add(fallback.url);
        uniqueImages.push({ url: fallback.url, alt: altVariants[i] });
      } else {
        uniqueImages.push(FALLBACK_IMAGES.default);
      }
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
        if (!sharedUsedUrls.has(url)) {
          sharedUsedUrls.add(url);
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
    const fallback = FALLBACK_IMAGES[category] || FALLBACK_IMAGES.default;
    if (!sharedUsedUrls.has(fallback.url)) {
      sharedUsedUrls.add(fallback.url);
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
    'us-cpi-xau-usd-gold': 'Forex Education',
  };
  return slugToCategory[slug] || 'default';
}