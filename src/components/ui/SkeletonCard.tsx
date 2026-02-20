/**
 * Skeleton loading state for robot cards and other data-heavy components.
 * Used as placeholders while data loads.
 */
export function SkeletonRobotCard() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 overflow-hidden" aria-hidden="true">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-24 skeleton" />
        <div className="h-4 w-40 skeleton" />
        <div className="h-3 w-full skeleton" />
        <div className="h-3 w-3/4 skeleton" />
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="h-4 w-28 skeleton" />
          <div className="h-4 w-16 skeleton" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonRobotGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="status" aria-label="Loading robots">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonRobotCard key={i} />
      ))}
      <span className="sr-only">Loading robots...</span>
    </div>
  );
}

export function SkeletonDetailPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-pulse" aria-hidden="true">
      <div className="h-4 w-48 skeleton mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div className="aspect-[4/3] skeleton rounded-2xl" />
        <div className="space-y-4 py-4">
          <div className="h-3 w-32 skeleton" />
          <div className="h-8 w-64 skeleton" />
          <div className="h-5 w-24 skeleton rounded-full" />
          <div className="h-6 w-48 skeleton" />
          <div className="space-y-2">
            <div className="h-3 w-full skeleton" />
            <div className="h-3 w-full skeleton" />
            <div className="h-3 w-3/4 skeleton" />
          </div>
          <div className="flex gap-3 pt-4">
            <div className="h-10 w-32 skeleton rounded-xl" />
            <div className="h-10 w-32 skeleton rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonText({ width = 'w-full', height = 'h-3' }: { width?: string; height?: string }) {
  return <div className={`${width} ${height} skeleton`} aria-hidden="true" />;
}
