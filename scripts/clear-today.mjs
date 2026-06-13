import { Redis } from '@upstash/redis';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually
let url = process.env.UPSTASH_REDIS_REST_URL;
let token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  try {
    const env = readFileSync(join(__dirname, '..', '.env.local'), 'utf-8');
    for (const line of env.split('\n')) {
      const trimmed = line.trim();
      if (trimmed.startsWith('UPSTASH_REDIS_REST_URL=')) url = trimmed.split('=').slice(1).join('=').replace(/^["']|["']$/g, '');
      if (trimmed.startsWith('UPSTASH_REDIS_REST_TOKEN=')) token = trimmed.split('=').slice(1).join('=').replace(/^["']|["']$/g, '');
    }
  } catch (e) {
    console.error('Failed to read .env.local');
  }
}

if (!url || !token) {
  console.error('ERROR: Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env.local');
  process.exit(1);
}

const redis = new Redis({ url, token });

try {
  // 1. Clear dynamic posts
  const dynResult = await redis.del('seo-os:dynamic-posts');
  console.log(`Cleared dynamic posts: ${dynResult}`);

  // 2. Find and clear content overrides
  const keys = await redis.keys('seo-os:content-override:*');
  if (keys.length > 0) {
    const delResult = await redis.del(...keys);
    console.log(`Cleared ${keys.length} content overrides: ${delResult}`);
  } else {
    console.log('No content overrides found.');
  }

  console.log('Done! All today\'s blogs removed from Redis.');
} catch (e) {
  console.error('Error:', e.message);
}

redis.disconnect?.();
