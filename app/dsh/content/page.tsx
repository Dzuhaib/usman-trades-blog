import { 
  FileText, 
  Plus, 
  Search, 
  MoreVertical, 
  ExternalLink, 
  Clock,
  Sparkles
} from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blogData';

export default function ContentManagerPage() {
  return (
    <div className="space-y-10 pb-20">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h2 className="text-2xl font-bold font-serif text-slate-900">Library Assets</h2>
            <p className="text-slate-500 text-sm">Manage your humanoid trading education catalog.</p>
         </div>
         <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-2xl text-sm flex items-center gap-2 transition-all active:scale-[0.98]">
            <Plus className="w-4 h-4" />
            New Content Draft
         </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center gap-4 bg-slate-50/30">
           <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search articles, keywords, or categories..." 
                className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
           </div>
        </div>

        <div className="divide-y divide-slate-50">
           {BLOG_POSTS.map((post) => (
             <div key={post.slug} className="p-8 hover:bg-slate-50/50 transition-all group flex items-center justify-between">
                <div className="flex items-center gap-6">
                   <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-accent/10 group-hover:text-accent transition-all">
                      <FileText className="w-6 h-6" />
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-accent transition-colors">{post.title}</h4>
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">{post.category}</span>
                         <span className="text-slate-200">•</span>
                         <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-slate-300" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Updated {post.updatedAt}</span>
                         </div>
                         <span className="text-slate-200">•</span>
                         <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Live</span>
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <button className="p-3 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl border border-transparent hover:border-slate-100 transition-all"><ExternalLink className="w-4 h-4" /></button>
                   <button className="p-3 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl border border-transparent hover:border-slate-100 transition-all"><MoreVertical className="w-4 h-4" /></button>
                </div>
             </div>
           ))}
        </div>

        <div className="p-8 bg-slate-900 text-white flex items-center justify-between rounded-t-[2.5rem] mt-10">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                 <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div>
                 <h4 className="font-bold font-serif">Bulk Content Generation</h4>
                 <p className="text-xs text-slate-400 font-medium">Generate 5 risk-management articles in one click.</p>
              </div>
           </div>
           <button className="bg-white text-slate-900 font-black uppercase tracking-widest text-[10px] px-6 py-3 rounded-xl hover:bg-accent hover:text-white transition-all shadow-lg shadow-white/5">
              Initialize Bulk Run
           </button>
        </div>
      </div>
    </div>
  );
}
