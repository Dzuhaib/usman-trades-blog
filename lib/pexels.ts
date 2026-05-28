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
  'default': {
    url: 'https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Clean financial editorial office setup with Bloomberg-style price charts and calculated data tools'
  }
};

/**
 * Fetches an image dynamically from Pexels API.
 * If the API key is missing, invalid, or the request fails, it instantly falls back to a curated high-quality image.
 */
export async function getPexelsImage(query: string): Promise<PexelsImage> {
  const apiKey = process.env.PEXELS_API_KEY;
  
  // Clean query for key lookup
  const cleanQuery = query.toLowerCase().trim();
  let fallbackKey = 'default';
  
  if (cleanQuery.includes('forex')) fallbackKey = 'forex';
  else if (cleanQuery.includes('gold') || cleanQuery.includes('xauusd')) fallbackKey = 'gold';
  else if (cleanQuery.includes('bitcoin') || cleanQuery.includes('btc') || cleanQuery.includes('crypto')) fallbackKey = 'bitcoin';
  else if (cleanQuery.includes('risk') || cleanQuery.includes('size')) fallbackKey = 'risk-management';
  else if (cleanQuery.includes('psychology') || cleanQuery.includes('mindset') || cleanQuery.includes('bias')) fallbackKey = 'trading-psychology';
  else if (cleanQuery.includes('technical') || cleanQuery.includes('support') || cleanQuery.includes('resistance')) fallbackKey = 'technical-analysis';
  
  const fallback = FALLBACK_IMAGES[fallbackKey] || FALLBACK_IMAGES.default;

  // If no API key configured or placeholder, immediately return fallback
  if (!apiKey || apiKey === 'your_pexels_api_key_here') {
    return fallback;
  }

  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
      headers: {
        Authorization: apiKey
      },
      next: { revalidate: 86400 } // Cache results for 24 hours
    });

    if (!res.ok) {
      return fallback;
    }

    const data = await res.json();
    if (data.photos && data.photos.length > 0) {
      return {
        url: data.photos[0].src.large,
        alt: data.photos[0].alt || `${query} image representing trading education concepts`
      };
    }
  } catch (error) {
    console.error('Failed to fetch from Pexels API, returning fallback:', error);
  }

  return fallback;
}

/**
 * Fetches multiple distinct images dynamically from Pexels API for blog posts.
 * If the API key is missing or invalid, it returns the fallback image repeated or varied if possible.
 */
export async function getPexelsImages(query: string, count: number = 4): Promise<PexelsImage[]> {
  const apiKey = process.env.PEXELS_API_KEY;
  
  const cleanQuery = query.toLowerCase().trim();
  let fallbackKey = 'default';
  
  if (cleanQuery.includes('forex')) fallbackKey = 'forex';
  else if (cleanQuery.includes('gold') || cleanQuery.includes('xauusd')) fallbackKey = 'gold';
  else if (cleanQuery.includes('bitcoin') || cleanQuery.includes('btc') || cleanQuery.includes('crypto')) fallbackKey = 'bitcoin';
  else if (cleanQuery.includes('risk') || cleanQuery.includes('size')) fallbackKey = 'risk-management';
  else if (cleanQuery.includes('psychology') || cleanQuery.includes('mindset') || cleanQuery.includes('bias')) fallbackKey = 'trading-psychology';
  else if (cleanQuery.includes('technical') || cleanQuery.includes('support') || cleanQuery.includes('resistance')) fallbackKey = 'technical-analysis';
  
  const fallback = FALLBACK_IMAGES[fallbackKey] || FALLBACK_IMAGES.default;

  if (!apiKey) {
    // Return the single fallback image duplicated to meet the count requirement
    return Array(count).fill(fallback);
  }

  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}`, {
      headers: {
        Authorization: apiKey
      },
      next: { revalidate: 86400 }
    });

    if (!res.ok) {
      return Array(count).fill(fallback);
    }

    const data = await res.json();
    if (data.photos && data.photos.length > 0) {
      const results: PexelsImage[] = data.photos.map((photo: any) => ({
        url: photo.src.large,
        alt: photo.alt || `${query} visual representation`
      }));
      
      // If Pexels returned fewer images than requested, pad with the fallback
      while (results.length < count) {
        results.push(fallback);
      }
      return results.slice(0, count);
    }
  } catch (error) {
    console.error('Failed to fetch from Pexels API, returning fallbacks:', error);
  }

  return Array(count).fill(fallback);
}
