'use client';

import { useState } from 'react';
import { useInquiryBasket } from './InquiryBasketProvider';
import Link from 'next/link';

const cities = [
  'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton', 'Ottawa',
  'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener', 'London', 'Victoria',
  'Halifax', 'Saskatoon', 'Regina', "St. John's", 'Kelowna', 'Barrie',
  'Windsor', 'Oshawa', 'Other',
];

export default function BasketInquiryForm() {
  const { items, updateQuantity, removeItem, clearBasket, itemCount } = useInquiryBasket();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', city: '',
    message: '', contactMethod: 'email', _hp: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [refNumber, setRefNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/inquiry/basket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: items.map(i => ({
            itemType: i.itemType,
            itemId: i.itemId,
            itemName: i.itemName,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRefNumber(data.referenceNumber || '');
        setStatus('success');
        clearBasket();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">Inquiry Submitted!</h2>
        {refNumber && (
          <p className="text-green-700 dark:text-green-300 mb-2">
            Reference: <span className="font-mono font-bold">{refNumber}</span>
          </p>
        )}
        <p className="text-green-600 dark:text-green-400 text-sm mb-6">
          Our team will review your inquiry and get back to you within 24 hours.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/robots" className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors">
            Browse Robots
          </Link>
          <Link href="/parts" className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-400 text-sm font-semibold rounded-xl transition-colors hover:bg-green-50 dark:hover:bg-gray-700">
            Browse Parts
          </Link>
        </div>
      </div>
    );
  }

  const inputClass = 'w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm';
  const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Items section */}
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 sticky top-24">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>📋</span> Your Items ({itemCount})
          </h2>
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">No items in your basket</p>
              <Link href="/parts" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                Browse Parts →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.itemId} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded uppercase font-medium">
                        {item.itemType}
                      </span>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1 line-clamp-2">{item.itemName}</p>
                      {item.price && <p className="text-xs text-gray-500 dark:text-gray-400">{item.price}</p>}
                    </div>
                    <button onClick={() => removeItem(item.itemId)} className="text-gray-400 hover:text-red-500 p-1 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded" aria-label={`Remove ${item.itemName} from basket`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Qty:</span>
                    <select
                      value={item.quantity}
                      onChange={e => updateQuantity(item.itemId, parseInt(e.target.value))}
                      className="text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 text-gray-700 dark:text-gray-300"
                    >
                      {[1, 2, 3, 4, 5, 10, 25, 50, 100].map(q => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="lg:col-span-3">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5">Contact Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className={labelClass}>Full Name *</label>
                <input id="name" type="text" required value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={inputClass} placeholder="John Smith" />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email *</label>
                <input id="email" type="email" required value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={inputClass} placeholder="john@example.com" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className={labelClass}>Phone <span className="text-gray-500 dark:text-gray-400 font-normal">(optional)</span></label>
                <input id="phone" type="tel" value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className={inputClass} placeholder="+1 (403) 555-0123" />
              </div>
              <div>
                <label htmlFor="company" className={labelClass}>Company <span className="text-gray-500 dark:text-gray-400 font-normal">(optional)</span></label>
                <input id="company" type="text" value={formData.company}
                  onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className={inputClass} placeholder="Company name" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className={labelClass}>City / Province *</label>
                <select id="city" required value={formData.city}
                  onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className={inputClass}>
                  <option value="">Select city</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="contactMethod" className={labelClass}>Preferred Contact</label>
                <select id="contactMethod" value={formData.contactMethod}
                  onChange={e => setFormData(prev => ({ ...prev, contactMethod: e.target.value }))}
                  className={inputClass}>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="either">Either</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className={labelClass}>Message / Notes <span className="text-gray-500 dark:text-gray-400 font-normal">(optional)</span></label>
              <textarea id="message" rows={4} value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className={`${inputClass} resize-none`} placeholder="Any specific requirements, questions, or notes for our team..." />
            </div>
            {/* Honeypot */}
            <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
              <input type="text" name="_hp" autoComplete="off" tabIndex={-1}
                value={formData._hp || ''}
                onChange={e => setFormData(prev => ({ ...prev, _hp: e.target.value }))} />
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || items.length === 0}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all disabled:opacity-50 text-sm shadow-sm shadow-blue-600/20"
            >
              {status === 'loading' ? 'Submitting...' : `Submit Inquiry (${itemCount} ${itemCount === 1 ? 'item' : 'items'})`}
            </button>
            {status === 'error' && (
              <p className="text-red-600 dark:text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
            )}

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              {['No payment required', 'Response within 24h', 'Secure & private'].map(t => (
                <span key={t} className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <span className="text-green-500">✓</span> {t}
                </span>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
