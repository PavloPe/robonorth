import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Return Policy — RoboNorth',
  description: '30-day return policy for humanoid robots purchased through RoboNorth. Conditions, process, and exceptions.',
  alternates: { canonical: 'https://robonorth.ca/return-policy' },
};

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Return Policy</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Return Policy</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10">Last updated: January 2026</p>

      <div className="space-y-8">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 text-center">
          <p className="text-3xl mb-2">🔄</p>
          <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-1">30-Day Return Guarantee</h2>
          <p className="text-sm text-emerald-700 dark:text-emerald-400">Not satisfied? Return within 30 days for a full refund.</p>
        </div>

        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Eligibility</h2>
          <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span>Items must be returned within 30 days of delivery</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span>Robot must be in original condition with all accessories and packaging</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span>All original documentation must be included</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span>Must not show signs of physical damage beyond normal unboxing</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Exceptions</h2>
          <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">⚠️</span>Custom-configured robots may be subject to a 15% restocking fee</li>
            <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">⚠️</span>Software licenses activated on a robot are non-refundable</li>
            <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">⚠️</span>Pre-order deposits are refundable until the robot ships</li>
            <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">⚠️</span>Parts and components have a 14-day return window</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Return Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Contact Us', desc: 'Email returns@robonorth.ca or call +1 (587) 325-0017' },
              { step: '2', title: 'Get RMA Number', desc: 'We\'ll issue a Return Merchandise Authorization within 24h' },
              { step: '3', title: 'Ship Item', desc: 'Pack securely, use provided shipping label. Insurance included.' },
              { step: '4', title: 'Receive Refund', desc: 'Refund processed within 5-7 business days of inspection' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 mx-auto mb-2">{s.step}</div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{s.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">Need to initiate a return? Call <a href="tel:+15873250017" className="text-blue-600 font-semibold hover:underline">+1 (587) 325-0017</a> or email <a href="mailto:returns@robonorth.ca" className="text-blue-600 font-semibold hover:underline">returns@robonorth.ca</a></p>
        </div>
      </div>
    </div>
  );
}
