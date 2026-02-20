import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Trade-In Program — Upgrade Your Robot | RoboNorth',
  description: 'Trade your old robot for credit toward a new one. Get a fair valuation and upgrade to the latest humanoid robots.',
  alternates: { canonical: 'https://robonorth.ca/trade-in' },
};

export default function TradeInPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link><span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Trade-In Program</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">🔄 Upgrade</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Trade In Your Old Robot</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Get credit toward a new robot when you trade in your current one. Fair market valuation, hassle-free process.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { step: '1', icon: '📋', title: 'Describe Your Robot', desc: 'Tell us the make, model, condition, and age' },
          { step: '2', icon: '💰', title: 'Get a Valuation', desc: 'We provide a fair market trade-in value within 24h' },
          { step: '3', icon: '🤖', title: 'Upgrade', desc: 'Apply credit toward any new robot in our catalogue' },
        ].map(s => (
          <div key={s.step} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-center">
            <span className="text-3xl">{s.icon}</span>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-3 mb-1">{s.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-10">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Request a Trade-In Valuation</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Your Name *" required className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            <input type="email" placeholder="Email *" required className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Robot Make & Model *" required className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            <select className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <option value="">Condition</option>
              <option value="excellent">Excellent — Like new</option>
              <option value="good">Good — Normal wear</option>
              <option value="fair">Fair — Some issues</option>
              <option value="poor">Poor — Needs repair</option>
            </select>
          </div>
          <textarea rows={3} placeholder="Describe your robot: age, hours of operation, modifications, accessories included..." className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none" />
          <input type="text" placeholder="What new robot are you interested in?" className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm">
            Request Trade-In Valuation
          </button>
        </form>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Questions about trade-ins?</p>
        <a href="tel:+15873250017" className="text-sm font-semibold text-blue-600 hover:underline">Call +1 (587) 325-0017</a>
      </div>
    </div>
  );
}
