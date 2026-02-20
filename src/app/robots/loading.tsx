import { SkeletonRobotCard } from '@/components/ui/SkeletonCard';

export default function RobotsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8" role="status" aria-label="Loading robots page">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-3 w-16 skeleton mb-2" />
        <div className="h-8 w-72 skeleton mb-2" />
        <div className="h-4 w-96 skeleton" />
      </div>

      <div className="flex gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block w-64 shrink-0 space-y-6">
          <div className="space-y-4">
            <div className="h-10 skeleton rounded-xl" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-8 skeleton" />
              ))}
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-800" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-8 skeleton" />
              ))}
            </div>
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/80 dark:border-gray-700/80">
            <div className="h-5 w-20 skeleton" />
            <div className="h-9 w-36 skeleton rounded-xl" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonRobotCard key={i} />
            ))}
          </div>
        </div>
      </div>
      <span className="sr-only">Loading robots catalog...</span>
    </div>
  );
}
