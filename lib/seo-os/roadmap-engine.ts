/**
 * SEO-OS Roadmap Store
 * Handles persistence of the 30-day AI execution plan via Upstash Redis.
 */

import 'dotenv/config';
import { Redis } from '@upstash/redis';

function getRedis() {
  return new Redis({
    url: (process.env.UPSTASH_REDIS_REST_URL || '').replace(/^["']|["']$/g, ''),
    token: (process.env.UPSTASH_REDIS_REST_TOKEN || '').replace(/^["']|["']$/g, ''),
  });
}

export interface PipelineStep {
  agent: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  message: string;
  completedAt?: string;
}

export type TaskType = 
  | 'CREATE_CONTENT'
  | 'FIX_AEO'
  | 'FIX_GEO'
  | 'FIX_MEDIA'
  | 'FIX_KEYWORDS'
  | 'FIX_TECHNICAL'
  | 'GLOSSARY_ENTRY'
  | 'TOOL_IMPROVEMENT';

export interface RoadmapTask {
  day: number;
  keyword: string;
  target?: string | null;
  task_type: TaskType;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed' | 'failed';
  publishedUrl?: string;
  completedAt?: string;
  expert_note?: string;
  pipeline?: PipelineStep[];
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
  const redis = getRedis();
  try {
    return await redis.get<RoadmapData>(ROADMAP_KEY);
  } catch (e) {
    console.error('Redis Get Roadmap Error:', e);
    return null;
  }
}

export async function saveRoadmap(data: RoadmapData) {
  const redis = getRedis();
  const completedCount = data.tasks.filter(t => t.status === 'completed').length;
  data.progress = data.tasks.length > 0 ? Math.round((completedCount / data.tasks.length) * 100) : 0;
  data.updatedAt = new Date().toISOString();
  
  try {
    await redis.set(ROADMAP_KEY, data);
  } catch (e) {
    console.error('Redis Save Roadmap Error:', e);
  }
}

export async function updateRoadmapWithNewTasks(newTasks: any[]) {
  const roadmap = await getRoadmap();
  if (!roadmap) return;

  const tasksToAppend = newTasks.map((t: any, index: number) => {
    let pipeline: PipelineStep[] = [];
    switch (t.task_type) {
        case 'FIX_AEO':
        case 'FIX_GEO':
        case 'FIX_KEYWORDS':
            pipeline = [
                { agent: 'ArticleWriter', status: 'pending', message: 'Rewriting content for optimization.' },
                { agent: 'Review Agent', status: 'pending', message: 'Editorial QA.' },
                { agent: 'Publish Agent', status: 'pending', message: 'Deployment.' }
            ];
            break;
        case 'FIX_MEDIA':
            pipeline = [
                { agent: 'ImageAgent', status: 'pending', message: 'Generating/Optimizing media.' },
                { agent: 'Publish Agent', status: 'pending', message: 'Deployment.' }
            ];
            break;
        case 'FIX_TECHNICAL':
            pipeline = [
                { agent: 'TechnicalAgent', status: 'pending', message: 'Fixing technical issues.' },
                { agent: 'Submission Agent', status: 'pending', message: 'Requesting indexing.' }
            ];
            break;
        case 'CREATE_CONTENT':
        default:
            pipeline = [
                { agent: 'ArticleWriter', status: 'pending', message: 'Writing.' },
                { agent: 'Review Agent', status: 'pending', message: 'Editorial QA.' },
                { agent: 'LinkingAgent', status: 'pending', message: 'Linking.' },
                { agent: 'Publish Agent', status: 'pending', message: 'Deployment.' }
            ];
    }

    return {
      day: roadmap.tasks.length + index + 1,
      keyword: t.keyword,
      task_type: t.task_type,
      priority: t.priority,
      status: 'pending' as const,
      expert_note: t.expert_note,
      pipeline
    };
  });

  roadmap.tasks = [
    ...roadmap.tasks.filter(t => t.status === 'completed'),
    ...tasksToAppend
  ];
  
  await saveRoadmap(roadmap);
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
