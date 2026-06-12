import { getRedis } from './redis';

const redis = getRedis();

const AUDIT_KEY = 'seo-os:audit';

export interface Issue {
  type: 'technical' | 'seo' | 'geo' | 'aio';
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export interface PageAudit {
  url: string;
  issues: Issue[];
}

export interface AuditReport {
  timestamp: string;
  pages: PageAudit[];
}

export async function getAuditReport(): Promise<AuditReport | null> {
  return await redis.get<AuditReport>(AUDIT_KEY);
}

export async function saveAuditReport(report: AuditReport) {
  await redis.set(AUDIT_KEY, report);
}
