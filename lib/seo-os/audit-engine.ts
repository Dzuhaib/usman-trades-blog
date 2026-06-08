import 'dotenv/config';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: (process.env.UPSTASH_REDIS_REST_URL || '').replace(/^["']|["']$/g, ''),
  token: (process.env.UPSTASH_REDIS_REST_TOKEN || '').replace(/^["']|["']$/g, ''),
});

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
