export default function ManufacturersLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-pulse">
      <div className="mb-8">
        <div className="h-3 w-16 bg-blue-100 rounded mb-2" />
        <div className="h-8 w-48 bg-slate-100 rounded-lg mb-2" />
        <div className="h-4 w-80 bg-slate-100 rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200/80 p-6">
            <div className="flex justify-between mb-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl" />
              <div className="h-6 w-16 bg-slate-100 rounded-lg" />
            </div>
            <div className="h-5 w-36 bg-slate-100 rounded mb-2" />
            <div className="h-3 w-28 bg-slate-100 rounded mb-3" />
            <div className="h-3 w-full bg-slate-100 rounded mb-1.5" />
            <div className="h-3 w-2/3 bg-slate-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
