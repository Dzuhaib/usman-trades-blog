'use client';

import { 
  Zap, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  RefreshCw,
  Search,
  Bot,
  Activity
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { AgentLog, AgentStatus } from '@/lib/seo-os/log-engine';

export default function AgentsPage() {
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [agentStatuses, setAgentStatuses] = useState<AgentStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const loadData = async () => {
    try {
      const res = await fetch('/api/seo-os/logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs);
        setAgentStatuses(data.status);
      }
    } catch (e) {
      console.error('Failed to load agent data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => 
    log.agent.toLowerCase().includes(filter.toLowerCase()) || 
    log.message.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20 font-sans">
      {/* Page Header */}
      <section className="bg-slate-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="relative z-10 space-y-4">
           <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <Bot className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Growth Engine workforce</span>
           </div>
           <h2 className="text-5xl font-bold font-serif leading-tight text-white">AI Agent Workforce</h2>
           <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Monitor the live heartbeat of the autonomous agents driving your SEO growth from 1 AM to 9 AM daily.
           </p>
        </div>
      </section>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agentStatuses.map((agent) => (
          <div key={agent.name} className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-6 hover:shadow-md transition-all group relative overflow-hidden">
            {agent.currentStatus === 'active' && (
              <div className="absolute top-0 left-0 w-full h-1 bg-accent animate-pulse"></div>
            )}
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-2xl ${
                agent.currentStatus === 'active' ? 'bg-accent/10 text-accent' : 
                agent.currentStatus === 'error' ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-400'
              }`}>
                <Activity className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg ${
                agent.currentStatus === 'active' ? 'bg-accent/10 text-accent' : 
                agent.currentStatus === 'error' ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-400'
              }`}>
                {agent.currentStatus}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-serif">{agent.name}</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                Last Activity: {agent.lastRun === 'Never' ? 'Never' : new Date(agent.lastRun).toLocaleTimeString()}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Status: {agent.currentStatus === 'idle' ? 'Awaiting Schedule' : 'Operational'}</span>
               {agent.currentStatus === 'active' && <Loader2 className="w-3 h-3 text-accent animate-spin" />}
            </div>
          </div>
        ))}
      </div>

      {/* Live Logs Section */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
        <header className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-900 rounded-lg">
                 <Clock className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold font-serif">Live Execution Logs</h3>
           </div>
           
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Filter logs by agent or message..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
              />
           </div>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Agent</th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Activity Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-slate-400 italic">No activity logs found matching your filter.</td>
                </tr>
              ) : (
                filteredLogs.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{log.agent}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${
                        log.status === 'success' ? 'bg-emerald-50 text-emerald-600' : 
                        log.status === 'error' ? 'bg-rose-50 text-rose-500' : 
                        log.status === 'active' ? 'bg-accent/10 text-accent' : 'bg-slate-100 text-slate-400'
                      }`}>
                        <div className={`w-1 h-1 rounded-full ${
                          log.status === 'success' ? 'bg-emerald-500' : 
                          log.status === 'error' ? 'bg-rose-500' : 
                          log.status === 'active' ? 'bg-accent' : 'bg-slate-400'
                        }`}></div>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{log.message}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
