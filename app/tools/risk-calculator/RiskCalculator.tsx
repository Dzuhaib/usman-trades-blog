'use client';

import { useState, useEffect } from 'react';

export default function RiskCalculator() {
  const [balance, setBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [entryPrice, setEntryPrice] = useState<number>(1.0850);
  const [stopPrice, setStopPrice] = useState<number>(1.0820);
  const [instrument, setInstrument] = useState<string>('forex-usd'); // forex-usd, gold, btc

  const [riskAmount, setRiskAmount] = useState<number>(100);
  const [priceDistance, setPriceDistance] = useState<number>(0.0030);
  const [pipDistance, setPipDistance] = useState<number>(30);
  const [suggestedLots, setSuggestedLots] = useState<number>(0.33);
  const [error, setError] = useState<string | null>(null);

  // Auto-set reasonable entries/stops on instrument changes
  useEffect(() => {
    if (instrument === 'forex-usd') {
      setEntryPrice(1.0850);
      setStopPrice(1.0820);
    } else if (instrument === 'gold') {
      setEntryPrice(2350.00);
      setStopPrice(2340.00);
    } else if (instrument === 'btc') {
      setEntryPrice(65000.00);
      setStopPrice(64000.00);
    }
  }, [instrument]);

  // Perform instant calculations
  useEffect(() => {
    setError(null);

    if (balance <= 0) {
      setError('Account balance must be greater than 0.');
      setRiskAmount(0);
      setPriceDistance(0);
      setPipDistance(0);
      setSuggestedLots(0);
      return;
    }
    if (riskPercent <= 0 || riskPercent > 100) {
      setError('Risk percentage must be between 0.1% and 100%.');
      setRiskAmount(0);
      setPriceDistance(0);
      setPipDistance(0);
      setSuggestedLots(0);
      return;
    }
    if (entryPrice <= 0 || stopPrice <= 0) {
      setError('Entry and Stop prices must be greater than 0.');
      setRiskAmount(0);
      setPriceDistance(0);
      setPipDistance(0);
      setSuggestedLots(0);
      return;
    }
    if (entryPrice === stopPrice) {
      setError('Entry price and Stop price cannot be identical.');
      setRiskAmount(0);
      setPriceDistance(0);
      setPipDistance(0);
      setSuggestedLots(0);
      return;
    }

    const computedRiskAmount = balance * (riskPercent / 100);
    setRiskAmount(computedRiskAmount);

    const distance = Math.abs(entryPrice - stopPrice);
    setPriceDistance(distance);

    let calculatedPips = 0;
    let calculatedLots = 0;

    if (instrument === 'forex-usd') {
      // 1 pip in 4-digit decimal = 0.0001
      calculatedPips = Math.round(distance / 0.0001 * 10) / 10;
      // Lot size = Risk Amount / (Pips * $10 per standard lot)
      calculatedLots = computedRiskAmount / (calculatedPips * 10);
    } else if (instrument === 'gold') {
      // Gold 1 pip = $0.10 price change
      calculatedPips = Math.round(distance / 0.1 * 10) / 10;
      // Lot size = Risk Amount / (Pips * $10 per standard lot)
      calculatedLots = computedRiskAmount / (calculatedPips * 10);
    } else if (instrument === 'btc') {
      // Bitcoin has no standard pips, we use absolute price distance
      calculatedPips = Math.round(distance * 100) / 100;
      // Suggested position size in whole units = Risk Amount / Price Distance
      calculatedLots = computedRiskAmount / distance;
    }

    setPipDistance(calculatedPips);
    setSuggestedLots(Math.max(0, Math.round(calculatedLots * 100) / 100));
  }, [balance, riskPercent, entryPrice, stopPrice, instrument]);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Left Side: Form */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-primary mb-2">1. Trade Entry Details</h2>

        {/* Account Balance */}
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5" htmlFor="balance">
            Account Balance (USD)
          </label>
          <input
            id="balance"
            type="number"
            value={balance || ''}
            onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
            placeholder="e.g. 10000"
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary"
          />
        </div>

        {/* Risk Percent */}
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5" htmlFor="risk-percent">
            Desired Risk Percentage (%)
          </label>
          <input
            id="risk-percent"
            type="number"
            step="0.1"
            value={riskPercent || ''}
            onChange={(e) => setRiskPercent(parseFloat(e.target.value) || 0)}
            placeholder="e.g. 1"
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary"
          />
        </div>

        {/* Asset Selector */}
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5" htmlFor="instrument">
            Trading Asset
          </label>
          <select
            id="instrument"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary"
          >
            <option value="forex-usd">Forex (EURUSD, GBPUSD etc.)</option>
            <option value="gold">Gold (XAUUSD)</option>
            <option value="btc">Bitcoin (BTCUSD)</option>
          </select>
        </div>

        {/* Entry Price */}
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5" htmlFor="entry-price">
            Planned Entry Price
          </label>
          <input
            id="entry-price"
            type="number"
            step="0.0001"
            value={entryPrice || ''}
            onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
            placeholder="e.g. 1.0850"
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary"
          />
        </div>

        {/* Stop Loss Price */}
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5" htmlFor="stop-price">
            Planned Stop Loss Price
          </label>
          <input
            id="stop-price"
            type="number"
            step="0.0001"
            value={stopPrice || ''}
            onChange={(e) => setStopPrice(parseFloat(e.target.value) || 0)}
            placeholder="e.g. 1.0820"
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary"
          />
        </div>
      </section>

      {/* Right Side: Outputs */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-primary mb-2">2. Risk Exposure Summary</h2>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-[4px] text-xs font-medium animate-pulse">
            ⚠️ {error}
          </div>
        )}

        {/* Risk Target */}
        <div className="border border-border p-5 rounded-[4px] bg-surface">
          <span className="text-xs text-muted block mb-1">Total Capital at Risk</span>
          <span className="text-2xl font-bold text-primary block">${riskAmount.toFixed(2)} USD</span>
          <span className="text-xs text-secondary mt-1 block">Exactly {riskPercent}% of account balance.</span>
        </div>

        {/* Pip distance */}
        <div className="border border-border p-5 rounded-[4px] bg-surface">
          <span className="text-xs text-muted block mb-1">
            {instrument === 'btc' ? 'USD Invalidation Span' : 'Stop Loss Distance'}
          </span>
          <span className="text-2xl font-bold text-primary block">
            {instrument === 'btc' ? `$${pipDistance.toLocaleString()}` : `${pipDistance} Pips`}
          </span>
          <span className="text-xs text-secondary mt-1 block">
            Absolute price distance: <strong>{priceDistance.toFixed(instrument === 'forex-usd' ? 4 : 2)}</strong>
          </span>
        </div>

        {/* Suggested Sizing */}
        <div className="border border-accent/20 border-l-accent border-l-4 p-5 rounded-[4px] bg-accent/5">
          <span className="text-xs text-accent font-semibold block mb-1">Suggested Capital Allocation</span>
          <span className="text-3xl font-extrabold text-primary block">
            {suggestedLots} {instrument === 'btc' ? 'BTC Units' : 'Lots'}
          </span>
          <span className="text-xs text-secondary mt-1 block">
            Execute exactly {suggestedLots} lots to ensure hits to stop loss limit loss strictly to <strong>${riskAmount.toFixed(2)}</strong>.
          </span>
        </div>
      </section>
    </div>
  );
}
