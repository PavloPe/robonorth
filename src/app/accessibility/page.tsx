import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accessibility Statement — WCAG 2.1 AA | RoboNorth',
  description: 'RoboNorth\'s accessibility commitment and WCAG 2.1 AA compliance details. Learn about our accessibility features and how to request accommodations.',
  alternates: { canonical: 'https://robonorth.ca/accessibility' },
};

export default function AccessibilityPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Accessibility</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">♿ Accessibility Statement</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: February 2026</p>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Commitment</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            RoboNorth is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Conformance Status</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We aim to conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>. These guidelines explain how to make web content more accessible to people with a wide array of disabilities.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Accessibility Features</h2>
          <ul className="space-y-2">
            {[
              'Semantic HTML5 markup throughout the site',
              'Skip-to-content link for keyboard navigation',
              'ARIA labels on interactive elements',
              'High contrast colour ratios (minimum 4.5:1)',
              'Dark mode support for light sensitivity',
              'Responsive design from mobile to desktop',
              'Keyboard-navigable forms and interactive components',
              'Alt text for informational images',
              'Focus indicators on all interactive elements',
              'Proper heading hierarchy (h1 → h2 → h3)',
              'Form labels associated with inputs',
              'Error messages that are descriptive and visible',
            ].map(feature => (
              <li key={feature} className="text-gray-600 dark:text-gray-300 flex items-start gap-2">
                <span className="text-emerald-500 mt-1">✓</span> {feature}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Known Limitations</h2>
          <ul className="space-y-2">
            {[
              'Some third-party embedded content (YouTube videos) may have limited accessibility controls',
              'Dynamically generated comparison charts may not be fully screen-reader accessible',
              'Some decorative emoji may not be marked as presentational in all contexts',
            ].map(limitation => (
              <li key={limitation} className="text-gray-600 dark:text-gray-300 flex items-start gap-2">
                <span className="text-amber-500 mt-1">⚠</span> {limitation}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Feedback</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We welcome your feedback on the accessibility of RoboNorth. If you encounter any accessibility barriers, please let us know:
          </p>
          <ul className="mt-3 space-y-1 text-gray-600 dark:text-gray-300">
            <li>📧 Email: <Link href="/contact" className="text-blue-600 dark:text-blue-400 font-semibold">Contact Form</Link></li>
            <li>⏱ Response time: We aim to respond within 2 business days</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Applicable Standards</h2>
          <ul className="space-y-1 text-gray-600 dark:text-gray-300">
            <li>• WCAG 2.1 Level AA</li>
            <li>• Accessibility for Ontarians with Disabilities Act (AODA)</li>
            <li>• Accessible Canada Act (ACA)</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
