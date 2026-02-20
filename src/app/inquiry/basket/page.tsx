import type { Metadata } from 'next';
import BasketInquiryForm from '@/components/ui/BasketInquiryForm';

export const metadata: Metadata = {
  title: 'Submit Inquiry — Get a Quote',
  description: 'Submit your inquiry for humanoid robots and parts. Our team will provide pricing, availability, and shipping details for Canada.',
};

export default function BasketInquiryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Quote Request</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Submit Your Inquiry</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Review your selected items and provide your contact details. Our team will respond within 24 hours with pricing and availability.
        </p>
      </div>

      <BasketInquiryForm />
    </div>
  );
}
