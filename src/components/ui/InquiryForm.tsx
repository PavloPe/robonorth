"use client";

import { useState } from 'react';
import { robots } from '@/data/robots';

const cities = [
  'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton', 'Ottawa',
  'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener', 'London', 'Victoria',
  'Halifax', 'Saskatoon', 'Regina', 'St. John\'s', 'Kelowna', 'Barrie',
  'Windsor', 'Oshawa', 'Other',
];

export default function InquiryForm({ preselectedRobot }: { preselectedRobot?: string }) {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', city: '',
    robot: preselectedRobot || '', message: '', _hp: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-lg font-semibold text-green-800 mb-1">Thank you!</h3>
        <p className="text-green-700 text-sm">We&apos;ll be in touch within 24 hours.</p>
      </div>
    );
  }

  const inputClass = "w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <div>
        <label htmlFor="phone" className={labelClass}>Phone <span className="text-gray-400 font-normal">(optional)</span></label>
        <input id="phone" type="tel" value={formData.phone}
          onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className={inputClass} placeholder="+1 (403) 555-0123" />
      </div>
      <div>
        <label htmlFor="city" className={labelClass}>City *</label>
        <select id="city" required value={formData.city}
          onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
          className={inputClass}>
          <option value="">Select your city</option>
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="robot" className={labelClass}>Robot of Interest</label>
        <select id="robot" value={formData.robot}
          onChange={e => setFormData(prev => ({ ...prev, robot: e.target.value }))}
          className={inputClass}>
          <option value="">General Inquiry</option>
          <option value="parts">Parts & Components</option>
          {robots.map(r => <option key={r.id} value={r.id}>{r.name} — {r.price}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>Message <span className="text-gray-400 font-normal">(optional)</span></label>
        <textarea id="message" rows={3} value={formData.message}
          onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className={`${inputClass} resize-none`} placeholder="Tell us about your project..." />
      </div>
      {/* Honeypot field — hidden from real users, bots fill it */}
      <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
        <input
          type="text"
          name="_hp"
          autoComplete="off"
          tabIndex={-1}
          value={formData._hp || ''}
          onChange={e => setFormData(prev => ({ ...prev, _hp: e.target.value }))}
        />
      </div>

      <button type="submit" disabled={status === 'loading'}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 text-sm shadow-sm">
        {status === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
      </button>
      {status === 'error' && (
        <p className="text-red-600 text-sm text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
