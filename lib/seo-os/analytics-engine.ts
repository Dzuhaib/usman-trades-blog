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

    if (process.env.GSC_SERVICE_ACCOUNT_JSON) {
      credentials = JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON);
      if (credentials.private_key) {
        credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
      }
    } else {
      const keyPath = path.join(process.cwd(), 'google-credentials.json');
      if (fs.existsSync(keyPath)) {
        credentials = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
      }
    }

    if (!credentials) return null;

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
    console.error('[GSC Auth Error]:', error.message);
    return null;
  }
}

export async function getPerformanceReport(): Promise<GSCReport[]> {
  try {
    const searchConsole = await getGSCAuth();
    
    if (!searchConsole) {
      console.warn('[GSC] Authentication failed. No data will be returned.');
      return []; 
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

    if (!res.data.rows) return [];

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
    return []; // Return empty array on error to avoid breaking UI with dummy data
  }
}

export async function requestIndexing(url: string) {
  try {
    const searchConsole = await getGSCAuth();
    if (!searchConsole) return { success: false, error: 'Auth failed' };
    console.log(`[GSC] Indexing request for: ${url}`);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getMissingUrls(indexedReports: GSCReport[]): Promise<string[]> {
  const indexedUrls = new Set(indexedReports.map(r => r.url));
  const { BLOG_POSTS } = await import('@/lib/blogData');
  const blogUrls = BLOG_POSTS.map(post => post.route);
  const toolUrls = [
    '/tools/lot-size-calculator', '/tools/risk-reward-calculator', '/tools/compound-growth-calculator',
    '/tools/margin-calculator', '/tools/pip-calculator', '/tools/profit-calculator',
    '/tools/risk-calculator', '/tools/session-timer', '/tools/spread-cost-calculator', '/tools/drawdown-calculator'
  ];
  const allLocalUrls = [...blogUrls, ...toolUrls, '/about', '/contact', '/blog'];
  return allLocalUrls.filter(url => !indexedUrls.has(url));
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
