'use client';
import { useState, useEffect } from 'react';
import { Loader2, Zap, CheckCircle2, Bot, X } from 'lucide-react';
import { RoadmapTask } from '@/lib/seo-os/roadmap-engine';

export default function DelegatedTasksPage() {
  const [tasks, setTasks] = useState<RoadmapTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<RoadmapTask | null>(null);

  const loadData = async () => {
    setLoading(true);
    const res = await fetch('/api/seo-os/roadmap');
    const data = await res.json();
    setTasks(data.tasks || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="p-10 text-center"><Loader2 className="animate-spin w-10 h-10 mx-auto" /></div>;

  return (
    <div className="p-10 space-y-8 font-sans">
      <h1 className="text-3xl font-serif font-bold">Delegated Audit Tasks</h1>
      <div className="grid gap-4">
        {tasks.filter(t => t.task_type !== 'CREATE_CONTENT').map((task) => (
          <div key={task.day} 
               onClick={() => setSelectedTask(task)}
               className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-accent transition-all">
            <div>
              <h3 className="font-bold text-lg">{task.keyword}</h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                Type: {task.task_type} | Priority: {task.priority}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase ${
              task.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {task.status}
            </div>
          </div>
        ))}
      </div>

      {selectedTask && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-6 z-[10000]">
           <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200">
              <header className="p-8 border-b border-slate-100 flex items-center justify-between">
                 <div>
                    <h3 className="text-xl font-bold font-serif">Pipeline Tracking</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{selectedTask.keyword}</p>
                 </div>
                 <button onClick={() => setSelectedTask(null)} className="p-2 hover:bg-slate-50 rounded-xl"><X className="w-5 h-5" /></button>
              </header>
              <div className="p-10 space-y-6">
                 {selectedTask.pipeline?.map((step) => (
                   <div key={step.agent} className="flex gap-4">
                     <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                       {step.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-white" />}
                     </div>
                     <div>
                        <p className="text-xs font-black uppercase">{step.agent}</p>
                        <p className="text-[10px] text-slate-500">{step.message}</p>
                     </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
