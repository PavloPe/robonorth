'use client';

import { useState } from 'react';

interface ThreeDViewerPlaceholderProps {
  robotName: string;
}

export default function ThreeDViewerPlaceholder({ robotName }: ThreeDViewerPlaceholderProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log('[RoboNorth] 3D viewer interest:', { robotName, email });
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="mb-16">
      <div className="mb-4">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">3D View</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">View in 3D</h2>
      </div>
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">🧊</div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">3D Model Coming Soon</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-4">
          We&apos;re building interactive 3D models for every robot. Get notified when the {robotName} 3D viewer is ready.
        </p>
        {submitted ? (
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">✓ We&apos;ll notify you when it&apos;s ready!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-xs mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg">
              Notify Me
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
