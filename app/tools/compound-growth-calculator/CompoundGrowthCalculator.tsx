'use client';

import { useState, useEffect } from 'react';

export default function CompoundGrowthCalculator() {
  const [startingBalance, setStartingBalance] = useState<number>(1000);
  const [monthlyGrowth, setMonthlyGrowth] = useState<number>(5);
  const [months, setMonths] = useState<number>(12);
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(0);

  const [finalBalance, setFinalBalance] = useState<number>(0);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [tableData, setTableData] = useState<{ month: number; balance: number; profit: number }[]>([]);

  useEffect(() => {
    let currentBalance = startingBalance;
    const data = [];
    let totalGain = 0;

    for (let i = 1; i <= months; i++) {
      const profit = currentBalance * (monthlyGrowth / 100);
      currentBalance += profit + monthlyDeposit;
      totalGain += profit;
      data.push({
        month: i,
        balance: Math.round(currentBalance * 100) / 100,
        profit: Math.round(profit * 100) / 100
      });
    }

    setFinalBalance(Math.round(currentBalance * 100) / 100);
    setTotalProfit(Math.round(totalGain * 100) / 100);
    setTableData(data.slice(0, 12)); // Only show first 12 months in the quick preview table
  }, [startingBalance, monthlyGrowth, months, monthlyDeposit]);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-primary mb-2">1. Growth Variables</h2>
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
          <label className="text-xs font-semibold text-secondary block mb-1.5">Expected Monthly Growth (%)</label>
          <input
            type="number"
            value={monthlyGrowth || ''}
            onChange={(e) => setMonthlyGrowth(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5">Duration (Months)</label>
          <input
            type="number"
            value={months || ''}
            onChange={(e) => setMonths(parseInt(e.target.value) || 0)}
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5">Monthly Deposit (Optional)</label>
          <input
            type="number"
            value={monthlyDeposit || ''}
            onChange={(e) => setMonthlyDeposit(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary text-sm"
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-lg font-bold text-primary mb-2">2. Projected Outcome</h2>
        <div className="border border-accent/20 border-l-accent border-l-4 p-5 rounded-[4px] bg-accent/5 text-center">
          <span className="text-xs text-accent font-semibold block mb-1 uppercase tracking-widest">Estimated Final Balance</span>
          <span className="text-4xl font-black text-primary block">${finalBalance.toLocaleString()}</span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="border border-border p-4 rounded-[4px] bg-surface">
            <span className="text-xs text-muted block mb-2 uppercase tracking-tighter font-bold">Monthly Breakdown (Year 1)</span>
            <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              <table className="w-full text-left text-[10px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-2 text-slate-400">Month</th>
                    <th className="py-2 text-slate-400">Profit</th>
                    <th className="py-2 text-slate-400">New Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.month} className="border-b border-slate-50">
                      <td className="py-2 font-bold text-slate-700">{row.month}</td>
                      <td className="py-2 text-emerald-600 font-medium">+${row.profit.toLocaleString()}</td>
                      <td className="py-2 text-slate-900 font-bold">${row.balance.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 p-4 rounded-[4px] border border-slate-100 text-[11px] text-slate-500 leading-relaxed italic">
          Compounding requires patience and consistency. Small monthly gains can lead to significant account growth over several years when you avoid large drawdowns.
        </div>
      </section>
    </div>
  );
}
