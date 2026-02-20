'use client';

// Improvement #12: ROI Calculator page for enterprise robots

import { useState } from 'react';
import Link from 'next/link';

const robotModels = [
  { name: 'Unitree G1 (Research)', cost: 22000, hourlyCapacity: 0.7, maintenanceYear: 2000 },
  { name: 'Unitree H1 (Industrial)', cost: 90000, hourlyCapacity: 0.85, maintenanceYear: 5000 },
  { name: 'Figure 02 (Enterprise)', cost: 80000, hourlyCapacity: 0.9, maintenanceYear: 8000 },
  { name: 'Tesla Optimus Gen 2', cost: 30000, hourlyCapacity: 0.8, maintenanceYear: 3000 },
  { name: 'Agility Digit (Logistics)', cost: 75000, hourlyCapacity: 0.85, maintenanceYear: 6000 },
  { name: 'Sanctuary AI Phoenix', cost: 100000, hourlyCapacity: 0.9, maintenanceYear: 10000 },
];

function fmt(n: number) {
  return n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });
}

export default function ROICalculatorPage() {
  const [model, setModel] = useState(0);
  const [numRobots, setNumRobots] = useState(1);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [labourCost, setLabourCost] = useState(25);
  const [yearsAnalysis, setYearsAnalysis] = useState(3);

  const robot = robotModels[model];
  const annualHours = hoursPerDay * daysPerWeek * 52;
  const annualLabourCost = annualHours * labourCost * numRobots;
  const totalRobotCost = robot.cost * numRobots;
  const totalMaintenance = robot.maintenanceYear * numRobots * yearsAnalysis;
  const totalRobotTCO = totalRobotCost + totalMaintenance;
  const totalLabourCost = annualLabourCost * yearsAnalysis;
  const totalSavings = totalLabourCost - totalRobotTCO;
  const breakEvenMonths = totalRobotCost / (annualLabourCost / 12 - robot.maintenanceYear * numRobots / 12);
  const roi = ((totalSavings / totalRobotTCO) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">ROI Calculator</span>
      </nav>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Enterprise Tool</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Robot ROI Calculator
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Calculate the return on investment for deploying humanoid robots in your operation.
            Input your labor costs and see projected savings over time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Configuration</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Robot Model</label>
              <select
                value={model}
                onChange={(e) => setModel(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
              >
                {robotModels.map((r, i) => (
                  <option key={i} value={i}>{r.name} — {fmt(r.cost)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Robots: {numRobots}
              </label>
              <input type="range" min={1} max={20} value={numRobots} onChange={(e) => setNumRobots(Number(e.target.value))}
                className="w-full accent-blue-600" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hours per Day: {hoursPerDay}
              </label>
              <input type="range" min={1} max={24} value={hoursPerDay} onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="w-full accent-blue-600" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Days per Week: {daysPerWeek}
              </label>
              <input type="range" min={1} max={7} value={daysPerWeek} onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                className="w-full accent-blue-600" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Equivalent Labour Cost (CAD/hr): ${labourCost}
              </label>
              <input type="range" min={15} max={75} step={1} value={labourCost} onChange={(e) => setLabourCost(Number(e.target.value))}
                className="w-full accent-blue-600" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Analysis Period: {yearsAnalysis} years
              </label>
              <input type="range" min={1} max={10} value={yearsAnalysis} onChange={(e) => setYearsAnalysis(Number(e.target.value))}
                className="w-full accent-blue-600" />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Total Robot Cost</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{fmt(totalRobotTCO)}</p>
                <p className="text-[10px] text-gray-400">{fmt(totalRobotCost)} hardware + {fmt(totalMaintenance)} maintenance</p>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Labour Equivalent</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{fmt(totalLabourCost)}</p>
                <p className="text-[10px] text-gray-400">{annualHours.toLocaleString()} hrs/yr × {numRobots} workers</p>
              </div>
              <div className={`border rounded-xl p-4 text-center ${totalSavings > 0 ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800' : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'}`}>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Net Savings</p>
                <p className={`text-xl font-bold ${totalSavings > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  {fmt(totalSavings)}
                </p>
                <p className="text-[10px] text-gray-400">over {yearsAnalysis} years</p>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">ROI</p>
                <p className={`text-xl font-bold ${roi > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  {roi > 0 ? '+' : ''}{roi.toFixed(0)}%
                </p>
                <p className="text-[10px] text-gray-400">
                  Break-even: ~{breakEvenMonths > 0 && breakEvenMonths < 999 ? `${Math.ceil(breakEvenMonths)} months` : 'N/A'}
                </p>
              </div>
            </div>

            {/* Year-by-year breakdown */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Year-by-Year Breakdown</h3>
              <div className="space-y-3">
                {Array.from({ length: yearsAnalysis }, (_, i) => {
                  const yearCost = i === 0 ? totalRobotCost + robot.maintenanceYear * numRobots : robot.maintenanceYear * numRobots;
                  const yearSaving = annualLabourCost;
                  const yearNet = yearSaving - yearCost;
                  const cumulative = annualLabourCost * (i + 1) - totalRobotCost - robot.maintenanceYear * numRobots * (i + 1);
                  return (
                    <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Year {i + 1}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400 text-xs">Cost: {fmt(yearCost)}</span>
                        <span className={`font-semibold ${yearNet > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                          {yearNet > 0 ? '+' : ''}{fmt(yearNet)}
                        </span>
                        <span className={`text-xs ${cumulative > 0 ? 'text-emerald-500' : 'text-gray-400'}`}>
                          (Cum: {fmt(cumulative)})
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 text-center">
              <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
                Want a detailed analysis for your specific operation?
              </p>
              <Link
                href="/inquiry?type=enterprise"
                className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Request Enterprise Consultation →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
