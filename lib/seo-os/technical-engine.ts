/**
 * SEO-OS Technical Auditor Engine via Upstash Redis
 */

import { Redis } from '@upstash/redis';
import { getPerformanceReport } from './analytics-engine';

const redis = Redis.fromEnv();

export interface TechnicalIssue {
  id: string;
  type: 'indexing' | 'meta' | 'speed' | 'link';
  severity: 'high' | 'medium' | 'low';
  page: string;
  issue: string;
  fix: string;
  status: 'pending' | 'fixed';
  detectedAt: string;
}

const AUDIT_KEY = 'seo-os:technical-audit';

export async function getTechnicalAudit(): Promise<TechnicalIssue[]> {
  try {
    return (await redis.get<TechnicalIssue[]>(AUDIT_KEY)) || [];
  } catch (e) {
    return [];
  }
}

export async function saveTechnicalAudit(issues: TechnicalIssue[]) {
  try {
    await redis.set(AUDIT_KEY, issues);
  } catch (e) {
    console.error('Redis Technical Audit Error:', e);
  }
}

export async function performTechnicalAudit() {
  const issues: TechnicalIssue[] = await getTechnicalAudit();
  const gscData = await getPerformanceReport();
  
  // 1. Meta Issues
  const metaIssues = gscData.filter(r => r.impressions > 100 && r.clicks === 0);
  for (const item of metaIssues) {
    if (!issues.find(i => i.page === item.url && i.type === 'meta')) {
      issues.push({
        id: `meta-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        type: 'meta',
        severity: 'high',
        page: item.url,
        issue: 'Low Click-Through Rate (CTR) despite high impressions.',
        fix: 'Optimize Meta Title and Description to be more enticing.',
        status: 'pending',
        detectedAt: new Date().toISOString()
      });
    }
  }

  // 2. Ghost Pages
  const { BLOG_POSTS } = await import('@/lib/blogData');
  const validRoutes = new Set([
    ...BLOG_POSTS.map(p => `/blog/posts/${p.slug}`),
    '/', '/about', '/contact', '/blog', '/tools'
  ]);
  
  const ghostIssues = gscData.filter(r => !validRoutes.has(r.url) && !r.url.startsWith('/tools/'));
  for (const item of ghostIssues) {
    if (!issues.find(i => i.page === item.url && i.type === 'link')) {
      issues.push({
        id: `link-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        type: 'link',
        severity: 'medium',
        page: item.url,
        issue: 'Orphaned or Legacy URL detected in search results.',
        fix: 'Set up a 301 redirect to the most relevant current page.',
        status: 'pending',
        detectedAt: new Date().toISOString()
      });
    }
  }

  await saveTechnicalAudit(issues.slice(-50));
  return issues;
}

export async function resolveTechnicalIssue(id: string) {
  const issues = await getTechnicalAudit();
  const issue = issues.find(i => i.id === id);
  if (issue) {
    issue.status = 'fixed';
    await saveTechnicalAudit(issues);
    return true;
  }
  return false;
}
