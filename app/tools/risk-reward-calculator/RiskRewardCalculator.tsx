'use client';

import { useState, useEffect } from 'react';

export default function RiskRewardCalculator() {
  const [entryPrice, setEntryPrice] = useState<number>(1.0850);
  const [stopLoss, setStopLoss] = useState<number>(1.0820);
  const [takeProfit, setTakeProfit] = useState<number>(1.0910);
  const [lotSize, setLotSize] = useState<number>(1.00);
  const [instrument, setInstrument] = useState<string>('forex-usd');

  const [riskAmount, setRiskAmount] = useState<number>(300);
  const [rewardAmount, setRewardAmount] = useState<number>(600);
  const [ratio, setRatio] = useState<number>(2);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (entryPrice <= 0 || stopLoss <= 0 || takeProfit <= 0) {
      setError('Prices must be greater than 0.');
      setRiskAmount(0);
      setRewardAmount(0);
      setRatio(0);
      return;
    }

    const isLong = takeProfit > entryPrice;
    
    if (isLong) {
      if (stopLoss >= entryPrice) {
        setError('For a buy trade, stop loss must be below entry price.');
        return;
      }
    } else {
      if (stopLoss <= entryPrice) {
        setError('For a sell trade, stop loss must be above entry price.');
        return;
      }
    }

    let riskDiff = Math.abs(entryPrice - stopLoss);
    let rewardDiff = Math.abs(takeProfit - entryPrice);

    let calculatedRisk = 0;
    let calculatedReward = 0;

    if (instrument === 'forex-usd') {
      calculatedRisk = riskDiff * 100000 * lotSize;
      calculatedReward = rewardDiff * 100000 * lotSize;
    } else if (instrument === 'gold') {
      calculatedRisk = riskDiff * 100 * lotSize;
      calculatedReward = rewardDiff * 100 * lotSize;
    } else if (instrument === 'btc') {
      calculatedRisk = riskDiff * lotSize;
      calculatedReward = rewardDiff * lotSize;
    }

    setRiskAmount(Math.round(calculatedRisk * 100) / 100);
    setRewardAmount(Math.round(calculatedReward * 100) / 100);
    setRatio(Math.round((rewardDiff / riskDiff) * 100) / 100);
  }, [entryPrice, stopLoss, takeProfit, lotSize, instrument]);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-primary mb-2">1. Setup Parameters</h2>
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5">Asset Type</label>
          <select
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary text-sm"
          >
            <option value="forex-usd">Forex (EURUSD, GBPUSD)</option>
            <option value="gold">Gold (XAUUSD)</option>
            <option value="btc">Bitcoin (BTCUSD)</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5">Entry Price</label>
          <input
            type="number"
            value={entryPrice || ''}
            onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5">Stop Loss</label>
          <input
            type="number"
            value={stopLoss || ''}
            onChange={(e) => setStopLoss(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5">Take Profit</label>
          <input
            type="number"
            value={takeProfit || ''}
            onChange={(e) => setTakeProfit(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5">Position Size ({instrument === 'btc' ? 'Units' : 'Lots'})</label>
          <input
            type="number"
            value={lotSize || ''}
            onChange={(e) => setLotSize(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary text-sm"
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-lg font-bold text-primary mb-2">2. Risk Reward Analysis</h2>
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-[4px] text-xs font-medium">
            ⚠️ {error}
          </div>
        )}
        <div className="border border-accent/20 border-l-accent border-l-4 p-5 rounded-[4px] bg-accent/5 text-center">
          <span className="text-xs text-accent font-semibold block mb-1 uppercase tracking-widest">Risk Reward Ratio</span>
          <span className="text-4xl font-black text-primary block">1 : {ratio}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-border p-4 rounded-[4px] bg-surface text-center">
            <span className="text-xs text-muted block mb-0.5 uppercase tracking-tighter">Potential Loss</span>
            <span className="text-xl font-bold text-rose-700">${riskAmount.toLocaleString()}</span>
          </div>
          <div className="border border-border p-4 rounded-[4px] bg-surface text-center">
            <span className="text-xs text-muted block mb-0.5 uppercase tracking-tighter">Potential Profit</span>
            <span className="text-xl font-bold text-emerald-700">${rewardAmount.toLocaleString()}</span>
          </div>
        </div>
        <div className="bg-slate-50 p-4 rounded-[4px] border border-slate-100 text-[11px] text-slate-500 leading-relaxed italic">
          Professional traders often aim for a ratio of at least 1:2. This means that even if you only win 40% of your trades, your account will still grow over time.
        </div>
      </section>
    </div>
  );
}
