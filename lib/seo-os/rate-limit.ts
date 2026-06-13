/**
 * SEO-OS Rate Limiter
 * Uses Upstash Redis (already configured) to throttle API abuse.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { getRedis } from './redis';

const redis = getRedis();

/**
 * General dashboard API rate limiter — 30 requests per minute per IP.
 * Applied to logs, roadmap GET, performance-live endpoints.
 */
export const apiLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '1 m'),
  analytics: false,
  prefix: 'ratelimit:api',
});

/**
 * Medium operation limiter — 30 requests per hour per IP.
 * Applied to endpoints that trigger AI calls or write operations (/cron, /strategy, /reset-tasks).
 */
export const heavyLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '1 h'),
  analytics: false,
  prefix: 'ratelimit:heavy',
});

/**
 * Extract a usable identifier from a request for rate limiting.
 * Falls back to a generic key if IP can't be determined.
 */
export function getIdentifier(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfIp = request.headers.get('cf-connecting-ip');
  const ip = cfIp || realIp || (forwarded ? forwarded.split(',')[0].trim() : 'unknown');
  return ip;
}
