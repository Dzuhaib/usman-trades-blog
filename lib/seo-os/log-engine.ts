/**
 * SEO-OS Agent Log Engine via Upstash Redis
 */

import { getRedis } from './redis';

export interface AgentLog {
  timestamp: string;
  agent: string;
  status: 'active' | 'idle' | 'success' | 'error';
  message: string;
}

export interface AgentStatus {
  name: string;
  currentStatus: 'active' | 'idle' | 'error';
  lastRun: string;
}

const LOGS_KEY = 'seo-os:logs';

export async function logAgentAction(agent: string, status: 'active' | 'idle' | 'success' | 'error', message: string) {
  const redis = getRedis();
  try {
    const logs = await getLogs();
    const newLog: AgentLog = {
      timestamp: new Date().toISOString(),
      agent,
      status,
      message
    };
    
    logs.unshift(newLog);
    const updatedLogs = logs.slice(0, 50);
    await redis.set(LOGS_KEY, updatedLogs);
  } catch (e) {
    console.error('Redis Log Error:', e);
  }
}

export async function getLogs(): Promise<AgentLog[]> {
  const redis = getRedis();
  try {
    return (await redis.get<AgentLog[]>(LOGS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

export async function getAgentsStatus(): Promise<AgentStatus[]> {
  const logs = await getLogs();
  const agents = [
    'Monitor Agent', 
    'Research Agent', 
    'Strategist Agent', 
    'Writer Agent', 
    'Review Agent', 
    'Linking Agent', 
    'Publish Agent', 
    'Submission Agent',
    'Technical Auditor'
  ];

  return agents.map(name => {
    const agentLogs = logs.filter(l => l.agent === name);
    const lastLog = agentLogs[0];
    
    let currentStatus: 'active' | 'idle' | 'error' = 'active'; 
    
    if (lastLog) {
      if (lastLog.status === 'error') currentStatus = 'error';
      else if (lastLog.status === 'active') currentStatus = 'active';
    }

    return {
      name,
      currentStatus,
      lastRun: lastLog ? lastLog.timestamp : 'System Boot'
    };
  });
}
