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
  error?: string;
}

/**
 * Initialize GSC Auth
 */
async function getGSCAuth() {
  try {
    // 1. Try OAuth2 (Personal/Local)
    if (process.env.GSC_CLIENT_ID && process.env.GSC_CLIENT_SECRET && process.env.GSC_REFRESH_TOKEN) {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GSC_CLIENT_ID,
        process.env.GSC_CLIENT_SECRET
      );
      oauth2Client.setCredentials({
        refresh_token: process.env.GSC_REFRESH_TOKEN
      });
      return oauth2Client;
    }

    let credentials;
    if (process.env.GSC_CLIENT_EMAIL && process.env.GSC_PRIVATE_KEY) {
      let privateKey = process.env.GSC_PRIVATE_KEY.replace(/^["']|["']$/g, '');
      if (privateKey.includes('\\n')) privateKey = privateKey.replace(/\\n/g, '\n');
      
      credentials = {
        client_email: process.env.GSC_CLIENT_EMAIL,
        private_key: privateKey,
        project_id: process.env.GSC_PROJECT_ID,
      };
    } else if (process.env.GSC_SERVICE_ACCOUNT_JSON) {
      let jsonStr = process.env.GSC_SERVICE_ACCOUNT_JSON.trim().replace(/^["']|["']$/g, '');
      credentials = JSON.parse(jsonStr);
      if (credentials.private_key && credentials.private_key.includes('\\n')) {
        credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
      }
    } else {
      const keyPath = path.join(process.cwd(), 'google-credentials.json');
      if (fs.existsSync(keyPath)) {
        credentials = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
      }
    }

    if (!credentials) throw new Error('Missing GSC credentials.');

    return new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/webmasters.readonly',
        'https://www.googleapis.com/auth/webmasters',
        'https://www.googleapis.com/auth/indexing'
      ],
    });
  } catch (error: any) {
    throw new Error(`[GSC Auth Error]: ${error.message}`);
  }
}

export async function getPerformanceReport(): Promise<GSCReport[]> {
  try {
    const auth = await getGSCAuth();
    const searchConsole = google.webmasters({ version: 'v3', auth: auth as any });
    const siteUrl = process.env.GSC_SITE_URL || 'https://usmantrades.co.uk/';

    const res = await searchConsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        dimensions: ['page'],
        rowLimit: 1000,
      },
    });

    if (!res.data.rows) return [];

    return res.data.rows.map((row: any) => {
      const rawUrl = row.keys[0];
      let cleanUrl = rawUrl;
      
      const prefixes = [
        siteUrl,
        siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl + '/',
        'https://usmantrades.co.uk/',
        'https://usmantrades.co.uk',
        'https://www.usmantrades.co.uk/',
        'https://www.usmantrades.co.uk'
      ];

      for (const prefix of prefixes) {
        if (cleanUrl.startsWith(prefix)) {
          cleanUrl = cleanUrl.slice(prefix.length);
          break;
        }
      }

      if (!cleanUrl.startsWith('/')) cleanUrl = '/' + cleanUrl;
      cleanUrl = cleanUrl.replace(/\/+/g, '/');

      return {
        url: cleanUrl,
        impressions: row.impressions,
        clicks: row.clicks,
        ctr: parseFloat(row.ctr.toFixed(4)),
        position: parseFloat(row.position.toFixed(1)),
        trend: row.clicks > 5 ? 'winning' : 'stable'
      };
    });

  } catch (error: any) {
    console.error('[GSC API Error]:', error.message);
    throw error;
  }
}

export async function requestIndexing(url: string) {
  try {
    const siteUrl = process.env.GSC_SITE_URL || 'https://usmantrades.co.uk/';
    const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url.startsWith('/') ? url.slice(1) : url}`;

    const auth = await getGSCAuth();
    const indexing = google.indexing({ version: 'v3', auth: auth as any });

    console.log(`[GSC] Indexing request for: ${fullUrl}`);
    
    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: fullUrl,
        type: 'URL_UPDATED',
      },
    });

    return { success: true, data: res.data };
  } catch (error: any) {
    console.error('[GSC Indexing Error]:', error.message);
    return { success: false, error: error.message };
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
