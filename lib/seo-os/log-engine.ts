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
  
  fs.writeFileSync(LOG_PATH, JSON.stringify(updatedLogs, null, 2));
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
    if (lastLog) {
      if (lastLog.status === 'active') currentStatus = 'active';
      else if (lastLog.status === 'error') currentStatus = 'error';
    }

    return {
      name,
      currentStatus,
      lastRun: lastLog ? lastLog.timestamp : 'Never'
    };
  });
}
