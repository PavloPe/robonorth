'use client';

export default function FleetDiscount() {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">🏢 Fleet & Bulk Discounts</h4>
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">1 unit</span>
          <span className="text-gray-900 dark:text-white font-medium">List price</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">3+ units</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">5% off</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">5+ units</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">10% off</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">10+ units</span>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">Custom quote</span>
        </div>
      </div>
      <a href="/inquiry?type=fleet" className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-2 block hover:text-blue-700">
        Request fleet pricing →
      </a>
    </div>
  );
}
