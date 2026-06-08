/**
 * SEO-OS Roadmap Store
 * Handles persistence of the 30-day AI execution plan via Upstash Redis.
 */

import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export interface PipelineStep {
  agent: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  message: string;
  completedAt?: string;
}

export interface RoadmapTask {
  day: number;
  keyword: string;
  type: 'article' | 'tool_improvement' | 'faq' | 'glossary';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed' | 'failed';
  publishedUrl?: string;
  completedAt?: string;
  expert_note?: string;
  pipeline?: PipelineStep[];
  // Dynamic fields for agent state
  rawContent?: string | null;
  reviewedContent?: string | null;
  finalContent?: string | null;
  reviewFeedback?: string | null;
  retryCount?: number;
  optimizationPlan?: string | null;
}

export interface RoadmapData {
  createdAt: string;
  updatedAt: string;
  progress: number;
  tasks: RoadmapTask[];
  systemStatus?: 'active' | 'paused';
}

const ROADMAP_KEY = 'seo-os:roadmap';

export async function getRoadmap(): Promise<RoadmapData | null> {
  try {
    return await redis.get<RoadmapData>(ROADMAP_KEY);
  } catch (e) {
    console.error('Redis Get Roadmap Error:', e);
    return null;
  }
}

export async function saveRoadmap(data: RoadmapData) {
  const completedCount = data.tasks.filter(t => t.status === 'completed').length;
  data.progress = data.tasks.length > 0 ? Math.round((completedCount / data.tasks.length) * 100) : 0;
  data.updatedAt = new Date().toISOString();
  
  try {
    await redis.set(ROADMAP_KEY, data);
  } catch (e) {
    console.error('Redis Save Roadmap Error:', e);
  }
}

export async function initializeRoadmap(tasks: RoadmapTask[]) {
  const data: RoadmapData = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    progress: 0,
    tasks: tasks.map(t => ({ ...t, status: 'pending' })),
    systemStatus: 'active'
  };
  await saveRoadmap(data);
}
