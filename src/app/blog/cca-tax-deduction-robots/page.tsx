import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import SocialShareButtons from '@/components/ui/SocialShareButtons';

export const metadata: Metadata = {
  title: 'How to Write Off Your Robot Purchase: Capital Cost Allowance for Canadian Businesses',
  description: 'Complete guide to claiming CCA tax deductions on humanoid robot purchases in Canada. Class 53 manufacturing equipment, Class 50 computers, and more.',
  alternates: { canonical: 'https://robonorth.ca/blog/cca-tax-deduction-robots' },
};

export default function CCABlogPost() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">CCA Tax Deduction</span>
      </nav>

      <header className="mb-10">
        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">💰 Tax Guide</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">How to Write Off Your Robot Purchase: Capital Cost Allowance for Canadian Businesses</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>By RoboNorth Team</span>
          <span>•</span>
          <span>January 2026</span>
          <span>•</span>
          <span>10 min read</span>
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 not-prose mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Key Takeaway</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">Canadian businesses can deduct the cost of humanoid robots from their taxable income through Capital Cost Allowance (CCA). Depending on the robot&apos;s classification, you may be able to write off <strong>30-100% of the cost</strong> in the first year.</p>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">What Is Capital Cost Allowance (CCA)?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Capital Cost Allowance is the Canadian tax mechanism that allows businesses to deduct the cost of capital assets (like machinery and equipment) over time. When you purchase a humanoid robot for business use, the cost is typically deductible through CCA.</p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">Which CCA Class Applies to Robots?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Humanoid robots can fall under several CCA classes depending on their primary use:</p>

        <div className="not-prose space-y-4 mb-8">
          {[
            { cls: 'Class 53', rate: '50%', desc: 'Manufacturing and processing equipment', note: 'Most common for industrial humanoid robots used in manufacturing. Eligible for Accelerated Investment Incentive (up to 100% first year).', applies: 'Factory robots, assembly robots, QA robots' },
            { cls: 'Class 50', rate: '55%', desc: 'General-purpose electronic data-processing equipment', note: 'Applies when the robot is primarily a computer/AI system. High depreciation rate.', applies: 'Research robots, AI platforms, companion robots' },
            { cls: 'Class 8', rate: '20%', desc: 'Miscellaneous tangible capital property', note: 'Catch-all for equipment that doesn\'t fit other classes. Standard depreciation.', applies: 'Service robots, hospitality robots' },
            { cls: 'Class 12', rate: '100%', desc: 'Software and tools under $500', note: 'Robot software licences may qualify for immediate write-off.', applies: 'Software subscriptions, API licences' },
          ].map(c => (
            <div key={c.cls} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{c.cls} — {c.desc}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Applies to: {c.applies}</p>
                </div>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400 shrink-0">{c.rate}/yr</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{c.note}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">Accelerated Investment Incentive</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">The federal Accelerated Investment Incentive allows businesses to deduct a larger portion of the cost in the year the asset becomes available for use:</p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1.5 mb-6">
          <li><strong>Manufacturing equipment (Class 53):</strong> Up to 100% immediate expensing if acquired after April 19, 2021</li>
          <li><strong>Clean energy equipment (Class 43.1/43.2):</strong> Enhanced first-year allowance for energy-efficient robots</li>
          <li><strong>General equipment:</strong> 1.5x the normal CCA rate in the first year</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">Example: Buying a $50,000 Robot</h2>
        <div className="not-prose bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-8">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">A manufacturing company in Ontario purchases a humanoid robot for $50,000 CAD (Class 53, 50% rate, with Accelerated Investment Incentive):</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Year</th>
                <th className="text-right py-2 font-semibold text-gray-700 dark:text-gray-300">CCA Deduction</th>
                <th className="text-right py-2 font-semibold text-gray-700 dark:text-gray-300">Tax Savings (26.5%)</th>
                <th className="text-right py-2 font-semibold text-gray-700 dark:text-gray-300">Remaining UCC</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-300">
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-2">Year 1</td>
                <td className="text-right py-2 font-semibold text-emerald-600">$50,000*</td>
                <td className="text-right py-2 font-semibold text-emerald-600">$13,250</td>
                <td className="text-right py-2">$0</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">*With 100% immediate expensing for manufacturing equipment. Tax savings based on combined federal + Ontario corporate rate of 26.5%.</p>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">Combined with SR&ED Credits</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">If you&apos;re developing custom applications or integrating robots in innovative ways, the SR&ED (Scientific Research and Experimental Development) tax credit can provide an <strong>additional 15-35% credit</strong> on qualifying R&D expenditures. This can stack with CCA deductions.</p>

        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8">
          <p className="text-sm text-amber-700 dark:text-amber-400"><strong>⚠️ Important:</strong> This guide is for informational purposes only. Consult a qualified Canadian accountant or tax professional for advice specific to your situation.</p>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">RoboNorth Can Help</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">When you purchase a robot through RoboNorth, we provide:</p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1.5 mb-8">
          <li>Proper invoicing with CCA-compatible documentation</li>
          <li>HS code classification for customs and tax purposes</li>
          <li>Guidance on which CCA class may apply to your purchase</li>
          <li>Connection to robotics-savvy Canadian accountants</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center mt-10">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Ready to invest in robotics for your business?</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Our team can help you understand the total cost of ownership including tax benefits.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/robots" size="sm">Browse Robots</Button>
          <a href="tel:+15873250017" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">📞 (587) 325-0017</a>
        </div>
      </div>

      {/* Social share — Task 49 */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
        <SocialShareButtons title="How to Write Off Your Robot Purchase: CCA Guide" />
      </div>
    </article>
  );
}
