"use client";

export default function RobotsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5">
          🤖
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to load robots</h2>
        <p className="text-gray-500 mb-6 text-sm">
          We couldn&apos;t load the robot catalog. Please try again.
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400 mb-4 font-mono">Error: {error.digest}</p>
        )}
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
