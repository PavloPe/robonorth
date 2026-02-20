'use client';

// Task 30: Cross-border comparison component
export default function CrossBorderComparison() {
  return (
    <section className="bg-gradient-to-br from-red-50 to-white dark:from-red-900/10 dark:to-gray-900 border border-red-200/50 dark:border-red-900/30 rounded-2xl p-6 sm:p-8">
      <div className="text-center mb-6">
        <p className="text-sm font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">🇨🇦 Why Buy Canadian?</p>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Buy from RoboNorth vs. Import Yourself</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* RoboNorth */}
        <div className="bg-white dark:bg-gray-900 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🇨🇦</span>
            <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Buy Through RoboNorth</h3>
          </div>
          <ul className="space-y-2.5">
            {[
              'Pay in Canadian dollars — no exchange risk',
              'CUSMA duty savings applied automatically',
              'Customs clearance handled for you',
              'Canadian warranty & return policy',
              'Local phone support: (587) 325-0017',
              'Cold-weather packaging included',
              'Installation & training available',
              'GST/HST invoice for tax deductions',
            ].map(item => (
              <li key={item} className="text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5 shrink-0">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Self-import */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🌍</span>
            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400">Import Yourself</h3>
          </div>
          <ul className="space-y-2.5">
            {[
              'Pay in USD — subject to exchange rate fluctuations',
              'Navigate CUSMA paperwork yourself',
              'Hire customs broker ($500-2,000+)',
              'Manufacturer warranty — may not cover Canada',
              'International support — timezone challenges',
              'Standard packaging — no cold protection',
              'Self-install or fly in a technician',
              'Complex import documentation for CRA',
            ].map(item => (
              <li key={item} className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-2">
                <span className="text-red-400 mt-0.5 shrink-0">✗</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 text-center">
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
          💰 Estimated savings when buying through RoboNorth: <span className="text-lg">$2,000 - $15,000+</span> per robot
        </p>
        <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">Including duty savings, brokerage fees, exchange rate protection, and warranty coverage</p>
      </div>
    </section>
  );
}
