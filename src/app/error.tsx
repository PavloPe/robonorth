"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
          ⚠️
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong</h1>
        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
          An unexpected error occurred. This has been logged and we&apos;ll look into it.
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400 mb-4 font-mono bg-gray-50 rounded-lg px-3 py-2 inline-block">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
          >
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium rounded-xl transition-all"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
