'use client';

import { useState } from 'react';
import Link from 'next/link';

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'All Robots', href: '/robots' },
      { label: 'Brands', href: '/manufacturers' },
      { label: 'Parts & Components', href: '/parts' },
      { label: 'Compare Robots', href: '/compare' },
      { label: 'Robot Quiz', href: '/quiz' },
      { label: 'New Arrivals', href: '/robots?sort=newest' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { label: 'Consumer Robots', href: '/robots/category/consumer' },
      { label: 'Enterprise Robots', href: '/robots/category/enterprise' },
      { label: 'Research Robots', href: '/robots/category/research' },
      { label: 'Coming Soon', href: '/robots/category/announced' },
      { label: 'Use Cases', href: '/use-cases' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press & Media', href: '/press' },
      { label: 'Careers', href: '/careers' },
      { label: 'Partners', href: '/partners' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Buying Guide', href: '/blog/complete-robot-buying-guide-canada-2026' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Glossary', href: '/glossary' },
      { label: 'API Docs', href: '/api-docs' },
      { label: 'Warranty & Support', href: '/warranty' },
      { label: 'Financing', href: '/financing' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: "What's New", href: '/changelog' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterStatus('error');
      return;
    }
    // Track conversion event
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'newsletter_signup', email_domain: email.split('@')[1] });
    }
    console.log('[RoboNorth] Newsletter signup:', email);
    setNewsletterStatus('success');
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 dark:bg-gray-950 text-slate-300 mt-16 border-t border-slate-800 dark:border-gray-800">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mb-12">
          {columns.map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Stay Updated</h4>
            <p className="text-sm text-slate-400 mb-4">Get robot news & early access offers.</p>
            {newsletterStatus === 'success' ? (
              <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-xl px-4 py-3">
                <p className="text-sm text-emerald-400 font-medium">✓ You&apos;re subscribed!</p>
                <p className="text-xs text-emerald-500/70 mt-1">We&apos;ll keep you posted on new robots.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter}>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setNewsletterStatus('idle'); }}
                    className={`flex-1 px-3.5 py-2.5 bg-slate-800 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      newsletterStatus === 'error' ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm shadow-blue-600/20"
                  >
                    →
                  </button>
                </div>
                {newsletterStatus === 'error' && (
                  <p className="text-xs text-red-400 mt-1.5">Please enter a valid email.</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">R</span>
            </div>
            <span className="text-sm font-semibold text-white">RoboNorth</span>
            <span className="text-xs text-slate-500">— Canada&apos;s Humanoid Robot Marketplace</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms</Link>
            <p className="text-xs text-slate-500">© {new Date().getFullYear()} RoboNorth. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
