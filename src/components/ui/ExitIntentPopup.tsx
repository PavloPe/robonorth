'use client';

import { useState, useEffect } from 'react';

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed or subscribed
    const dismissed = sessionStorage.getItem('robonorth-exit-dismissed');
    if (dismissed) return;

    const handler = (e: MouseEvent) => {
      // Trigger when mouse leaves viewport from the top
      if (e.clientY <= 5) {
        setShow(true);
        document.removeEventListener('mouseout', handler);
      }
    };

    // Only add after 30 seconds on page
    const timer = setTimeout(() => {
      document.addEventListener('mouseout', handler);
    }, 30000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseout', handler);
    };
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem('robonorth-exit-dismissed', '1');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'exit_intent_signup', email_domain: email.split('@')[1] });
    }
    console.log('[RoboNorth] Exit intent signup:', email);
    setSubmitted(true);
    setTimeout(handleClose, 2000);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={handleClose}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 text-center">
          <div className="text-4xl mb-4">🤖</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Wait! Don&apos;t miss out</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Join 2,800+ Canadians getting early access to new robots, exclusive pricing, and industry insights.
          </p>

          {submitted ? (
            <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4">
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">✓ You&apos;re in! Check your inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Get Early Access — It&apos;s Free
              </button>
              <p className="text-xs text-gray-400">No spam. Unsubscribe anytime.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
