'use client';

import { useState, useEffect } from 'react';

export default function DrawdownCalculator() {
  const [startingBalance, setStartingBalance] = useState<number>(10000);
  const [drawdownPercent, setDrawdownPercent] = useState<number>(20);

  const [remainingBalance, setRemainingBalance] = useState<number>(0);
  const [recoveryPercent, setRecoveryPercent] = useState<number>(0);

  useEffect(() => {
    const loss = startingBalance * (drawdownPercent / 100);
    const remaining = startingBalance - loss;
    
    setRemainingBalance(Math.round(remaining * 100) / 100);

    if (remaining > 0) {
      const recovery = (loss / remaining) * 100;
      setRecoveryPercent(Math.round(recovery * 100) / 100);
    } else {
      setRecoveryPercent(100);
    }
  }, [startingBalance, drawdownPercent]);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-primary mb-2">1. Account Situation</h2>
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5">Starting Balance ($)</label>
          <input
            type="number"
            value={startingBalance || ''}
            onChange={(e) => setStartingBalance(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5">Account Drawdown (%)</label>
          <input
            type="number"
            value={drawdownPercent || ''}
            onChange={(e) => setDrawdownPercent(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary text-sm"
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-lg font-bold text-primary mb-2">2. Recovery Mathematics</h2>
        <div className="border border-border p-5 rounded-[4px] bg-surface text-center">
          <span className="text-xs text-muted block mb-1 uppercase tracking-widest">New Account Balance</span>
          <span className="text-3xl font-black text-slate-900">${remainingBalance.toLocaleString()}</span>
        </div>
        <div className="border border-rose-200 border-l-rose-500 border-l-4 p-5 rounded-[4px] bg-rose-50/30 text-center">
          <span className="text-xs text-rose-800 font-bold block mb-1 uppercase tracking-widest">Gains Needed to Recover</span>
          <span className="text-4xl font-black text-rose-900">{recoveryPercent}%</span>
        </div>
        <div className="bg-slate-50 p-4 rounded-[4px] border border-slate-100 text-[11px] text-slate-500 leading-relaxed italic">
          As your losses get deeper, the percentage gain needed to return to your starting balance increases exponentially. This is why preserving your capital is more important than looking for big wins.
        </div>
      </section>
    </div>
  );
}
