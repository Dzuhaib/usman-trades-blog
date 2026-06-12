'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Trophy,
  FileEdit,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe,
  Bot
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/dsh', icon: LayoutDashboard },
    { label: 'GSC Performance', href: '/dsh/performance', icon: BarChart3 },
    { label: 'AI Strategy', href: '/dsh/strategy', icon: Trophy },
    {
      label: 'AI Agents',
      href: '/dsh/agents',
      icon: Bot,
      subItems: [
        { label: 'Workforce Logs', href: '/dsh/agents' },
        { label: 'Opportunity Feed', href: '/dsh/agents/opportunities' },
      ]
    },
    { label: 'Content Manager', href: '/dsh/content', icon: FileEdit },
    { label: 'Technical SEO', href: '/dsh/technical', icon: Settings },
  ];

  const handleLogout = async () => {
    await fetch('/api/dsh-auth', { method: 'DELETE' });
    window.location.href = '/dsh/login';
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex overflow-hidden font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-950 border-r border-slate-900 flex flex-col shrink-0">
        <div className="p-8 space-y-1">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
                <Zap className="w-6 h-6 text-white fill-white" />
             </div>
             <div>
                <h2 className="text-white font-bold text-lg leading-none">SEO-OS</h2>
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-tighter">v2.0 Enterprise</span>
             </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
           {navItems.map((item) => {
             const isActive = pathname === item.href || (item.subItems && item.subItems.some(sub => pathname === sub.href));
             return (
               <div key={item.label} className="space-y-1">
                 <Link
                   href={item.href}
                   className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all no-underline group ${
                     isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                   }`}
                 >
                   <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-600 group-hover:text-slate-400'}`} />
                   <span className="text-[13px] font-bold tracking-tight">{item.label}</span>
                 </Link>

                 {item.subItems && isActive && (
                   <div className="ml-12 space-y-1">
                      {item.subItems.map(sub => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`block py-2 text-[11px] font-bold uppercase tracking-widest no-underline transition-colors ${
                            pathname === sub.href ? 'text-accent' : 'text-slate-600 hover:text-slate-400'
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                   </div>
                 )}
               </div>
             );
           })}
        </nav>

        <div className="p-6 border-t border-slate-900 space-y-6">
           <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                 <Globe className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                 <p className="text-[11px] text-white font-bold leading-none">Live Site</p>
                 <p className="text-[9px] text-slate-500 font-medium">usmantrades.co.uk</p>
              </div>
           </div>
           <button
             onClick={handleLogout}
             className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-slate-500 hover:text-rose-500 uppercase tracking-widest transition-colors py-2"
           >
             <LogOut className="w-3 h-3" />
             Terminate Session
           </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">
         {/* Top Bar */}
         <header className="h-20 bg-white border-b border-slate-200 px-10 flex items-center justify-between shrink-0">
            <h1 className="text-xl font-bold font-serif text-slate-900 tracking-tight capitalize">
              {pathname === '/dsh' ? 'Executive Overview' : pathname.split('/').pop()?.replace('-', ' ')}
            </h1>
            <div className="flex items-center gap-4">
               <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-500">MU</div>
                  <div className="w-8 h-8 rounded-full bg-accent border-2 border-white flex items-center justify-center text-[10px] font-black text-white italic">AI</div>
               </div>
               <div className="w-[1px] h-6 bg-slate-200 mx-2"></div>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Auto-pilot Enabled</span>
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
         </header>

         {/* Viewport */}
         <div className="flex-1 overflow-y-auto p-10 scroll-smooth">
            <div className="max-w-[1100px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
               {children}
            </div>
         </div>
      </main>
    </div>
  );
}
