import fs from 'fs';
import path from 'path';

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

const LOG_PATH = path.join(process.cwd(), 'lib/seo-os/logs.json');

export function logAgentAction(agent: string, status: 'active' | 'idle' | 'success' | 'error', message: string) {
  // Only write logs if not in build environment or if file exists
  if (process.env.NEXT_PHASE === 'phase-production-build') return;

  const logs = getLogs();
  const newLog: AgentLog = {
    timestamp: new Date().toISOString(),
    agent,
    status,
    message
  };
  
  logs.unshift(newLog);
  // Keep only last 50 logs
  const updatedLogs = logs.slice(0, 50);
  
  try {
    // Ensure directory exists
    const dir = path.dirname(LOG_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOG_PATH, JSON.stringify(updatedLogs, null, 2));
  } catch (e) {
    console.error('Failed to write agent logs:', e);
  }
}

export function getLogs(): AgentLog[] {
  if (!fs.existsSync(LOG_PATH)) return [];
  try {
    const data = fs.readFileSync(LOG_PATH, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export function getAgentsStatus(): AgentStatus[] {
  const roadmap = (global as any).cachedRoadmap || { systemStatus: 'active' }; // Fallback for status check
  const logs = getLogs();
  const agents = [
    'Monitor Agent', 
    'Research Agent', 
    'Strategist Agent', 
    'Writer Agent', 
    'Review Agent', 
    'Linking Agent', 
    'Publish Agent', 
    'Submission Agent'
  ];

  return agents.map(name => {
    const agentLogs = logs.filter(l => l.agent === name);
    const lastLog = agentLogs[0];
    
    let currentStatus: 'active' | 'idle' | 'error' = 'idle';
    
    // If the system is active, we want the agents to show as "active" (watching/waiting) 
    // rather than "idle" to reflect that the OS is running.
    if (lastLog) {
      if (lastLog.status === 'error') currentStatus = 'error';
      else if (lastLog.status === 'active') currentStatus = 'active';
      else currentStatus = 'active'; // Default to active if system is on
    } else {
      currentStatus = 'active';
    }

    return {
      name,
      currentStatus,
      lastRun: lastLog ? lastLog.timestamp : 'System Boot'
    };
  });
}
