/**
 * SEO-OS Roadmap Store
 * Handles persistence of the 30-day AI execution plan.
 */

import fs from 'fs';
import path from 'path';

export interface RoadmapTask {
  day: number;
  keyword: string;
  type: 'article' | 'tool_improvement' | 'faq';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed' | 'failed';
  publishedUrl?: string;
  completedAt?: string;
}

export interface RoadmapData {
  createdAt: string;
  updatedAt: string;
  progress: number; // 0-100
  tasks: RoadmapTask[];
}

const ROADMAP_PATH = path.join(process.cwd(), 'lib/seo-os/roadmap.json');

export function getRoadmap(): RoadmapData | null {
  if (!fs.existsSync(ROADMAP_PATH)) return null;
  try {
    const data = fs.readFileSync(ROADMAP_PATH, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

export function saveRoadmap(data: RoadmapData) {
  const completedCount = data.tasks.filter(t => t.status === 'completed').length;
  data.progress = Math.round((completedCount / data.tasks.length) * 100);
  data.updatedAt = new Date().toISOString();
  
  fs.writeFileSync(ROADMAP_PATH, JSON.stringify(data, null, 2));
}

export function initializeRoadmap(tasks: RoadmapTask[]) {
  const data: RoadmapData = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    progress: 0,
    tasks: tasks.map(t => ({ ...t, status: 'pending' }))
  };
  saveRoadmap(data);
}
