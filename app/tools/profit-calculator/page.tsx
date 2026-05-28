'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProfitCalculator() {
  const [instrument, setInstrument] = useState<string>('forex-usd'); // forex-usd, gold, btc
  const [direction, setDirection] = useState<string>('buy'); // buy, sell
  const [entryPrice, setEntryPrice] = useState<number>(1.0850);
  const [exitPrice, setExitPrice] = useState<number>(1.0900);
  const [lotSize, setLotSize] = useState<number>(1.00);

  const [grossProfit, setGrossProfit] = useState<number>(500);
  const [pipsGained, setPipsGained] = useState<number>(50);
  const [percentageGain, setPercentageGain] = useState<number>(0.46);

  // Auto-set reasonable entries/stops on instrument changes
  useEffect(() => {
    if (instrument === 'forex-usd') {
      setEntryPrice(1.0850);
      setExitPrice(1.0900);
    } else if (instrument === 'gold') {
      setEntryPrice(2350.00);
      setExitPrice(2365.00);
    } else if (instrument === 'btc') {
      setEntryPrice(65000.00);
      setExitPrice(66500.00);
    }
  }, [instrument]);

  // Recalculate profit/loss instantly
  useEffect(() => {
    if (entryPrice <= 0 || exitPrice <= 0 || lotSize <= 0) {
      setGrossProfit(0);
      setPipsGained(0);
      setPercentageGain(0);
      return;
    }

    let diff = exitPrice - entryPrice;
    if (direction === 'sell') {
      diff = entryPrice - exitPrice;
    }

    let calculatedProfit = 0;
    let computedPips = 0;

    if (instrument === 'forex-usd') {
      // 1 standard lot = 100k units
      calculatedProfit = diff * 100000 * lotSize;
      // 1 pip = 0.0001
      computedPips = Math.round(diff / 0.0001 * 10) / 10;
    } else if (instrument === 'gold') {
      // 1 standard lot = 100 ounces. Gold price represents 1 ounce.
      calculatedProfit = diff * 100 * lotSize;
      // 1 pip = $0.10 price movement
      computedPips = Math.round(diff / 0.1 * 10) / 10;
    } else if (instrument === 'btc') {
      // 1 unit = 1 BTC. 
      calculatedProfit = diff * lotSize;
      // Volatility in absolute USD dollars
      computedPips = Math.round(diff * 100) / 100;
    }

    const pct = (diff / entryPrice) * 100;

    setGrossProfit(Math.round(calculatedProfit * 100) / 100);
    setPipsGained(computedPips);
    setPercentageGain(Math.round(pct * 100) / 100);
  }, [instrument, direction, entryPrice, exitPrice, lotSize]);

  return (
    <article className="max-w-[680px] mx-auto space-y-8">
      {/* Header */}
      <header className="border-b border-border pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/tools" className="text-xs text-muted hover:text-primary no-underline">&larr; Back to Tools</Link>
        </div>
        <h1 className="text-3xl font-extrabold text-primary md:text-4xl">Profit & Loss Calculator</h1>
        <p className="text-sm text-secondary">Calculate exact transaction outcomes and reward projections across Forex, Gold, and Cryptocurrencies.</p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left Side: Form */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-primary mb-2">1. Trade Setup Details</h2>

          {/* Instrument Selector */}
          <div>
            <label className="text-xs font-semibold text-secondary block mb-1.5" htmlFor="instrument">
              Trading Instrument
            </label>
            <select
              id="instrument"
              value={instrument}
              onChange={(e) => setInstrument(e.target.value)}
            >
              <option value="forex-usd">Forex USD Counter (EURUSD, GBPUSD)</option>
              <option value="gold">Gold (XAUUSD)</option>
              <option value="btc">Bitcoin (BTCUSD)</option>
            </select>
          </div>

          {/* Direction Buy/Sell */}
          <div>
            <label className="text-xs font-semibold text-secondary block mb-1.5" htmlFor="direction">
              Trade Direction
            </label>
            <select
              id="direction"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              <option value="buy">BUY / LONG (Profit on price rising)</option>
              <option value="sell">SELL / SHORT (Profit on price falling)</option>
            </select>
          </div>

          {/* Planned Lot Size */}
          <div>
            <label className="text-xs font-semibold text-secondary block mb-1.5" htmlFor="lot-size">
              Lot Size Suggestions
            </label>
            <input
              id="lot-size"
              type="number"
              step="0.01"
              value={lotSize || ''}
              onChange={(e) => setLotSize(parseFloat(e.target.value) || 0)}
              placeholder="e.g. 1.00"
            />
          </div>

          {/* Entry Price */}
          <div>
            <label className="text-xs font-semibold text-secondary block mb-1.5" htmlFor="entry-price">
              Position Entry Price
            </label>
            <input
              id="entry-price"
              type="number"
              step="0.0001"
              value={entryPrice || ''}
              onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
              placeholder="e.g. 1.0850"
            />
          </div>

          {/* Exit Target Price */}
          <div>
            <label className="text-xs font-semibold text-secondary block mb-1.5" htmlFor="exit-price">
              Position Target Exit Price
            </label>
            <input
              id="exit-price"
              type="number"
              step="0.0001"
              value={exitPrice || ''}
              onChange={(e) => setExitPrice(parseFloat(e.target.value) || 0)}
              placeholder="e.g. 1.0900"
            />
          </div>
        </section>

        {/* Right Side: Outputs */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-primary mb-2">2. Projections Summary</h2>

          {/* Calculated Profit Output */}
          <div className={`border p-5 rounded-[4px] ${
            grossProfit >= 0
              ? 'border-emerald-200 border-l-emerald-500 border-l-4 bg-emerald-50/30'
              : 'border-rose-200 border-l-rose-500 border-l-4 bg-rose-50/30'
          }`}>
            <span className="text-xs text-muted block mb-1">
              Estimated Transaction {grossProfit >= 0 ? 'Profit' : 'Loss'}
            </span>
            <span className={`text-3xl font-extrabold block ${
              grossProfit >= 0 ? 'text-emerald-800' : 'text-rose-800'
            }`}>
              {grossProfit >= 0 ? '+' : ''}${grossProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
            </span>
            <span className="text-xs text-secondary mt-1 block font-medium">
              Gross projection excluding commission spreads.
            </span>
          </div>

          {/* Pip Value output */}
          <div className="border border-border p-5 rounded-[4px] bg-surface">
            <span className="text-xs text-muted block mb-1">
              {instrument === 'btc' ? 'Net USD Shift' : 'Pips Captured'}
            </span>
            <span className="text-2xl font-bold text-primary block">
              {grossProfit >= 0 ? '+' : ''}
              {instrument === 'btc' ? `$${pipsGained.toLocaleString()}` : `${pipsGained} Pips`}
            </span>
            <span className="text-xs text-secondary mt-1 block">
              Asset price ratio movement: <strong>{grossProfit >= 0 ? '+' : ''}{percentageGain}%</strong>
            </span>
          </div>

          {/* Educational notice */}
          <div className="bg-surface border border-border p-4 rounded-[4px] text-[11px] text-muted leading-relaxed">
            <strong>Leveraged Trading Calculations Notice:</strong> <br />
            These figures represents raw valuation based on standard contract limits: 1 Lot Forex represents 100k units of base currency; 1 Lot Gold represents 100oz of physical metal. Real outcomes might vary due to broker spread changes or slippage during fast market triggers.
          </div>
        </section>
      </div>

      {/* Footer navigation */}
      <footer className="border-t border-border pt-6 flex justify-between items-center text-xs">
        <Link href="/tools" className="text-secondary no-underline hover:text-primary">&larr; Back to Tools</Link>
        <Link href="/tools/lot-size-calculator" className="text-accent no-underline hover:text-accent-dark">Open Lot Size Calculator &rarr;</Link>
      </footer>
    </article>
  );
}
