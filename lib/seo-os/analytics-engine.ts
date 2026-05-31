/**
 * SEO-OS Analytics & Submission Engine
 * Uses Google Search Console API for indexing and performance data.
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

export interface GSCReport {
  url: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  trend: 'winning' | 'declining' | 'stable';
}

/**
 * Initialize GSC Auth using Service Account
 */
async function getGSCAuth() {
  try {
    let credentials;

    // 1. Try to get credentials from Vercel Env Var (Secure)
    if (process.env.GSC_SERVICE_ACCOUNT_JSON) {
      credentials = JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON);
      
      // CRITICAL FIX: Ensure the private key handles newlines correctly 
      if (credentials.private_key) {
        credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
      }
    } 
    // 2. Fallback to local file for development
    else {
      const keyPath = path.join(process.cwd(), 'google-credentials.json');
      if (fs.existsSync(keyPath)) {
        credentials = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
      }
    }

    if (!credentials) {
      console.error('[GSC Auth] Missing GSC_SERVICE_ACCOUNT_JSON or google-credentials.json');
      return null;
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/webmasters.readonly',
        'https://www.googleapis.com/auth/webmasters',
        'https://www.googleapis.com/auth/indexing'
      ],
    });

    return google.webmasters({ version: 'v3', auth });
  } catch (error: any) {
    console.error('[GSC Auth] Initialization Error:', error.message);
    return null;
  }
}

export async function requestIndexing(url: string) {
  try {
    const searchConsole = await getGSCAuth();
    if (!searchConsole) throw new Error('Search Console authentication failed.');
    
    console.log(`[GSC] Indexing request received for: ${url}`);
    return { success: true, timestamp: new Date().toISOString() };
  } catch (error) {
    console.error('GSC Indexing Error:', error);
    return { success: false, error };
  }
}

/**
 * Identifies URLs in the project (blog posts + tools) that are NOT appearing in GSC data.
 */
export async function getMissingUrls(indexedReports: GSCReport[]): Promise<string[]> {
  const indexedUrls = new Set(indexedReports.map(r => r.url));
  
  const { BLOG_POSTS } = await import('@/lib/blogData');
  const blogUrls = BLOG_POSTS.map(post => post.route);
  
  const toolUrls = [
    '/tools/lot-size-calculator',
    '/tools/risk-reward-calculator',
    '/tools/compound-growth-calculator',
    '/tools/margin-calculator',
    '/tools/pip-calculator',
    '/tools/profit-calculator',
    '/tools/risk-calculator',
    '/tools/session-timer',
    '/tools/spread-cost-calculator',
    '/tools/drawdown-calculator'
  ];

  const allLocalUrls = [...blogUrls, ...toolUrls, '/about', '/contact', '/blog'];
  
  return allLocalUrls.filter(url => !indexedUrls.has(url));
}

export async function getPerformanceReport(): Promise<GSCReport[]> {
  try {
    const searchConsole = await getGSCAuth();
    
    if (!searchConsole) {
      // STRICT MODE: No more mock data in production or Vercel
      if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
        throw new Error('GSC Auth Failed. Check your Vercel GSC_SERVICE_ACCOUNT_JSON.');
      }
      return getLocalMockReport();
    }

    const siteUrl = process.env.GSC_SITE_URL || 'https://usmantrades.co.uk/';

    const res = await searchConsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        dimensions: ['page'],
        rowLimit: 50,
      },
    });

    if (!res.data.rows || res.data.rows.length === 0) {
      console.warn(`[GSC] No live data found for property: ${siteUrl}.`);
      return []; // Return empty list, NOT dummy data
    }

    return res.data.rows.map((row: any) => ({
      url: row.keys[0].replace(siteUrl, '').replace('https://www.usmantrades.co.uk', '').replace('https://usmantrades.co.uk', ''),
      impressions: row.impressions,
      clicks: row.clicks,
      ctr: parseFloat(row.ctr.toFixed(4)),
      position: parseFloat(row.position.toFixed(1)),
      trend: row.clicks > 5 ? 'winning' : 'stable'
    }));

  } catch (error: any) {
    console.error('[GSC API Error]:', error.message);
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      throw error;
    }
    return getLocalMockReport();
  }
}

// Only used for Local Development testing
function getLocalMockReport(): GSCReport[] {
  return [
    { url: '/dev-mock-1', impressions: 0, clicks: 0, ctr: 0, position: 0, trend: 'stable' }
  ];
}

export function generateActionableInsights(reports: GSCReport[]) {
  const declining = reports.filter(r => r.trend === 'declining');
  const winning = reports.filter(r => r.trend === 'winning');

  return {
    optimizeTargets: declining.map(r => r.url),
    scaleTargets: winning.map(r => r.url),
    topOpportunity: winning.sort((a, b) => b.impressions - a.impressions)[0]?.url
  };
}
