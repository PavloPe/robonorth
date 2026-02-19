import type { Metadata } from 'next';
import InquiryForm from '@/components/ui/InquiryForm';

export const metadata: Metadata = {
  title: 'Get Early Access',
  description: 'Be among the first in Canada to own a humanoid robot. Submit your inquiry and our team will connect you with the right manufacturer.',
};

export default function InquiryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-3">Get Early Access</h1>
          <p className="text-gray-400 text-lg mb-8">
            Be among the first in Canada to own a humanoid robot. No payment required.
          </p>
          <InquiryForm />
        </div>

        {/* Side panel */}
        <div className="lg:pl-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">What happens next?</h2>
            <div className="space-y-6">
              {[
                { step: '1', title: 'Submit your inquiry', desc: 'Tell us what robot you\'re interested in and where you are in Canada.' },
                { step: '2', title: 'We review your needs', desc: 'Our team analyzes your requirements and identifies the best options.' },
                { step: '3', title: 'Get connected', desc: 'We connect you with the right manufacturer, dealer, or distributor.' },
                { step: '4', title: 'Secure your robot', desc: 'Get pricing, availability, and pre-order your humanoid robot.' },
              ].map(item => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 text-sm font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <h3 className="text-sm font-semibold text-white mb-3">Trust signals</h3>
              <div className="space-y-2">
                {['No payment required', 'Canadian support team', 'All major manufacturers', 'Secure & private'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-green-400">✓</span> {t}
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
