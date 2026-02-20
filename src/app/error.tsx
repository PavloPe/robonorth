'use client';

// Improvement #32: Proper error boundaries with retry buttons

import { useEffect, useState } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    // Log error for monitoring
    console.error('[RoboNorth Error]', {
      message: error.message,
      digest: error.digest,
      retryCount,
      timestamp: new Date().toISOString(),
    });
  }, [error, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    reset();
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Error illustration */}
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-3xl flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
          {/* Animated ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 border-2 border-red-200 dark:border-red-800 rounded-3xl animate-pulse" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Something went wrong</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm leading-relaxed">
          An unexpected error occurred while loading this page. 
          {retryCount > 0 && ` (Retry ${retryCount}/${maxRetries})`}
        </p>

        {error.digest && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-6 font-mono bg-gray-50 dark:bg-gray-900 rounded-lg px-3 py-2 inline-block border border-gray-200 dark:border-gray-700">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {retryCount < maxRetries ? (
            <button
              onClick={handleRetry}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M8 16H3v5" />
              </svg>
              Try Again
            </button>
          ) : (
            <button
              onClick={handleReload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
            >
              Reload Page
            </button>
          )}
          <a
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium rounded-xl transition-all"
          >
            Go Home
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm font-medium transition-colors"
          >
            Report Issue
          </a>
        </div>

        {retryCount >= maxRetries && (
          <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
            Multiple retries failed. This may be a server issue. Try again in a few minutes or{' '}
            <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact support</a>.
          </p>
        )}
      </div>
    </div>
  );
}
