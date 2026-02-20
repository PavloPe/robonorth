'use client';

import { useState } from 'react';

interface FinancingCalculatorProps {
  priceMin: number;
  robotName: string;
}

const USD_TO_CAD = 1.38;

export default function FinancingCalculator({ priceMin, robotName }: FinancingCalculatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [term, setTerm] = useState(36);
  const [rate, setRate] = useState(5.9);

  if (priceMin <= 0) return null;

  const priceCAD = priceMin * USD_TO_CAD;
  const monthlyRate = rate / 100 / 12;
  const monthlyPayment = monthlyRate > 0
    ? (priceCAD * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1)
    : priceCAD / term;
  const totalCost = monthlyPayment * term;
  const totalInterest = totalCost - priceCAD;

  const fmt = (n: number) => `$${Math.round(n).toLocaleString('en-CA')}`;

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1.5"
      >
        💳 Financing from {fmt(Math.round(priceCAD / 48))}/mo
        <svg className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Financing Calculator — {robotName}</h4>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Term (months)</label>
              <select value={term} onChange={e => setTerm(Number(e.target.value))} className="w-full mt-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
                <option value={12}>12 months</option>
                <option value={24}>24 months</option>
                <option value={36}>36 months</option>
                <option value={48}>48 months</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400">Interest Rate</label>
              <select value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full mt-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
                <option value={4.9}>4.9%</option>
                <option value={5.9}>5.9%</option>
                <option value={6.9}>6.9%</option>
                <option value={7.9}>7.9%</option>
                <option value={0}>0% (promo)</option>
              </select>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Robot Price (CAD)</span>
              <span className="font-semibold text-gray-900 dark:text-white">{fmt(priceCAD)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Monthly Payment</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">{fmt(monthlyPayment)}/mo</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Total Interest</span>
              <span className="text-gray-600 dark:text-gray-300">{fmt(totalInterest)}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-gray-100 dark:border-gray-800 pt-2">
              <span className="text-gray-500 dark:text-gray-400">Total Cost</span>
              <span className="font-semibold text-gray-900 dark:text-white">{fmt(totalCost)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            * Estimates only. Rates and terms subject to credit approval. <a href="/financing" className="text-blue-600 dark:text-blue-400">Learn more →</a>
          </p>
        </div>
      )}
    </div>
  );
}
