'use client';

// Improvement #13: "Build Your Fleet" page for enterprise customers

import { useState } from 'react';
import Link from 'next/link';

interface FleetRobot {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  category: string;
  useCase: string;
  qty: number;
}

const availableRobots: Omit<FleetRobot, 'qty'>[] = [
  { id: 'unitree-g1', name: 'Unitree G1', manufacturer: 'Unitree', price: 22000, category: 'Research', useCase: 'R&D, Education' },
  { id: 'unitree-h1', name: 'Unitree H1', manufacturer: 'Unitree', price: 90000, category: 'Enterprise', useCase: 'Industrial, Logistics' },
  { id: 'figure-02', name: 'Figure 02', manufacturer: 'Figure AI', price: 80000, category: 'Enterprise', useCase: 'Manufacturing' },
  { id: 'tesla-optimus-gen-2', name: 'Tesla Optimus Gen 2', manufacturer: 'Tesla', price: 30000, category: 'Enterprise', useCase: 'General Purpose' },
  { id: 'agility-digit', name: 'Agility Digit', manufacturer: 'Agility Robotics', price: 75000, category: 'Enterprise', useCase: 'Logistics' },
  { id: 'sanctuary-phoenix', name: 'Sanctuary AI Phoenix', manufacturer: 'Sanctuary AI', price: 100000, category: 'Enterprise', useCase: 'General Purpose' },
  { id: '1x-neo', name: '1X NEO', manufacturer: '1X Technologies', price: 30000, category: 'Consumer', useCase: 'Home, Hospitality' },
  { id: 'boston-dynamics-atlas', name: 'Boston Dynamics Atlas', manufacturer: 'Boston Dynamics', price: 250000, category: 'Enterprise', useCase: 'Heavy Industry' },
];

function fmt(n: number) {
  return n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });
}

export default function FleetBuilderPage() {
  const [fleet, setFleet] = useState<FleetRobot[]>([]);
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const addToFleet = (robot: Omit<FleetRobot, 'qty'>) => {
    setFleet(prev => {
      const existing = prev.find(r => r.id === robot.id);
      if (existing) {
        return prev.map(r => r.id === robot.id ? { ...r, qty: r.qty + 1 } : r);
      }
      return [...prev, { ...robot, qty: 1 }];
    });
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setFleet(prev => prev.filter(r => r.id !== id));
    } else {
      setFleet(prev => prev.map(r => r.id === id ? { ...r, qty } : r));
    }
  };

  const totalRobots = fleet.reduce((sum, r) => sum + r.qty, 0);
  const totalCost = fleet.reduce((sum, r) => sum + r.price * r.qty, 0);
  const volumeDiscount = totalRobots >= 10 ? 0.1 : totalRobots >= 5 ? 0.05 : 0;
  const discountedCost = totalCost * (1 - volumeDiscount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[Fleet Quote]', { companyName, email, fleet, notes, totalCost, discountedCost });
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Build Your Fleet</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Enterprise</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Build Your Robot Fleet</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Select robots, set quantities, and request a custom enterprise quote. Volume discounts available for 5+ units.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Robot catalog */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Available Robots</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableRobots.map(robot => (
              <div key={robot.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">{robot.manufacturer}</p>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">{robot.name}</h3>
                  </div>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-md">{robot.category}</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">{robot.useCase}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{fmt(robot.price)}</span>
                  <button
                    onClick={() => addToFleet(robot)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    + Add to Fleet
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet summary & quote form */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sticky top-20">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Your Fleet ({totalRobots} units)</h2>

            {fleet.length === 0 ? (
              <p className="text-sm text-gray-400 py-8 text-center">Add robots to your fleet to get started</p>
            ) : (
              <div className="space-y-3 mb-6">
                {fleet.map(robot => (
                  <div key={robot.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{robot.name}</p>
                      <p className="text-xs text-gray-400">{fmt(robot.price)} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(robot.id, robot.qty - 1)} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 rounded border border-gray-200 dark:border-gray-700 text-xs">−</button>
                      <span className="text-sm font-semibold w-6 text-center text-gray-900 dark:text-white">{robot.qty}</span>
                      <button onClick={() => updateQty(robot.id, robot.qty + 1)} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-blue-500 rounded border border-gray-200 dark:border-gray-700 text-xs">+</button>
                    </div>
                  </div>
                ))}

                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{fmt(totalCost)}</span>
                  </div>
                  {volumeDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-600">Volume discount ({(volumeDiscount * 100).toFixed(0)}%)</span>
                      <span className="font-semibold text-emerald-600">−{fmt(totalCost * volumeDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="font-bold text-gray-900 dark:text-white">Estimated Total</span>
                    <span className="font-bold text-blue-600">{fmt(discountedCost)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quote request form */}
            {fleet.length > 0 && !submitted && (
              <form onSubmit={handleSubmit} className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <input
                  type="text" required placeholder="Company Name" value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <input
                  type="email" required placeholder="Work Email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <textarea
                  placeholder="Additional notes (optional)" value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                  rows={3}
                />
                <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors">
                  Request Fleet Quote →
                </button>
              </form>
            )}

            {submitted && (
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 text-center">
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">✓ Quote requested!</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">We&apos;ll contact you within 1-2 business days.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
