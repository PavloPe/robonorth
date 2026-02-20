import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Orders — RoboNorth',
  description: 'Track your robot orders and view order history.',
};

export default function OrdersPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📦</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Orders</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Track your orders and view purchase history</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-6">Sign in to view your orders and track shipments.</p>

        <div className="max-w-sm mx-auto space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
            <input type="email" className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" placeholder="you@company.ca" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Order Reference</label>
            <input type="text" className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" placeholder="RN-XXXXXXXX" />
          </div>
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm">
            Track Order
          </button>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">🚧 Full tracking coming soon</p>
          <p className="text-xs text-amber-600 dark:text-amber-400/80">Account-based order tracking is launching Q3 2026. For immediate help, contact our team.</p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Need help with an existing order? Call <a href="tel:+15873250017" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">+1 (587) 325-0017</a>
        </p>
      </div>
    </div>
  );
}
