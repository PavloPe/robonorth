import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign In — RoboNorth',
  description: 'Sign in to your RoboNorth account to track orders, sync your wishlist, and get price alerts.',
};

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">👤</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign In</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Access your RoboNorth account</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
            <input type="email" className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" placeholder="you@company.ca" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
            <input type="password" className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" placeholder="••••••••" />
          </div>
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm">
            Sign In
          </button>
        </div>

        <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-center">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">🚧 Coming Soon</p>
          <p className="text-xs text-amber-600 dark:text-amber-400/80">Account features are launching in Q3 2026. For now, orders are tracked via email.</p>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Don&apos;t have an account? <Link href="/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Create one</Link>
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 text-center">Account Benefits</h3>
        <div className="space-y-3">
          {[
            { icon: '📦', title: 'Order Tracking', desc: 'Track your orders and view order history' },
            { icon: '❤️', title: 'Wishlist Sync', desc: 'Save favourites across all your devices' },
            { icon: '🔔', title: 'Price Alerts', desc: 'Get notified when prices drop on watched robots' },
            { icon: '⚡', title: 'Faster Checkout', desc: 'Save your info for quicker repeat orders' },
          ].map(b => (
            <div key={b.title} className="flex items-start gap-3">
              <span className="text-lg">{b.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{b.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
