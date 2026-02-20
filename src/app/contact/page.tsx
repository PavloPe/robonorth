import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us — Get in Touch',
  description: 'Contact RoboNorth for humanoid robot inquiries, partnership opportunities, or media requests. Based in Alberta, Canada — serving all provinces.',
  alternates: { canonical: 'https://robonorth.ca/contact' },
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Contact</span>
      </nav>

      <div className="mb-10">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Get in Touch</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Contact RoboNorth</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
          Questions about humanoid robots? Need help choosing the right model? Want to partner with us? We&apos;re here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h2>
          <ContactForm />
        </div>

        {/* Contact Info & Map */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Other ways to reach us</h2>
          <div className="space-y-6 mb-8">
            {[
              { icon: '📧', label: 'Email', value: 'hello@robonorth.ca', href: 'mailto:hello@robonorth.ca' },
              { icon: '📍', label: 'Location', value: 'Calgary, Alberta, Canada', href: undefined },
              { icon: '🕐', label: 'Response Time', value: 'Within 1–2 business days', href: undefined },
              { icon: '🌐', label: 'Social', value: '@robonorth', href: undefined },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">{item.value}</a>
                  ) : (
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-64 flex items-center justify-center border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <span className="text-4xl">🗺️</span>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Calgary, Alberta, Canada</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Map integration coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
