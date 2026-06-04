'use client';

import { 
  Trophy, 
  Sparkles, 
  Zap, 
  Target, 
  TrendingUp, 
  ArrowRight,
  Clock,
  CheckCircle2,
  Calendar,
  Loader2,
  AlertCircle,
  Activity,
  ArrowUpRight,
  LayoutDashboard
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { RoadmapData } from '@/lib/seo-os/roadmap-engine';
import { GSCReport } from '@/lib/seo-os/analytics-engine';
import { AgentLog, AgentStatus } from '@/lib/seo-os/log-engine';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blogData';

export default function DashboardPage() {
  const [reports, setReports] = useState<GSCReport[]>([]);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [agentStatuses, setAgentStatuses] = useState<AgentStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const [repRes, roadRes, logRes] = await Promise.all([
        fetch('/api/seo-os/performance-live'),
        fetch('/api/seo-os/roadmap'),
        fetch('/api/seo-os/logs')
      ]);
      
      if (repRes.ok) {
        const repData = await repRes.json();
        if (repData.success) {
          setReports(repData.data);
          setError(null);
        } else {
          setError(repData.error);
        }
      }
      if (roadRes.ok) setRoadmap(await roadRes.json());
      if (logRes.ok) {
        const logData = await logRes.json();
        setLogs(logData.logs);
        setAgentStatuses(logData.status);
      }
    } catch (e) {
      console.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  const stats = [
    { label: 'Total Articles', value: BLOG_POSTS.length.toString(), change: '+2', icon: Trophy },
    { label: 'SEO Progress', value: `${roadmap?.progress || 0}%`, change: `${roadmap?.tasks.filter(t => t.status === 'completed').length || 0}/30`, icon: LayoutDashboard },
    { label: 'Top CTR', value: reports.length > 0 ? `${(Math.max(...reports.map(r => r.ctr)) * 100).toFixed(1)}%` : '0%', change: 'Optimal', icon: TrendingUp },
    { label: 'Avg Position', value: reports.length > 0 ? (reports.reduce((a, b) => a + b.position, 0) / reports.length).toFixed(1) : '0', change: 'Stable', icon: Activity },
  ];

  return (
    <div className="space-y-10 pb-20 font-sans">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-4 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-accent/10 group-hover:text-accent transition-all">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${
                stat.change.includes('+') || stat.change.includes('/') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
              <h3 className="text-3xl font-bold text-slate-900 font-serif">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <section className="lg:col-span-8 space-y-10">
          
          {/* Active AI Strategy Callout */}
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-8 relative overflow-hidden shadow-2xl border border-white/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent rounded-2xl shadow-lg shadow-accent/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-serif">Day {roadmap?.tasks.find(t => t.status === 'pending')?.day || 1} Operation</h2>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                    Status: {roadmap?.systemStatus === 'paused' ? 'Paused' : 'Autopilot Enabled'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={async () => {
                    const newStatus = roadmap?.systemStatus === 'paused' ? 'active' : 'paused';
                    if(confirm(`Are you sure you want to ${newStatus === 'paused' ? 'STOP' : 'START'} the AI agents?`)) {
                      const res = await fetch('/api/seo-os/roadmap', {
                        method: 'POST',
                        body: JSON.stringify({ action: 'toggle-status', status: newStatus })
                      });
                      if(res.ok) loadData();
                    }
                  }}
                  className={`text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl transition-all border ${
                    roadmap?.systemStatus === 'paused' 
                    ? 'bg-emerald-500 text-white border-emerald-400 hover:bg-emerald-600' 
                    : 'bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20'
                  }`}
                >
                  {roadmap?.systemStatus === 'paused' ? 'Start AI Agents' : 'Stop All Agents'}
                </button>
                <Link href="/dsh/strategy" className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl transition-all border border-white/10 no-underline">
                  View Full Strategy
                </Link>
              </div>
            </div>

            {roadmap?.tasks.filter(t => t.status === 'pending').slice(0, 1).map((task) => (
              <div key={task.day} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-4 relative z-10">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Immediate Keyword Target</span>
                    <Zap className="w-4 h-4 text-accent fill-accent" />
                 </div>
                 <h4 className="text-2xl font-bold font-serif text-white">{task.keyword}</h4>
                 <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold bg-white/10 text-slate-300 px-3 py-1 rounded-full uppercase">{task.type}</span>
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Priority: {task.priority}</span>
                 </div>
                 <div className="pt-4 flex flex-wrap gap-4">
                    <button className="flex-1 bg-white text-slate-900 font-black uppercase tracking-widest text-[10px] py-4 rounded-xl hover:bg-accent hover:text-white transition-all">
                       Generate Now
                    </button>
                    <button 
                      onClick={async () => {
                        if(confirm('Start full 1AM-9AM SEO Cycle? This will generate and publish a live post.')) {
                          const res = await fetch('/api/seo-os/cron?token=dev-test');
                          const data = await res.json();
                          alert(data.success ? 'Cycle Complete!' : 'Error: ' + data.error);
                        }
                      }}
                      className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-white text-[10px] font-bold uppercase"
                    >
                       Trigger Full Cycle
                    </button>
                    <button 
                      onClick={async () => {
                        if(confirm('Submit all missing URLs to GSC?')) {
                          const res = await fetch('/api/seo-os/cleanup?token=dev-test', { method: 'POST' });
                          const data = await res.json();
                          alert(data.success ? `Submitted ${data.submittedCount} URLs!` : 'Error: ' + data.error);
                        }
                      }}
                      className="px-6 py-4 bg-accent/10 border border-accent/20 rounded-xl hover:bg-accent/20 transition-all text-accent text-[10px] font-bold uppercase"
                    >
                       Submit Missing URLs
                    </button>
                 </div>
              </div>
            ))}
          </div>
          
          {/* Quick Performance Snapshot */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Performance Snapshot</h2>
              <Link href="/dsh/performance" className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline no-underline">Deep Dive &rarr;</Link>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 text-rose-600 text-xs font-bold">
                 <AlertCircle className="w-4 h-4" />
                 <span>GSC Error: {error}</span>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">URL</th>
                    <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400 text-center">Pos</th>
                    <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {reports.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-8 py-10 text-center text-slate-400 italic text-xs">No ranking data available yet.</td>
                    </tr>
                  ) : (
                    reports.slice(0, 5).map((report) => (
                      <tr key={report.url} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-5">
                          <span className="text-xs font-bold text-slate-900">{report.url}</span>
                        </td>
                        <td className="px-8 py-5 text-center">
                          <span className="text-xs font-medium text-slate-600">#{report.position}</span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase ${
                            report.trend === 'winning' ? 'text-emerald-600' : 'text-slate-400'
                          }`}>
                            {report.trend}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Sidebar logs */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 space-y-6 shadow-sm">
             <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-100 pb-3 flex items-center gap-2">
               <Clock className="w-3.5 h-3.5 text-accent" />
               Agent Live Status
             </h3>
             <div className="grid grid-cols-2 gap-3">
                {agentStatuses.map(agent => (
                   <div key={agent.name} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <div className={`w-2 h-2 rounded-full ${
                        agent.currentStatus === 'active' ? 'bg-accent animate-pulse' : 
                        agent.currentStatus === 'error' ? 'bg-rose-500' : 'bg-slate-300'
                      }`}></div>
                      <span className="text-[9px] font-bold text-slate-700 uppercase leading-none">{agent.name.split(' ')[0]}</span>
                   </div>
                ))}
             </div>

             <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-100 pb-3 pt-4">
               Recent Activity
             </h3>
             <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {logs.length === 0 ? (
                  <p className="text-[10px] text-slate-400 italic">No activity recorded.</p>
                ) : (
                  logs.slice(0, 10).map((log, i) => (
                    <div key={i} className="flex gap-3 relative group">
                       <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                          log.status === 'success' ? 'bg-emerald-500' : 
                          log.status === 'error' ? 'bg-rose-500' : 
                          log.status === 'active' ? 'bg-accent' : 'bg-slate-300'
                       }`}></div>
                       <div>
                         <span className="block text-[10px] font-black text-slate-900 leading-none mb-1 uppercase">{log.agent}</span>
                         <p className="text-[10px] text-slate-500 leading-tight">{log.message}</p>
                         <span className="text-[8px] text-slate-300 font-bold uppercase">{new Date(log.timestamp).toLocaleTimeString()}</span>
                       </div>
                    </div>
                  ))
                )}
             </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-8 space-y-6 shadow-xl border border-white/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full"></div>
             <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] border-b border-white/10 pb-3">Strategy Pulse</h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px]">
                   <span className="text-slate-400 font-bold uppercase">Moat Depth</span>
                   <span className="text-white font-black">12/30 Articles</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-accent" style={{ width: '40%' }}></div>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                   <span className="text-slate-400 font-bold uppercase">Top 10 Reach</span>
                   <span className="text-emerald-400 font-black">+14% Growth</span>
                </div>
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
