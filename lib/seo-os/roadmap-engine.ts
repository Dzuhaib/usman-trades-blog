/**
 * SEO-OS Roadmap Store
 * Handles persistence of the 30-day AI execution plan via Vercel KV.
 */

import { kv } from '@vercel/kv';

export interface RoadmapTask {
  day: number;
  keyword: string;
  type: 'article' | 'tool_improvement' | 'faq';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed' | 'failed';
  publishedUrl?: string;
  completedAt?: string;
  expert_note?: string;
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
    return await kv.get<RoadmapData>(ROADMAP_KEY);
  } catch (e) {
    console.error('KV Get Roadmap Error:', e);
    return null;
  }
}

export async function saveRoadmap(data: RoadmapData) {
  const completedCount = data.tasks.filter(t => t.status === 'completed').length;
  data.progress = data.tasks.length > 0 ? Math.round((completedCount / data.tasks.length) * 100) : 0;
  data.updatedAt = new Date().toISOString();
  
  try {
    await kv.set(ROADMAP_KEY, data);
  } catch (e) {
    console.error('KV Save Roadmap Error:', e);
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
