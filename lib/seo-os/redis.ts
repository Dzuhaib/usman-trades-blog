import { Redis } from '@upstash/redis';

let client: Redis | null = null;

export function getRedis(): Redis {
  if (!client) {
    client = new Redis({
      url: (process.env.UPSTASH_REDIS_REST_URL || '').replace(/^["']|["']$/g, ''),
      token: (process.env.UPSTASH_REDIS_REST_TOKEN || '').replace(/^["']|["']$/g, ''),
    });
  }
  return client;
}
