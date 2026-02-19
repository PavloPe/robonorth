export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-3xl p-10 sm:p-14 mb-16 animate-pulse">
        <div className="max-w-3xl">
          <div className="h-6 w-64 bg-slate-200 rounded-full mb-6" />
          <div className="h-12 w-full max-w-xl bg-slate-200 rounded-xl mb-4" />
          <div className="h-12 w-80 bg-slate-200 rounded-xl mb-6" />
          <div className="h-5 w-full max-w-lg bg-slate-200 rounded-lg mb-10" />
          <div className="flex gap-3">
            <div className="h-12 w-40 bg-slate-200 rounded-xl" />
            <div className="h-12 w-36 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-slate-100" />
      <div className="p-4">
        <div className="h-3 w-20 bg-slate-100 rounded mb-2" />
        <div className="h-5 w-40 bg-slate-100 rounded mb-2" />
        <div className="h-3 w-full bg-slate-100 rounded mb-1.5" />
        <div className="h-3 w-2/3 bg-slate-100 rounded mb-4" />
        <div className="pt-3 border-t border-gray-100 flex justify-between">
          <div className="h-4 w-24 bg-slate-100 rounded" />
          <div className="h-4 w-16 bg-slate-100 rounded" />
        </div>
      </div>
    </div>
  );
}
