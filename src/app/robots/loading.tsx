export default function RobotsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-3 w-16 bg-blue-100 rounded mb-2 animate-pulse" />
        <div className="h-8 w-72 bg-slate-100 rounded-lg animate-pulse mb-2" />
        <div className="h-4 w-96 bg-slate-100 rounded animate-pulse" />
      </div>

      <div className="flex gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block w-64 shrink-0 space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-slate-100 rounded-xl" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-8 bg-slate-100 rounded-lg" />
              ))}
            </div>
            <div className="h-px bg-gray-200" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-8 bg-slate-100 rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/80">
            <div className="h-5 w-20 bg-slate-100 rounded animate-pulse" />
            <div className="h-9 w-36 bg-slate-100 rounded-xl animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-slate-100" />
                <div className="p-4 space-y-2">
                  <div className="h-3 w-20 bg-slate-100 rounded" />
                  <div className="h-5 w-40 bg-slate-100 rounded" />
                  <div className="h-3 w-full bg-slate-100 rounded" />
                  <div className="h-3 w-2/3 bg-slate-100 rounded" />
                  <div className="pt-3 border-t border-gray-100 flex justify-between mt-2">
                    <div className="h-4 w-24 bg-slate-100 rounded" />
                    <div className="h-4 w-16 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
