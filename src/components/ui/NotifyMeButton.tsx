'use client';

import { useState } from 'react';

export default function NotifyMeButton({ robotName, robotId }: { robotName: string; robotId: string }) {
  const [state, setState] = useState<'idle' | 'form' | 'success'>('idle');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    // Track event
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'notify_me', robot: robotId, email_domain: email.split('@')[1] });
    }
    // Notify-me request submitted (integrate with notification service)
    setState('success');
  };

  if (state === 'success') {
    return (
      <div className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-semibold rounded-xl">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        We&apos;ll notify you!
      </div>
    );
  }

  if (state === 'form') {
    return (
      <form onSubmit={handleSubmit} className="inline-flex items-center gap-2">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
          autoFocus
          aria-label={`Email to get notified about ${robotName}`}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Notify Me
        </button>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Cancel"
        >
          ✕
        </button>
      </form>
    );
  }

  return (
    <button
      onClick={() => setState('form')}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-sm font-semibold rounded-xl border border-amber-200 dark:border-amber-800 transition-colors"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
      Notify Me When Available
    </button>
  );
}
