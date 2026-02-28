'use client';

// Improvement #42: "Submit a Robot" form for manufacturers

import { useState } from 'react';
import Link from 'next/link';

export default function SubmitRobotPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    companyName: '', contactName: '', email: '', website: '',
    robotName: '', category: 'enterprise', price: '', availability: 'announced',
    height: '', weight: '', dof: '', battery: '',
    description: '', useCases: '', shipsToCanada: 'yes',
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Robot submission received (integrate with admin dashboard)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Robot Submitted Successfully!</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Our team will review your submission and get back to you within 3-5 business days.</p>
          <Link href="/robots" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">Browse Existing Robots →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link><span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Submit a Robot</span>
      </nav>

      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">For Manufacturers</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">List Your Robot on RoboNorth</h1>
        <p className="text-gray-500 dark:text-gray-400">Reach Canadian buyers. Fill out the form below and our team will review your submission.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Info */}
        <fieldset className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <legend className="text-sm font-bold text-gray-900 dark:text-white px-2">Company Information</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name *</label>
              <input type="text" required value={form.companyName} onChange={(e) => update('companyName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Name *</label>
              <input type="text" required value={form.contactName} onChange={(e) => update('contactName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
              <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Website</label>
              <input type="url" value={form.website} onChange={(e) => update('website', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>
          </div>
        </fieldset>

        {/* Robot Info */}
        <fieldset className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <legend className="text-sm font-bold text-gray-900 dark:text-white px-2">Robot Details</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Robot Name *</label>
              <input type="text" required value={form.robotName} onChange={(e) => update('robotName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select value={form.category} onChange={(e) => update('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option value="consumer">Consumer</option><option value="enterprise">Enterprise</option><option value="research">Research</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Price (USD)</label>
              <input type="text" value={form.price} onChange={(e) => update('price', e.target.value)} placeholder="e.g. $30,000"
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Availability</label>
              <select value={form.availability} onChange={(e) => update('availability', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option value="shipping">Shipping</option><option value="preorder">Pre-Order</option><option value="pilot">Pilot Program</option><option value="announced">Announced</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Ships to Canada?</label>
              <select value={form.shipsToCanada} onChange={(e) => update('shipsToCanada', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option value="yes">Yes</option><option value="planned">Planned</option><option value="no">Not yet</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Specs */}
        <fieldset className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <legend className="text-sm font-bold text-gray-900 dark:text-white px-2">Specifications</legend>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Height (cm)</label><input type="text" value={form.height} onChange={(e) => update('height', e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white" /></div>
            <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Weight (kg)</label><input type="text" value={form.weight} onChange={(e) => update('weight', e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white" /></div>
            <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">DOF</label><input type="text" value={form.dof} onChange={(e) => update('dof', e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white" /></div>
            <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Battery Life</label><input type="text" value={form.battery} onChange={(e) => update('battery', e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white" /></div>
          </div>
          <div className="mt-4">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={3}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none" />
          </div>
        </fieldset>

        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm">
          Submit Robot for Review →
        </button>
      </form>
    </div>
  );
}
