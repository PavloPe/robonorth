'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log('[RoboNorth] Contact form:', form);
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'contact_form_submit' });
    }
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-2">Message Sent!</h3>
        <p className="text-sm text-emerald-600 dark:text-emerald-400">We&apos;ll get back to you within 1–2 business days.</p>
        <button onClick={() => setStatus('idle')} className="mt-4 text-sm text-emerald-700 dark:text-emerald-400 hover:underline">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
        <input
          id="contact-name"
          type="text"
          value={form.name}
          onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })); }}
          className={`w-full px-4 py-2.5 bg-white dark:bg-gray-800 border ${errors.name ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
        />
        {errors.name && <p id="contact-name-error" className="text-xs text-red-500 mt-1" role="alert" aria-live="polite">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })); }}
          className={`w-full px-4 py-2.5 bg-white dark:bg-gray-800 border ${errors.email ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
        />
        {errors.email && <p id="contact-email-error" className="text-xs text-red-500 mt-1" role="alert" aria-live="polite">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
        <select
          id="contact-subject"
          value={form.subject}
          onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
          className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a topic...</option>
          <option value="buying">Buying a robot</option>
          <option value="import">Import & shipping help</option>
          <option value="partnership">Partnership inquiry</option>
          <option value="press">Press & media</option>
          <option value="support">Technical support</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message *</label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: '' })); }}
          rows={5}
          className={`w-full px-4 py-2.5 bg-white dark:bg-gray-800 border ${errors.message ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message && <p id="contact-message-error" className="text-xs text-red-500 mt-1" role="alert" aria-live="polite">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors"
      >
        Send Message
      </button>
      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        We typically respond within 1–2 business days.
      </p>
    </form>
  );
}
