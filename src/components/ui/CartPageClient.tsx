'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useInquiryBasket } from './InquiryBasketProvider';
import ProvincialTaxCalculator from './ProvincialTaxCalculator';
import ShippingEstimatorWidget from './ShippingEstimatorWidget';
import PaymentMethodsBadges from './PaymentMethodsBadges';

const cities = [
  'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton', 'Ottawa',
  'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener', 'London', 'Victoria',
  'Halifax', 'Saskatoon', 'Regina', "St. John's", 'Kelowna', 'Barrie',
  'Windsor', 'Oshawa', 'Other',
];

type Step = 'cart' | 'info' | 'review';

export default function CartPageClient() {
  const { items, updateQuantity, removeItem, clearBasket, itemCount } = useInquiryBasket();
  const [step, setStep] = useState<Step>('cart');
  const [province, setProvince] = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', city: '',
    message: '', contactMethod: 'email', _hp: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [refNumber, setRefNumber] = useState('');

  const handleSubmit = async () => {
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
        setRefNumber(data.referenceNumber || `RN-${Date.now().toString(36).toUpperCase()}`);
        setStatus('success');
        clearBasket();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass = 'w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm';
  const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5';

  // Order confirmation (Task 5)
  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-10 text-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Submitted Successfully!</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Thank you for your order. We&apos;ll be in touch shortly.</p>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6 text-left">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Order Reference</span>
              <span className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">{refNumber}</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Confirmation email sent</p>
                  <p className="text-gray-500 dark:text-gray-400">Check your inbox for order details</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Team notified</p>
                  <p className="text-gray-500 dark:text-gray-400">Our sales team will review within 2-4 business hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-500 mt-0.5">→</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Next steps</p>
                  <p className="text-gray-500 dark:text-gray-400">We&apos;ll contact you with pricing confirmation, shipping timeline, and payment options</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-700 dark:text-blue-400">
              📞 Questions? Call us at <a href="tel:+15873250017" className="font-semibold underline">+1 (587) 325-0017</a> — Mon-Fri 9am-6pm MT
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/robots" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
              Continue Shopping
            </Link>
            <Link href="/orders" className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Track Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Progress steps */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {(['cart', 'info', 'review'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => { if (i <= (['cart', 'info', 'review'] as Step[]).indexOf(step)) setStep(s); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                step === s
                  ? 'bg-blue-600 text-white'
                  : i < (['cart', 'info', 'review'] as Step[]).indexOf(step)
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 cursor-pointer'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[10px] font-bold">
                {i + 1}
              </span>
              {s === 'cart' ? 'Cart' : s === 'info' ? 'Your Info' : 'Review'}
            </button>
            {i < 2 && (
              <svg className="w-4 h-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Cart */}
      {step === 'cart' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</h1>
            {items.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">🛒</div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Browse our selection of humanoid robots and parts</p>
                <Link href="/robots" className="inline-flex px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
                  Browse Robots →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.itemId} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-2xl shrink-0">
                      {item.itemType === 'robot' ? '🤖' : '⚙️'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded uppercase font-medium">
                            {item.itemType}
                          </span>
                          <Link href={`/${item.itemType === 'robot' ? 'robots' : 'parts'}/${item.itemId}`} className="block text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 mt-1">
                            {item.itemName}
                          </Link>
                          {item.price && <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">{item.price}</p>}
                        </div>
                        <button onClick={() => removeItem(item.itemId)} className="text-gray-400 hover:text-red-500 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Remove">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Qty:</span>
                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <button onClick={() => updateQuantity(item.itemId, item.quantity - 1)} className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm transition-colors">−</button>
                          <span className="px-3 py-1.5 text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-center border-x border-gray-200 dark:border-gray-700">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.itemId, item.quantity + 1)} className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm transition-colors">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={clearBasket} className="text-xs text-gray-400 hover:text-red-500 transition-colors mt-2">
                  Clear entire cart
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart
              </div>
              <ProvincialTaxCalculator province={province} onProvinceChange={setProvince} />
              <button
                onClick={() => setStep('info')}
                disabled={items.length === 0}
                className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all disabled:opacity-50 text-sm"
              >
                Proceed to Checkout →
              </button>
              <div className="mt-3">
                <PaymentMethodsBadges compact />
              </div>
            </div>
            <ShippingEstimatorWidget province={province} />
          </div>
        </div>
      )}

      {/* Step 2: Customer Info */}
      {step === 'info' && (
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Information</h1>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input type="text" required value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={inputClass} placeholder="Jane Smith" />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input type="email" required value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={inputClass} placeholder="jane@company.ca" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Phone <span className="text-gray-400">(optional)</span></label>
                  <input type="tel" value={formData.phone}
                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className={inputClass} placeholder="+1 (403) 555-0123" />
                </div>
                <div>
                  <label className={labelClass}>Company <span className="text-gray-400">(optional)</span></label>
                  <input type="text" value={formData.company}
                    onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className={inputClass} placeholder="Company name" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>City / Province *</label>
                  <select required value={formData.city}
                    onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className={inputClass}>
                    <option value="">Select city</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Preferred Contact</label>
                  <select value={formData.contactMethod}
                    onChange={e => setFormData(prev => ({ ...prev, contactMethod: e.target.value }))}
                    className={inputClass}>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="either">Either</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Notes <span className="text-gray-400">(optional)</span></label>
                <textarea rows={3} value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className={`${inputClass} resize-none`} placeholder="Special requirements, questions, deployment timeline..." />
              </div>
              {/* Honeypot */}
              <div className="absolute opacity-0 -z-10" aria-hidden="true"><input type="text" name="_hp" autoComplete="off" tabIndex={-1} value={formData._hp} onChange={e => setFormData(prev => ({ ...prev, _hp: e.target.value }))} /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep('cart')} className="px-5 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                ← Back to Cart
              </button>
              <button
                onClick={() => {
                  if (formData.name && formData.email && formData.city) setStep('review');
                }}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all text-sm"
              >
                Review Order →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 'review' && (
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Review Your Order</h1>
          <div className="space-y-4">
            {/* Items summary */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Items ({itemCount})</h3>
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.itemId} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{item.itemName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    {item.price && <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.price}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact info summary */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Contact Information</h3>
                <button onClick={() => setStep('info')} className="text-xs text-blue-600 hover:text-blue-700 font-semibold">Edit</button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-500 dark:text-gray-400">Name:</span> <span className="text-gray-900 dark:text-white font-medium ml-1">{formData.name}</span></div>
                <div><span className="text-gray-500 dark:text-gray-400">Email:</span> <span className="text-gray-900 dark:text-white font-medium ml-1">{formData.email}</span></div>
                {formData.phone && <div><span className="text-gray-500 dark:text-gray-400">Phone:</span> <span className="text-gray-900 dark:text-white font-medium ml-1">{formData.phone}</span></div>}
                {formData.company && <div><span className="text-gray-500 dark:text-gray-400">Company:</span> <span className="text-gray-900 dark:text-white font-medium ml-1">{formData.company}</span></div>}
                <div><span className="text-gray-500 dark:text-gray-400">City:</span> <span className="text-gray-900 dark:text-white font-medium ml-1">{formData.city}</span></div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 py-2">
              {['No payment required now', 'Response within 24h', 'Secure & encrypted'].map(t => (
                <span key={t} className="text-xs text-gray-500 flex items-center gap-1"><span className="text-emerald-500">✓</span> {t}</span>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep('info')} className="px-5 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl transition-all disabled:opacity-50 text-sm shadow-sm shadow-emerald-600/20"
              >
                {status === 'loading' ? 'Submitting...' : '✓ Place Order'}
              </button>
            </div>
            {status === 'error' && (
              <p className="text-red-600 dark:text-red-400 text-sm text-center">Something went wrong. Please try again or call us at +1 (587) 325-0017.</p>
            )}
            <PaymentMethodsBadges />
          </div>
        </div>
      )}
    </div>
  );
}
