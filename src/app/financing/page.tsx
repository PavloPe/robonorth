import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Robot Leasing & Financing — Flexible Payment Options',
  description: 'Explore leasing, financing, and Robot-as-a-Service (RaaS) options for humanoid robots in Canada. Make robotics accessible with flexible payment plans.',
  alternates: { canonical: 'https://robonorth.ca/financing' },
};

export default function FinancingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Financing</span>
      </nav>

      <div className="mb-10">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Payment Options</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Robot Leasing & Financing</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
          Humanoid robots are a significant investment. Here are the financing options available to Canadian businesses, from outright purchase to Robot-as-a-Service.
        </p>
      </div>

      {/* Options comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          {
            title: 'Purchase',
            icon: '💳',
            priceNote: 'Full upfront cost',
            pros: ['Full ownership', 'No monthly fees', 'Best long-term value', 'Eligible for CCA tax deduction'],
            cons: ['Large upfront capital', 'Maintenance responsibility', 'Technology depreciation risk'],
            bestFor: 'Businesses with capital budget and long-term deployment plans.',
          },
          {
            title: 'Lease',
            icon: '📋',
            priceNote: '$500–$15,000 CAD/month',
            pros: ['Lower upfront cost', 'Predictable monthly expense', 'Option to buy at end', 'Operating expense (tax-deductible)'],
            cons: ['Total cost may exceed purchase', 'Contractual commitment', 'Return conditions apply'],
            bestFor: 'Businesses wanting to preserve capital with an option to buy.',
            featured: true,
          },
          {
            title: 'Robot-as-a-Service',
            icon: '☁️',
            priceNote: '$5,000–$15,000 CAD/month',
            pros: ['No upfront cost', 'Includes maintenance & updates', 'Easy to scale up/down', 'Lowest risk commitment'],
            cons: ['Highest monthly cost', 'No ownership', 'Vendor lock-in risk'],
            bestFor: 'Pilot programs, seasonal needs, and risk-averse organizations.',
          },
        ].map(opt => (
          <div key={opt.title} className={`bg-white dark:bg-gray-900 border rounded-2xl p-6 ${opt.featured ? 'border-blue-300 dark:border-blue-700 ring-2 ring-blue-100 dark:ring-blue-900/50' : 'border-gray-200 dark:border-gray-700'}`}>
            {opt.featured && <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-3 uppercase tracking-wider">Most Popular</div>}
            <div className="text-3xl mb-3">{opt.icon}</div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{opt.title}</h2>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">{opt.priceNote}</p>
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Advantages</h3>
              <ul className="space-y-1.5">
                {opt.pros.map(pro => (
                  <li key={pro} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <span className="text-emerald-500">✓</span> {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Considerations</h3>
              <ul className="space-y-1.5">
                {opt.cons.map(con => (
                  <li key={con} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="text-amber-500">•</span> {con}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-800">
              <strong className="text-gray-700 dark:text-gray-300">Best for:</strong> {opt.bestFor}
            </p>
          </div>
        ))}
      </div>

      {/* Canadian-specific info */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Canadian Tax Benefits</h2>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'Capital Cost Allowance (CCA)', desc: 'Humanoid robots may qualify for CCA Class 53 (50% declining balance) or accelerated first-year deduction under the Accelerated Investment Incentive. Consult your accountant for classification.' },
              { title: 'SR&ED Tax Credits', desc: 'If you\'re using robots for R&D, the Scientific Research and Experimental Development program offers 15–35% tax credits on eligible expenditures. One of the most generous R&D incentives in the world.' },
              { title: 'Provincial Grants', desc: 'Many provinces offer manufacturing modernization grants. Ontario\'s Advanced Manufacturing Fund, Quebec\'s Productivité Innovation, and Alberta\'s Innovation Fund may apply to robot deployments.' },
              { title: 'BDC Financing', desc: 'The Business Development Bank of Canada offers loans specifically for technology adoption by SMEs. Favourable rates for automation equipment including humanoid robots.' },
            ].map(item => (
              <div key={item.title}>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="text-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 p-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Need help with financing?</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          We can connect you with our financing partners and help you find the best option for your situation.
        </p>
        <Link href="/contact?subject=buying" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors">
          Get Financing Advice →
        </Link>
      </div>
    </div>
  );
}
