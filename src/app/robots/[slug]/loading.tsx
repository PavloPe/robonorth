export default function RobotDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex gap-2 mb-8">
        <div className="h-4 w-12 bg-slate-100 rounded" />
        <div className="h-4 w-4 bg-slate-100 rounded" />
        <div className="h-4 w-16 bg-slate-100 rounded" />
        <div className="h-4 w-4 bg-slate-100 rounded" />
        <div className="h-4 w-32 bg-slate-100 rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
        {/* Image skeleton */}
        <div className="aspect-square bg-slate-100 rounded-3xl" />

        {/* Details skeleton */}
        <div className="flex flex-col justify-center space-y-4">
          <div className="h-3 w-24 bg-blue-100 rounded" />
          <div className="h-10 w-64 bg-slate-100 rounded-lg" />
          <div className="flex gap-2">
            <div className="h-7 w-20 bg-slate-100 rounded-lg" />
            <div className="h-7 w-32 bg-slate-100 rounded-lg" />
          </div>
          <div className="h-8 w-48 bg-slate-100 rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="h-4 w-3/4 bg-slate-100 rounded" />
          </div>
          <div className="flex gap-3 pt-4">
            <div className="h-12 w-36 bg-slate-100 rounded-xl" />
            <div className="h-12 w-28 bg-slate-100 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Specs skeleton */}
      <div className="mb-16">
        <div className="h-3 w-16 bg-blue-100 rounded mb-2" />
        <div className="h-7 w-40 bg-slate-100 rounded-lg mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <div className="h-4 w-24 bg-slate-100 rounded" />
                  <div className="h-4 w-16 bg-slate-100 rounded" />
                </div>
                <div className="h-2 bg-slate-100 rounded-full" />
              </div>
            ))}
          </div>
          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between py-3.5 border-b border-gray-100 last:border-0">
                <div className="h-4 w-20 bg-slate-100 rounded" />
                <div className="h-4 w-32 bg-slate-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
