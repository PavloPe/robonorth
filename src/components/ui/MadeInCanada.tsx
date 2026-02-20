'use client';

import Link from 'next/link';

// Task 22: Made in Canada section highlighting Canadian robotics companies
const canadianCompanies = [
  { name: 'Sanctuary AI', city: 'Vancouver, BC', desc: 'Phoenix — general-purpose humanoid robot', link: '/manufacturers/sanctuary-ai', flag: true },
  { name: 'Kinova Robotics', city: 'Montréal, QC', desc: 'Collaborative robotic arms for research & healthcare', link: '/robotics-in-quebec', flag: true },
  { name: 'Clearpath / OTTO Motors', city: 'Kitchener, ON', desc: 'Autonomous mobile robots for industry', link: '/robotics-in-ontario', flag: true },
  { name: 'MDA Space', city: 'Brampton, ON', desc: 'Canadarm — space robotics pioneer', link: '/robotics-in-ontario', flag: true },
];

export default function MadeInCanada() {
  return (
    <section className="bg-gradient-to-br from-red-50/50 to-white dark:from-red-900/10 dark:to-gray-900/50 border-y border-red-100/50 dark:border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-full px-4 py-2 mb-3">
            <span className="text-lg">🇨🇦</span>
            <span className="text-sm font-bold text-red-700 dark:text-red-400">Made in Canada</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Canadian Robotics Leaders</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-lg mx-auto">Proudly showcasing world-class robotics companies built right here in Canada</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {canadianCompanies.map(company => (
            <Link key={company.name} href={company.link} className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-red-200 dark:hover:border-red-800 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">{company.name}</h3>
                {company.flag && <span className="text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded font-bold">🇨🇦</span>}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">📍 {company.city}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{company.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
