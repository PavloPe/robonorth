import type { Metadata } from 'next';
import InquiryForm from '@/components/ui/InquiryForm';

export const metadata: Metadata = {
  title: 'Get Early Access — Pre-Order Humanoid Robots',
  description: 'Be among the first in Canada to own a humanoid robot. Submit your inquiry and our team will connect you with the right manufacturer. No payment required.',
  openGraph: {
    title: 'Get Early Access to Humanoid Robots | RoboNorth',
    description: 'Submit your inquiry. No payment required. We\'ll connect you with the right manufacturer.',
    url: 'https://robonorth.ca/inquiry',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Get Early Access — RoboNorth' }],
  },
  alternates: {
    canonical: 'https://robonorth.ca/inquiry',
  },
};

export default function InquiryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Early Access</h1>
          <p className="text-gray-500 mb-8">
            Be among the first in Canada to own a humanoid robot. No payment required.
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <InquiryForm />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-5">How it works</h2>
            <div className="space-y-5">
              {[
                { step: '1', title: 'Submit your inquiry', desc: 'Tell us what robot you\'re interested in and where you are in Canada.' },
                { step: '2', title: 'We review your needs', desc: 'Our team analyzes your requirements and identifies the best options.' },
                { step: '3', title: 'Get connected', desc: 'We connect you with the right manufacturer, dealer, or distributor.' },
                { step: '4', title: 'Secure your robot', desc: 'Get pricing, availability, and pre-order your humanoid robot.' },
              ].map(item => (
                <div key={item.step} className="flex gap-3">
                  <div className="w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-gray-200">
              <div className="space-y-2">
                {['No payment required', 'Canadian support team', 'All major brands', 'Secure & private'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="text-green-500">✓</span> {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
