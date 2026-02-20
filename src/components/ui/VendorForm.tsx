'use client';

import { useState } from 'react';

export default function VendorForm() {
  const [formData, setFormData] = useState({
    companyName: '', website: '', contactName: '', email: '', phone: '',
    products: '', country: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          city: formData.country,
          robot: 'VENDOR_INQUIRY',
          message: `Vendor Application\nCompany: ${formData.companyName}\nWebsite: ${formData.website}\nProducts: ${formData.products}\n\n${formData.message}`,
        }),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-2">Application Received!</h2>
        <p className="text-sm text-emerald-700 dark:text-emerald-400">Our partnerships team will review your application and respond within 48 hours.</p>
      </div>
    );
  }

  const inputClass = 'w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm';

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Vendor Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Company Name *</label>
            <input type="text" required value={formData.companyName} onChange={e => setFormData(p => ({ ...p, companyName: e.target.value }))} className={inputClass} placeholder="Your company" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Website</label>
            <input type="url" value={formData.website} onChange={e => setFormData(p => ({ ...p, website: e.target.value }))} className={inputClass} placeholder="https://example.com" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Contact Name *</label>
            <input type="text" required value={formData.contactName} onChange={e => setFormData(p => ({ ...p, contactName: e.target.value }))} className={inputClass} placeholder="Jane Smith" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
            <input type="email" required value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className={inputClass} placeholder="jane@company.com" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
            <input type="tel" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} className={inputClass} placeholder="+1 (555) 000-0000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Country *</label>
            <select required value={formData.country} onChange={e => setFormData(p => ({ ...p, country: e.target.value }))} className={inputClass}>
              <option value="">Select country</option>
              <option value="Canada">Canada</option>
              <option value="United States">United States</option>
              <option value="China">China</option>
              <option value="Japan">Japan</option>
              <option value="South Korea">South Korea</option>
              <option value="Germany">Germany</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Products You Want to Sell *</label>
          <textarea required rows={3} value={formData.products} onChange={e => setFormData(p => ({ ...p, products: e.target.value }))} className={`${inputClass} resize-none`} placeholder="Describe your robots, parts, or components..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Additional Notes</label>
          <textarea rows={2} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} className={`${inputClass} resize-none`} placeholder="Anything else we should know?" />
        </div>
        <button type="submit" disabled={status === 'loading'} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 text-sm">
          {status === 'loading' ? 'Submitting...' : 'Submit Vendor Application'}
        </button>
        {status === 'error' && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>}
      </form>
    </div>
  );
}
