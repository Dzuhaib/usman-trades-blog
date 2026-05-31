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
  AlertCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { RoadmapData } from '@/lib/seo-os/roadmap-engine';

export default function StrategyPage() {
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generatingStage, setGeneratingStage] = useState<'idle' | 'research' | 'planning'>('idle');
  const [error, setError] = useState<string | null>(null);

  // Fetch roadmap on load
  useEffect(() => {
    fetchRoadmap();
  }, []);

  const fetchRoadmap = async () => {
    try {
      const res = await fetch('/api/seo-os/roadmap');
      if (res.ok) {
        const data = await res.json();
        setRoadmap(data);
      }
    } catch (e) {
      console.error('Failed to fetch roadmap');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setGeneratingStage('research');
    setError(null);
    try {
      const res = await fetch('/api/seo-os/strategy', { method: 'POST' });
      const data = await res.json();
      
      if (data.success) {
        setGeneratingStage('planning');
        await fetchRoadmap();
      } else {
        setError(data.error || 'Failed to generate strategy.');
      }
    } catch (e) {
      setError('Connection error. Please try again.');
    } finally {
      setGenerating(false);
      setGeneratingStage('idle');
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20 font-sans text-slate-900">
      {/* Strategy Header */}
      <section className="bg-slate-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-white">
           <div className="space-y-6 text-white">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                 <Sparkles className="w-4 h-4 text-accent" />
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">AI Strategic Planning</span>
              </div>
              <h2 className="text-5xl font-bold font-serif leading-tight text-white">Mastering Topical Authority</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                 The AI Researcher is currently analyzing live data points from Google to build your 30-day strategy.
              </p>
              
              <div className="space-y-4">
                <button 
                  onClick={handleGenerate}
                  disabled={generating}
                  className="bg-accent hover:bg-accent-dark text-white font-black uppercase tracking-widest px-8 py-4 rounded-2xl shadow-xl shadow-accent/20 transition-all active:scale-[0.98] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      {generatingStage === 'research' ? 'Deep Research Agent Working...' : 'Strategist Agent Planning...'}
                    </>
                  ) : (
                    <>
                      Build Research-Backed Strategy
                      <Zap className="w-4 h-4 fill-white text-white" />
                    </>
                  )}
                </button>
                {error && (
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}
              </div>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm space-y-2 text-white">
                 <Target className="w-5 h-5 text-accent" />
                 <p className="text-2xl font-bold">180</p>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Articles</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm space-y-2 text-white">
                 <TrendingUp className="w-5 h-5 text-emerald-400" />
                 <p className="text-2xl font-bold">Top 3</p>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Desired Avg Pos</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm col-span-2 flex items-center justify-between text-white">
                 <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Current Moat Health</p>
                    <p className="text-lg font-bold text-white">Risk Management: 84%</p>
                 </div>
                 <div className="w-12 h-12 rounded-full border-4 border-accent/20 border-t-accent flex items-center justify-center text-[10px] font-bold">84%</div>
              </div>
           </div>
        </div>
      </section>

      {/* The Roadmap */}
      {!roadmap ? (
        <div className="py-20 text-center space-y-4">
           <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <Calendar className="w-8 h-8" />
           </div>
           <p className="text-slate-400 italic">No roadmap found. Click the button above to generate your first research-backed strategy.</p>
        </div>
      ) : (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-6">
             <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-slate-400" />
                <h3 className="text-lg font-bold font-serif text-slate-900">30-Day Research-Backed Roadmap</h3>
             </div>
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-accent"></div>
                   <span className="text-[10px] font-bold text-slate-500 uppercase">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                   <span className="text-[10px] font-bold text-slate-500 uppercase">Pending</span>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {roadmap.tasks.map((task) => (
               <div key={task.day} className={`group bg-white border rounded-[2rem] p-8 space-y-6 transition-all hover:shadow-xl ${
                 task.status === 'completed' ? 'border-accent/20 bg-accent/5' : 'border-slate-100'
               }`}>
                  <div className="flex items-center justify-between">
                     <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                       task.status === 'completed' ? 'bg-accent text-white' : 'bg-slate-100 text-slate-400'
                     }`}>
                        Day {task.day}
                     </span>
                     {task.status === 'completed' ? <CheckCircle2 className="w-5 h-5 text-accent" /> : <Clock className="w-5 h-5 text-slate-300" />}
                  </div>
                  
                  <div className="space-y-2">
                     <h4 className="text-lg font-bold font-serif text-slate-900 line-clamp-1">{task.keyword}</h4>
                     <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed italic">
                        Data-Backed Priority: AI has identified this {task.type} as a {task.priority} priority based on current search trends.
                     </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                     <div className="flex gap-2">
                        <span className="text-[9px] font-bold bg-slate-50 text-slate-400 px-2 py-0.5 rounded uppercase tracking-tighter">{task.type}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter ${
                          task.priority === 'high' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'
                        }`}>{task.priority}</span>
                     </div>
                     <button className="text-slate-400 hover:text-accent transition-colors">
                        <ArrowRight className="w-4 h-4" />
                     </button>
                  </div>
               </div>
             ))}
          </div>
        </section>
      )}
    </div>
  );
}
