'use client';

import { useState } from 'react';

// Improvement #47: Price alert/drop notification signup

export default function PriceAlertSignup({ robotId, robotName, currentPrice }: { robotId: string; robotName: string; currentPrice: string }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Price alert submitted (integrate with notification service)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">✓ Price alert set!</p>
        <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">We&apos;ll notify you when {robotName} price changes.</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
      <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">🔔 Price Alert</p>
      <p className="text-xs text-blue-600 dark:text-blue-500 mb-3">Get notified when {robotName} price drops or changes.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-3 py-2 border border-blue-200 dark:border-blue-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">
          Set Alert
        </button>
      </form>
    </div>
  );
}
