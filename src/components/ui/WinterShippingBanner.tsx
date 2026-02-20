'use client';

import { useState, useEffect } from 'react';

// Task 29: Weather-adjusted shipping banner (shows Oct-Apr)
export default function WinterShippingBanner() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const month = new Date().getMonth(); // 0-based
    // Show October (9) through April (3)
    const isWinter = month >= 9 || month <= 3;
    const wasDismissed = sessionStorage.getItem('winter-banner-dismissed');
    setShow(isWinter && !wasDismissed);
  }, []);

  if (!show || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <p className="text-xs sm:text-sm font-medium flex items-center gap-2">
          <span>❄️</span>
          <span>Winter shipping: All robots shipped with cold-weather packaging at no extra charge. Canadian winters won&apos;t damage your investment.</span>
        </p>
        <button
          onClick={() => { setDismissed(true); sessionStorage.setItem('winter-banner-dismissed', '1'); }}
          className="text-white/70 hover:text-white p-1 shrink-0"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
