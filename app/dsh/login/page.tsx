'use client';

import { useState, useTransition, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, ChevronRight, Loader2 } from 'lucide-react';

function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('from') || '/dsh';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    startTransition(async () => {
      try {
        const res = await fetch('/api/dsh-auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        });

        if (res.ok) {
          router.push(redirectTo);
          router.refresh();
        } else {
          const data = await res.json();
          setError(data.error || 'Invalid authorization key.');
        }
      } catch {
        setError('Connection error. Please try again.');
      }
    });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
          Authorization Key
        </label>
        <input
          id="dsh-password"
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
          autoComplete="current-password"
          className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white text-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-slate-700 disabled:opacity-50"
        />
        {error && (
          <p className="text-[11px] text-rose-500 font-bold ml-1">{error}</p>
        )}
      </div>
      <button
        id="dsh-login-btn"
        type="submit"
        disabled={isPending || !password}
        className="w-full h-14 bg-accent hover:bg-accent-dark text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-accent/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            Unlock Dashboard
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

export default function DashboardLoginPage() {
  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[440px] space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black text-accent uppercase tracking-widest">
              Secure SEO-OS Gateway
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white font-serif">Command Center</h1>
          <p className="text-slate-400 text-sm italic">
            Verification required to access Usman Trades growth data.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-10 space-y-8 shadow-2xl">
          <Suspense fallback={
            <div className="flex justify-center items-center h-48">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
          }>
            <LoginForm />
          </Suspense>
        </div>

        <div className="text-center">
          <a
            href="/"
            className="text-slate-600 text-[10px] font-bold uppercase tracking-widest hover:text-slate-400 transition-colors"
          >
            Return to Public Site
          </a>
        </div>
      </div>
    </div>
  );
}
