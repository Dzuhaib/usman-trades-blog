'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Info } from 'lucide-react';

export default function MiniRiskTerminal() {
  const [balance, setBalance] = useState<number>(10000);
  const [stopLoss, setStopLoss] = useState<number>(20);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [asset, setAsset] = useState<string>('forex');
  const [suggestedLots, setSuggestedLots] = useState<number>(0.5);

  useEffect(() => {
    if (balance <= 0 || stopLoss <= 0 || riskPercent <= 0) {
      setSuggestedLots(0);
      return;
    }
    const cashRisk = balance * (riskPercent / 100);
    let lots = 0;
    if (asset === 'btc') {
      lots = cashRisk / stopLoss;
    } else {
      lots = cashRisk / (stopLoss * 10);
    }
    setSuggestedLots(Math.max(0, Math.round(lots * 100) / 100));
  }, [balance, stopLoss, riskPercent, asset]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-accent" />
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Position Sizer
          </span>
        </div>
        <span className="text-[10px] font-medium text-slate-400">Risk Control v1.0</span>
      </div>

      <div className="space-y-4">
        {/* Asset Selection */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => { setAsset('forex'); setStopLoss(20); }}
            className={`py-2 rounded text-xs font-bold transition-all border ${
              asset === 'forex'
                ? 'bg-slate-900 border-slate-900 text-white'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            Forex / Gold
          </button>
          <button
            onClick={() => { setAsset('btc'); setStopLoss(500); }}
            className={`py-2 rounded text-xs font-bold transition-all border ${
              asset === 'btc'
                ? 'bg-slate-900 border-slate-900 text-white'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            Bitcoin
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5 ml-1">
              Account Balance (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
              <input
                type="number"
                value={balance || ''}
                onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-7 pr-3 py-2.5 text-slate-900 text-sm focus:bg-white focus:border-accent outline-none transition-all font-medium"
                placeholder="10000"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5 ml-1">
              {asset === 'btc' ? 'Stop Loss (USD Distance)' : 'Stop Loss (Pips)'}
            </label>
            <input
              type="number"
              value={stopLoss || ''}
              onChange={(e) => setStopLoss(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 text-sm focus:bg-white focus:border-accent outline-none transition-all font-medium"
              placeholder={asset === 'btc' ? '500' : '20'}
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-accent/5 border border-accent/10 p-5 rounded-xl text-center space-y-1">
          <span className="text-[10px] text-accent font-bold uppercase tracking-widest block">Recommended Size</span>
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="text-3xl font-black text-slate-900">
              {suggestedLots}
            </span>
            <span className="text-sm font-bold text-slate-500">
              {asset === 'btc' ? 'Units' : 'Lots'}
            </span>
          </div>
          <div className="flex items-center justify-center gap-1.5 pt-1">
            <Info className="w-3 h-3 text-slate-400" />
            <span className="text-[10px] text-slate-500 font-medium">
              Risks exactly <span className="text-slate-900 font-bold">{riskPercent}%</span> of capital
            </span>
          </div>
        </div>
      </div>

      <Link
        href="/tools"
        className="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 rounded-lg transition-all no-underline shadow-sm hover:shadow-md"
      >
        Open Advanced Calculator
      </Link>
      
      <p className="text-[10px] text-slate-400 text-center leading-relaxed px-2">
        Verify all parameters with your broker contract before executing live trades.
      </p>
    </div>
  );
}
