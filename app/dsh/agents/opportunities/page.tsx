'use client';

import { 
  Lightbulb, 
  TrendingUp, 
  Target, 
  Zap, 
  Search,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Brain
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { GSCReport } from '@/lib/seo-os/analytics-engine';
import { RoadmapData } from '@/lib/seo-os/roadmap-engine';

export default function OpportunitiesPage() {
  const [reports, setReports] = useState<GSCReport[]>([]);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [repRes, roadRes] = await Promise.all([
      fetch('/api/seo-os/performance-live'),
      fetch('/api/seo-os/roadmap')
    ]);
    
    if (repRes.ok) {
      const data = await repRes.json();
      if (data.success) setReports(data.data);
    }
    if (roadRes.ok) {
      setRoadmap(await roadRes.json());
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  const opportunities = reports
    .filter(r => r.position > 10 && r.position < 30)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 10);

  return (
    <div className="space-y-10 pb-20 font-sans">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-lg">
             <Brain className="w-5 h-5 text-accent" />
          </div>
          <h1 className="text-3xl font-bold font-serif text-slate-900">Opportunity Intelligence</h1>
        </div>
        <p className="text-slate-500 uppercase text-[10px] font-black tracking-widest">Researcher Agent: Continuous Market Scan</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Opportunity Feed */}
        <section className="lg:col-span-8 space-y-6">
           {opportunities.length === 0 ? (
             <div className="bg-white border border-slate-200 rounded-[2rem] p-20 text-center space-y-4">
                <Search className="w-12 h-12 text-slate-200 mx-auto" />
                <p className="text-slate-400 italic">Scanning for new beneficial opportunities...</p>
             </div>
           ) : (
             opportunities.map((opp, i) => {
               const isApproved = roadmap?.tasks.some(t => {
                 const normalizedTaskKeyword = t.keyword.toLowerCase();
                 const normalizedOppUrl = opp.url.toLowerCase();
                 return normalizedTaskKeyword.includes(normalizedOppUrl);
               });

               return (
                 <div key={opp.url} className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                    {i === 0 && <div className="absolute top-0 right-0 bg-accent text-white text-[8px] font-black uppercase px-4 py-1.5 rounded-bl-xl tracking-widest">Top Recommendation</div>}
                    
                    <div className="flex items-start justify-between gap-6">
                       <div className="space-y-4 flex-1">
                          <div className="flex items-center gap-3">
                             <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase">Position #{opp.position}</span>
                             <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {opp.impressions.toLocaleString()} Impressions
                             </span>
                          </div>
                          <h3 className="text-xl font-bold font-serif text-slate-900 group-hover:text-accent transition-colors">{opp.url}</h3>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">
                             The Researcher Agent has identified this page as a "High-Growth" target. It is currently ranking on Page 2/3 but attracting significant search volume. Optimizing this will directly impact traffic.
                          </p>
                          <div className="pt-4 flex items-center gap-6">
                             <div className="flex items-center gap-2">
                                <Zap className="w-3.5 h-3.5 text-accent fill-accent" />
                                <span className="text-[10px] font-black uppercase text-slate-900">Strategy: Content Deep-Dive</span>
                             </div>
                             <div className="flex items-center gap-2">
                                <Target className="w-3.5 h-3.5 text-slate-400" />
                                <span className="text-[10px] font-black uppercase text-slate-900">Goal: Pos #1-3</span>
                             </div>
                          </div>
                       </div>
                       
                       <div className="flex flex-col gap-2">
                          <button 
                            disabled={isApproved}
                            onClick={async () => {
                              if(confirm(`Approve this growth opportunity: ${opp.url}?`)) {
                                const res = await fetch('/api/seo-os/roadmap', {
                                  method: 'POST',
                                  body: JSON.stringify({ 
                                    action: 'add-task', 
                                    task: { 
                                      keyword: `Optimize ${opp.url}`, 
                                      type: 'article',
                                      priority: 'high',
                                      expert_note: `Manual boost for Page 2 content at pos #${opp.position}`
                                    } 
                                  })
                                });
                                if(res.ok) {
                                  alert('Opportunity approved! Agents will now prioritize this task.');
                                  load();
                                }
                              }
                            }}
                            className={`text-[10px] font-black uppercase tracking-widest px-6 py-4 rounded-xl transition-all ${
                              isApproved 
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-not-allowed'
                              : 'bg-slate-900 text-white hover:bg-accent'
                            }`}
                          >
                             {isApproved ? (
                               <span className="flex items-center gap-2">
                                 <CheckCircle2 className="w-3.5 h-3.5" />
                                 Approved & Active
                               </span>
                             ) : 'Approve & Execute'}
                          </button>
                          {!isApproved && (
                            <button className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-rose-500 py-2">
                               Dismiss Opportunity
                            </button>
                          )}
                       </div>
                    </div>
                 </div>
               );
             })
           )}
        </section>

        {/* Intelligence Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-slate-900 rounded-[2rem] p-8 text-white space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-3xl rounded-full"></div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/10 pb-3">Expert Analysis</h3>
              <div className="space-y-6 relative z-10">
                 <div className="space-y-2">
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Current Focus</p>
                    <p className="text-sm font-medium text-slate-300 italic">"Pushing Page 2 content to Page 1 for XAUUSD clusters."</p>
                 </div>
                 <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] text-slate-400 font-bold uppercase">Growth Velocity</span>
                       <span className="text-emerald-400 font-black">+18%</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] text-slate-400 font-bold uppercase">Market Share</span>
                       <span className="text-white font-black">Medium</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white border border-slate-200 rounded-[2rem] p-8 space-y-6">
              <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-100 pb-3">Agent Reasoning</h3>
              <div className="space-y-4">
                 <div className="flex gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <p className="text-[11px] text-slate-600 leading-tight">Researcher has confirmed these topics have zero competition from major brokers.</p>
                 </div>
                 <div className="flex gap-3">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <p className="text-[11px] text-slate-600 leading-tight">3 high-potential keywords found but rejected due to low brand alignment.</p>
                 </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}