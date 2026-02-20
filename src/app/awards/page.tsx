import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Canadian Robotics Awards 2026 — Nominations Open | RoboNorth',
  description: 'The inaugural Canadian Robotics Awards celebrating innovation, value, design, and impact in humanoid robotics. Nominations now open.',
  alternates: { canonical: 'https://robonorth.ca/awards' },
};

const categories = [
  { name: '🏆 Innovation Award', desc: 'Most innovative humanoid robot technology introduced to the Canadian market in 2026.', criteria: 'Novel capabilities, unique approach, technological breakthrough' },
  { name: '💰 Best Value Award', desc: 'Best price-to-performance ratio for Canadian buyers.', criteria: 'Affordability, capability per dollar, TCO efficiency' },
  { name: '🎨 Design Excellence', desc: 'Best industrial design, UX, and human-robot interaction design.', criteria: 'Aesthetics, ergonomics, intuitive interface, user experience' },
  { name: '🌍 Community Impact', desc: 'Robot or robotics company making the biggest positive impact on Canadian communities.', criteria: 'Social benefit, accessibility, community engagement, sustainability' },
];

export default function AwardsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link><span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Canadian Robotics Awards</span>
      </nav>

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-full px-5 py-2 mb-4">
          <span className="text-lg">🏆</span>
          <span className="text-sm font-bold text-amber-700 dark:text-amber-400">Nominations Open</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Canadian Robotics Awards 2026</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">The inaugural awards celebrating excellence in humanoid robotics for the Canadian market. Presented by RoboNorth.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {categories.map(cat => (
          <div key={cat.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{cat.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{cat.desc}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400"><strong>Criteria:</strong> {cat.criteria}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-10">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Submit a Nomination</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Your Name *" required className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            <input type="email" placeholder="Email *" required className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <select className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option value="">Select Category *</option>
            {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
          <input type="text" placeholder="Robot or Company Name *" required className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          <textarea rows={4} placeholder="Why does this nominee deserve the award? *" required className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none" />
          <button type="submit" className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-colors text-sm">🏆 Submit Nomination</button>
        </form>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          <strong>Timeline:</strong> Nominations close October 31, 2026. Winners announced at the Canadian Robotics Summit in December 2026.
        </p>
      </div>
    </div>
  );
}
