'use client';

import { useState } from 'react';

export default function EducationForm() {
  const [formData, setFormData] = useState({ name: '', email: '', institution: '', role: '', department: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name, email: formData.email, phone: '',
          city: formData.institution, robot: 'EDUCATION_PRICING',
          message: `Education Pricing Application\nRole: ${formData.role}\nDepartment: ${formData.department}\nInstitution: ${formData.institution}\n\n${formData.message}`,
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">🎓</div>
        <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-2">Application Submitted!</h2>
        <p className="text-sm text-emerald-700 dark:text-emerald-400">We&apos;ll verify your status and send your education pricing code within 24-48 hours.</p>
      </div>
    );
  }

  const inputClass = 'w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm';

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Apply for Education Pricing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
            <input type="text" required value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className={inputClass} placeholder="Dr. Jane Smith" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Institutional Email *</label>
            <input type="email" required value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className={inputClass} placeholder="jsmith@university.ca" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Institution *</label>
            <input type="text" required value={formData.institution} onChange={e => setFormData(p => ({ ...p, institution: e.target.value }))} className={inputClass} placeholder="University of Toronto" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Role *</label>
            <select required value={formData.role} onChange={e => setFormData(p => ({ ...p, role: e.target.value }))} className={inputClass}>
              <option value="">Select role</option>
              <option value="student">Student</option>
              <option value="professor">Professor / Instructor</option>
              <option value="researcher">Researcher</option>
              <option value="lab-coordinator">Lab Coordinator</option>
              <option value="procurement">Institutional Procurement</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Department</label>
          <input type="text" value={formData.department} onChange={e => setFormData(p => ({ ...p, department: e.target.value }))} className={inputClass} placeholder="e.g., Computer Science, Mechanical Engineering" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">What robots or parts are you interested in?</label>
          <textarea rows={3} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} className={`${inputClass} resize-none`} placeholder="Tell us about your research needs..." />
        </div>
        <button type="submit" disabled={status === 'loading'} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 text-sm">
          {status === 'loading' ? 'Submitting...' : 'Apply for 15% Education Discount'}
        </button>
        {status === 'error' && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>}
      </form>
    </div>
  );
}
