/**
 * SEO-OS Technical Auditor Engine
 * Scans for site errors, indexing issues, and SEO mistakes.
 */

import fs from 'fs';
import path from 'path';
import { getPerformanceReport } from './analytics-engine';

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

const AUDIT_PATH = path.join(process.cwd(), 'lib/seo-os/technical-audit.json');

export function getTechnicalAudit(): TechnicalIssue[] {
  if (!fs.existsSync(AUDIT_PATH)) return [];
  try {
    const data = fs.readFileSync(AUDIT_PATH, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export function saveTechnicalAudit(issues: TechnicalIssue[]) {
  fs.writeFileSync(AUDIT_PATH, JSON.stringify(issues, null, 2));
}

/**
 * Technical Auditor Agent Logic
 */
export async function performTechnicalAudit() {
  const issues: TechnicalIssue[] = getTechnicalAudit();
  
  // 1. Check GSC data for underperforming pages (possible indexing/quality issues)
  const gscData = await getPerformanceReport();
  
  // Example: Find pages with high impressions but zero clicks (Meta/Snippet issues)
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

  // 2. Check for "ghost" pages (not in our local blog data but ranking - possibly old/deleted)
  const { BLOG_POSTS } = await import('@/lib/blogData');
  const validRoutes = new Set([
    ...BLOG_POSTS.map(p => p.route),
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

  // Keep only the most recent 50 issues
  saveTechnicalAudit(issues.slice(-50));
  return issues;
}
