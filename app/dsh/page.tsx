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
  LayoutDashboard,
  ChevronRight,
  X,
  Bot
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { RoadmapData, RoadmapTask } from '@/lib/seo-os/roadmap-engine';
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
  const [selectedTaskDay, setSelectedTaskDay] = useState<number | null>(null);

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

  const selectedTask = roadmap?.tasks.find(t => t.day === selectedTaskDay);

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
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ action: 'toggle-status', status: newStatus })
                      });
                      if (res.ok && newStatus === 'active') {
                        fetch('/api/seo-os/cron').catch(() => {});
                      }
                      loadData();
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

            {roadmap?.tasks.filter(t => t.status === 'pending').slice(0, 1).map((task) => {
              const activeStepIdx = task.pipeline?.findIndex(s => s.status === 'active' || s.status === 'pending');
              const activeStep = task.pipeline?.[activeStepIdx ?? -1];
              const progressPercent = task.pipeline ? Math.round((task.pipeline.filter(s => s.status === 'completed').length / task.pipeline.length) * 100) : 0;

              return (
                <div 
                  key={task.day} 
                  onClick={() => setSelectedTaskDay(task.day)}
                  className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-6 relative z-10 cursor-pointer hover:bg-white/10 transition-all group"
                >
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-accent fill-accent" />
                        <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Live Expert Task &mdash; Pipeline Active</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-white">{progressPercent}%</span>
                        <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                      </div>
                   </div>

                   <div className="space-y-1">
                      <h4 className="text-2xl font-bold font-serif text-white">{task.keyword}</h4>
                      {activeStep && (
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Current: {activeStep.agent} &mdash; <span className="text-white">{activeStep.message}</span>
                          </p>
                        </div>
                      )}
                   </div>

                   <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold bg-white/10 text-slate-300 px-3 py-1 rounded-full uppercase">{task.task_type}</span>
                      <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Priority: {task.priority}</span>
                   </div>
                   
                   <div className="pt-2 flex flex-wrap gap-4">
                      <div className="flex-1 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] py-4 rounded-xl text-center">
                         Autopilot Processing...
                      </div>
                      <button 
                        onClick={async (e) => {
                          e.stopPropagation();
                          if(confirm('Submit all missing URLs to GSC?')) {
                            const btn = e.currentTarget;
                            btn.disabled = true;
                            const res = await fetch('/api/seo-os/cleanup', { method: 'POST' });
                            const data = await res.json();
                            alert(data.success ? `Submitted ${data.submittedCount ?? 0} URLs!` : 'Error: ' + data.error);
                            btn.disabled = false;
                          }
                        }}
                        className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-white text-[10px] font-bold uppercase disabled:opacity-50"
                      >
                         Cleanup GSC
                      </button>
                   </div>
                </div>
              );
            })}

            {roadmap?.tasks.filter(t => t.status === 'pending').length === 0 && (
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-4 relative z-10 text-center">
                <div className="text-4xl mb-2 opacity-30"><CheckCircle2 className="w-12 h-12 text-white mx-auto" /></div>
                <h4 className="text-lg font-bold font-serif text-white">All Tasks Processed</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {roadmap?.tasks.filter(t => t.status === 'completed').length > 0
                    ? `${roadmap.tasks.filter(t => t.status === 'completed').length} tasks completed. Waiting for the next strategy cycle (midnight).`
                    : 'No tasks in the queue yet. Strategist will generate tasks on the next cycle.'}
                </p>
                <div className="pt-2 flex flex-wrap gap-4 justify-center">
                  <div className="flex-1 max-w-xs bg-white/5 border border-white/10 text-white/60 font-black uppercase tracking-widest text-[10px] py-4 rounded-xl text-center">
                     Idle &mdash; Autopilot Standby
                  </div>
                  <button
                   onClick={async () => {
                     if(confirm('Reset ALL completed tasks to pending and re-run the pipeline?')) {
                       const res = await fetch('/api/seo-os/reset-tasks', { method: 'POST' });
                       const data = await res.json();
                       if (data.success) {
                         fetch('/api/seo-os/cron').catch(() => {});
                         loadData();
                       }
                     }
                   }}
                   className="px-6 py-4 bg-white/10 border border-white/10 rounded-xl hover:bg-white/20 transition-all text-white text-[10px] font-black uppercase tracking-widest"
                  >
                     Reset &amp; Re-run All
                  </button>
                </div>
              </div>
            )}
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
             <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-100 pb-3 flex items-center justify-between">
               <span className="flex items-center gap-2">
                 <Clock className="w-3.5 h-3.5 text-accent" />
                 Agent Live Status
               </span>
               <Link href="/dsh/audit" className="text-accent hover:underline font-black">AUDIT</Link>
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
             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {logs.length === 0 ? (
                  <p className="text-[10px] text-slate-400 italic">No activity recorded.</p>
                ) : (
                  logs.slice(0, 15).map((log, i) => {
                    // Try to find a matching task for this log
                    const relatedTask = roadmap?.tasks.find(t => 
                      log.message.toLowerCase().includes(t.keyword.toLowerCase()) ||
                      (t.publishedUrl && log.message.includes(t.publishedUrl))
                    );

                    return (
                      <div 
                        key={i} 
                        onClick={() => relatedTask && setSelectedTaskDay(relatedTask.day)}
                        className={`flex gap-3 relative group ${relatedTask ? 'cursor-pointer hover:bg-slate-50 p-2 -m-2 rounded-xl transition-all' : ''}`}
                      >
                         <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                            log.status === 'success' ? 'bg-emerald-500' : 
                            log.status === 'error' ? 'bg-rose-500' : 
                            log.status === 'active' ? 'bg-accent' : 'bg-slate-300'
                         }`}></div>
                         <div>
                           <div className="flex items-center gap-2">
                             <span className="block text-[10px] font-black text-slate-900 leading-none uppercase">{log.agent}</span>
                           </div>
                           <p className="text-[10px] text-slate-500 leading-tight mt-1">{log.message}</p>
                           <span className="text-[8px] text-slate-300 font-bold uppercase">{new Date(log.timestamp).toLocaleTimeString()}</span>
                         </div>
                      </div>
                    );
                  })
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

      {/* Task Pipeline Modal */}
      {selectedTaskDay && selectedTask && (
        <div className="fixed inset-0 z-[10000] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200">
              <header className="p-8 border-b border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-900 rounded-2xl">
                       <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold font-serif">Task Execution Pipeline</h3>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{selectedTask.keyword}</p>
                    </div>
                 </div>
                 <button 
                  onClick={() => setSelectedTaskDay(null)}
                  className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
                 >
                    <X className="w-5 h-5 text-slate-400" />
                 </button>
              </header>

              <div className="p-10 space-y-8">
                 {selectedTask.pipeline ? (
                   <div className="space-y-8 relative">
                      {/* Connector Line */}
                      <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-slate-100"></div>

                      {selectedTask.pipeline.map((step, idx) => (
                        <div key={step.agent} className="flex gap-6 relative z-10">
                           <div className={`w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shrink-0 shadow-sm ${
                             step.status === 'completed' ? 'bg-emerald-500' :
                             step.status === 'active' ? 'bg-accent animate-pulse' :
                             step.status === 'failed' ? 'bg-rose-500' : 'bg-slate-200'
                           }`}>
                             {step.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-white" />}
                           </div>
                           <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                 <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{step.agent}</span>
                                 <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                                   step.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                                   step.status === 'active' ? 'bg-accent/10 text-accent' :
                                   step.status === 'failed' ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-400'
                                 }`}>
                                   {step.status}
                                 </span>
                              </div>
                              <p className="text-xs text-slate-500 font-medium">{step.message}</p>
                              {step.completedAt && (
                                <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest mt-1">Finished: {new Date(step.completedAt).toLocaleTimeString()}</p>
                              )}
                           </div>
                        </div>
                      ))}
                   </div>
                 ) : (
                    <div className="text-center py-10 space-y-4">
                       <AlertCircle className="w-8 h-8 text-slate-300 mx-auto" />
                       <p className="text-sm text-slate-400 font-medium">Task pipeline not initialized</p>
                       <p className="text-[10px] text-slate-400">Pipeline is created when the execution cycle processes this task. Hit <strong>Reset &amp; Re-run All</strong> below to trigger processing.</p>
                    </div>
                  )}
              </div>

               <footer className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                   onClick={async () => {
                     if(confirm('Reset ALL completed tasks to pending and re-run the pipeline?')) {
                       const res = await fetch('/api/seo-os/reset-tasks', { method: 'POST' });
                       const data = await res.json();
                       if (data.success) {
                         setSelectedTaskDay(null);
                         loadData();
                         const cronRes = await fetch('/api/seo-os/cron');
                         const cronData = await cronRes.json();
                         alert(`Reset ${data.resetCount} tasks. Pipeline: ${cronData.message || cronData.error}`);
                         loadData();
                       } else {
                         alert('Error: ' + data.error);
                       }
                     }
                   }}
                   className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                     Reset &amp; Re-run All
                  </button>
                  <button 
                   onClick={() => setSelectedTaskDay(null)}
                   className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50 transition-all"
                  >
                     Close Tracking
                  </button>
               </footer>
           </div>
        </div>
      )}
    </div>
  );
}

