import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund Policy — RoboNorth',
  description: 'Refund process, timelines, and partial refund information for RoboNorth purchases.',
  alternates: { canonical: 'https://robonorth.ca/refund-policy' },
};

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Refund Policy</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Refund Policy</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10">Last updated: January 2026</p>

      <div className="space-y-8">
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">💰 Full Refunds</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">You are entitled to a full refund when:</p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span>The item is returned within 30 days in original condition</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span>The robot was delivered with a defect or damage</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span>The item received differs from what was ordered</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span>A pre-order is cancelled before the robot ships</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Partial Refunds</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">A partial refund may apply when:</p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-amber-500">→</span>Custom-configured robots — 85% refund (15% restocking fee)</li>
            <li className="flex items-start gap-2"><span className="text-amber-500">→</span>Missing original packaging — up to 10% deduction</li>
            <li className="flex items-start gap-2"><span className="text-amber-500">→</span>Activated software licences — software cost deducted</li>
            <li className="flex items-start gap-2"><span className="text-amber-500">→</span>Signs of use beyond normal testing — assessed case by case</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">⏱️ Refund Timeline</h2>
          <div className="space-y-3">
            {[
              { step: 'Return received & inspected', time: '1-2 business days' },
              { step: 'Refund approved', time: '1-2 business days after inspection' },
              { step: 'Refund processed', time: '3-5 business days' },
              { step: 'Appears on your statement', time: '5-10 business days (varies by bank)' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">{i + 1}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{s.step}</p>
                  <p className="text-xs text-gray-500">{s.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">💳 Refund Methods</h2>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>• <strong>Credit/Debit Card:</strong> Refunded to original payment method</li>
            <li>• <strong>Wire Transfer:</strong> Refunded to originating bank account</li>
            <li>• <strong>Invoice (Enterprise):</strong> Credit note issued or refund to company account</li>
            <li>• <strong>Store Credit:</strong> Available as an alternative — receives 5% bonus</li>
          </ul>
        </section>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">Questions about a refund? Call <a href="tel:+15873250017" className="text-blue-600 font-semibold hover:underline">+1 (587) 325-0017</a> or email <a href="mailto:refunds@robonorth.ca" className="text-blue-600 font-semibold hover:underline">refunds@robonorth.ca</a></p>
        </div>
      </div>
    </div>
  );
}
