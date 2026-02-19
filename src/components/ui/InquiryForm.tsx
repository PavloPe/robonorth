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
    name: '',
    email: '',
    phone: '',
    city: '',
    robot: preselectedRobot || '',
    message: '',
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
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-green-400 mb-2">Thank you!</h3>
        <p className="text-gray-400">We&apos;ll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">Full Name *</label>
        <input
          id="name" type="text" required
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          placeholder="John Smith"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">Email *</label>
        <input
          id="email" type="email" required
          value={formData.email}
          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1.5">Phone <span className="text-gray-500">(optional)</span></label>
        <input
          id="phone" type="tel"
          value={formData.phone}
          onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          placeholder="+1 (403) 555-0123"
        />
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1.5">City *</label>
        <select
          id="city" required
          value={formData.city}
          onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        >
          <option value="">Select your city</option>
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="robot" className="block text-sm font-medium text-gray-300 mb-1.5">Robot of Interest</label>
        <select
          id="robot"
          value={formData.robot}
          onChange={e => setFormData(prev => ({ ...prev, robot: e.target.value }))}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        >
          <option value="">General Inquiry</option>
          <option value="parts">Parts & Components</option>
          {robots.map(r => <option key={r.id} value={r.id}>{r.name} — {r.price}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5">Message <span className="text-gray-500">(optional)</span></label>
        <textarea
          id="message" rows={4}
          value={formData.message}
          onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
          placeholder="Tell us about your project or what you're looking for..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold rounded-lg transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
      </button>

      {status === 'error' && (
        <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
