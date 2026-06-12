/**
 * SEO-OS Technical Auditor Engine via Upstash Redis
 */

import { randomUUID } from 'crypto';
import { getPerformanceReport } from './analytics-engine';
import { getRedis } from './redis';

export interface TechnicalIssue {
  id: string;
  url: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
  status: 'pending' | 'fixed';
}

const AUDIT_KEY = 'seo-os:technical-audit';

export async function getTechnicalAudit(): Promise<TechnicalIssue[]> {
  const redis = getRedis();
  try {
    return (await redis.get<TechnicalIssue[]>(AUDIT_KEY)) || [];
  } catch (e) {
    console.error('Redis Fetch Error:', e);
    return [];
  }
}

export async function saveTechnicalAudit(issues: TechnicalIssue[]) {
  const redis = getRedis();
  await redis.set(AUDIT_KEY, issues);
}

export async function performTechnicalAudit() {
  const reports = await getPerformanceReport();
  const currentIssues = await getTechnicalAudit();

  const newIssues: TechnicalIssue[] = reports
    .filter(r => r.position > 20)
    .map(r => ({
      id: randomUUID(),
      url: r.url,
      issue: 'Low ranking / High bounce risk',
      severity: 'medium',
      status: 'pending'
    }));

  await saveTechnicalAudit([...currentIssues, ...newIssues]);
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
