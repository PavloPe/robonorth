import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Affiliate Program — Earn 3-5% Commission | RoboNorth',
  description: 'Earn commission referring robot buyers to RoboNorth. 3-5% on every sale, 90-day cookie, monthly payouts.',
  alternates: { canonical: 'https://robonorth.ca/affiliates' },
};

export default function AffiliatesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link><span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Affiliate Program</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">💸 Earn Commission</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">RoboNorth Affiliate Program</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Earn 3-5% commission on every robot sale you refer. With robots priced $5,000-$150,000+, that&apos;s serious earning potential.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {[
          { icon: '💰', stat: '3-5%', label: 'Commission rate' },
          { icon: '🍪', stat: '90 days', label: 'Cookie duration' },
          { icon: '📅', stat: 'Monthly', label: 'Payouts via Interac/wire' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-center">
            <span className="text-2xl">{s.icon}</span>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">{s.stat}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 mb-10 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Example: Refer a single Unitree G1 sale ($16,000 USD)</p>
        <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">Earn up to $800 CAD</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-10">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { step: '1', title: 'Apply', desc: 'Fill out the form below. Approved within 48h.' },
            { step: '2', title: 'Share', desc: 'Get your unique referral link and marketing materials.' },
            { step: '3', title: 'Earn', desc: 'When someone buys through your link, you earn commission.' },
            { step: '4', title: 'Get Paid', desc: 'Monthly payouts via Interac e-Transfer or wire.' },
          ].map(s => (
            <div key={s.step} className="text-center">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 mx-auto mb-2">{s.step}</div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{s.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Apply to Become an Affiliate</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name *" required className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            <input type="email" placeholder="Email *" required className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>
          <input type="url" placeholder="Website or Social Profile" className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          <textarea rows={3} placeholder="How will you promote RoboNorth?" className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" />
          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm">
            Apply Now
          </button>
        </form>
      </div>
    </div>
  );
}
