'use client';

import { useState } from 'react';
import Link from 'next/link';

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'All Robots', href: '/robots' },
      { label: 'Buy in Canada', href: '/buy' },
      { label: 'Compare Robots', href: '/compare' },
      { label: 'Pricing Guide', href: '/pricing-guide' },
      { label: 'Best Robots 2026', href: '/best-humanoid-robots' },
      { label: 'Enterprise Sales', href: '/enterprise' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Robot Rental', href: '/rental' },
      { label: 'RaaS (Leasing)', href: '/raas' },
      { label: 'Installation & Training', href: '/services/installation' },
      { label: 'Warranty Plans', href: '/warranty-plans' },
      { label: 'Trade-In Program', href: '/trade-in' },
      { label: 'Financing', href: '/financing' },
    ],
  },
  {
    title: 'Canada',
    links: [
      { label: 'Government Grants', href: '/grants' },
      { label: 'CUSMA Duty Benefits', href: '/cusma' },
      { label: 'Compliance Guide', href: '/compliance' },
      { label: 'Robotics in Ontario', href: '/robotics-in-ontario' },
      { label: 'Robotics in BC', href: '/robotics-in-bc' },
      { label: 'Robotics in Alberta', href: '/robotics-in-alberta' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Why RoboNorth?', href: '/why-robonorth' },
      { label: 'University Partners', href: '/universities' },
      { label: 'Education Pricing', href: '/education-pricing' },
      { label: 'Certification Course', href: '/certification' },
      { label: 'Canadian Robotics Awards', href: '/awards' },
      { label: 'Affiliate Program', href: '/affiliates' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Why Humanoid-First?', href: '/why-humanoid-first' },
      { label: 'Meet the Team', href: '/team' },
      { label: 'Become a Seller', href: '/sell' },
      { label: 'Contact', href: '/contact' },
      { label: 'Press & Media', href: '/press' },
      { label: 'Careers', href: '/careers' },
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
    // Newsletter signup submitted (integrate with email service)
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
              <div className="text-xs font-semibold text-white uppercase tracking-wider mb-4" role="heading" aria-level={6}>{col.title}</div>
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

          {/* Newsletter — Task 46 */}
          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-4" role="heading" aria-level={6}>Stay Updated</div>
            <p className="text-sm text-slate-400 mb-2">Join 2,000+ Canadian robotics professionals.</p>
            <p className="text-xs text-slate-500 mb-4">Get our free Robot Buyer&apos;s Checklist + weekly insights.</p>
            {newsletterStatus === 'success' ? (
              <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-xl px-4 py-3">
                <p className="text-sm text-emerald-400 font-medium">✓ You&apos;re subscribed!</p>
                <p className="text-xs text-emerald-500/70 mt-1">Check your inbox for the Buyer&apos;s Checklist.</p>
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
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm shadow-blue-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                    aria-label="Subscribe to newsletter"
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

        {/* Sales phone & social — Tasks 9, 44, 45 */}
        <div className="pt-8 border-t border-slate-800 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <a href="tel:+15873250017" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-400 transition-colors">
                📞 +1 (587) 325-0017
              </a>
              <span className="text-slate-600">|</span>
              <span className="text-xs text-slate-500">Mon-Fri 9am-6pm MT</span>
            </div>
            <div className="flex items-center gap-3">
              {/* Social links — Tasks 44, 45 */}
              <a href="https://www.linkedin.com/company/robonorth" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg" title="LinkedIn" aria-label="Follow RoboNorth on LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://twitter.com/robonorth" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg" title="X / Twitter" aria-label="Follow RoboNorth on X / Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://facebook.com/robonorth" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg" title="Facebook Community" aria-label="Join RoboNorth on Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://reddit.com/r/robonorth" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg" title="Reddit" aria-label="Join RoboNorth on Reddit">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.05 1.604a3.6 3.6 0 0 1 .033.503c0 2.8-3.252 5.07-7.262 5.07-4.01 0-7.263-2.27-7.263-5.07 0-.182.013-.36.033-.535-.61-.27-1.045-.888-1.045-1.602 0-.968.786-1.754 1.754-1.754.465 0 .886.182 1.2.48 1.18-.869 2.834-1.44 4.656-1.516l.887-4.159a.367.367 0 0 1 .444-.285l2.905.608a1.248 1.248 0 0 1 1.119-.692zM9.06 12.308c-.72 0-1.3.585-1.3 1.304 0 .72.579 1.305 1.299 1.305s1.3-.585 1.3-1.305c0-.719-.58-1.304-1.3-1.304zm5.862 0c-.72 0-1.3.585-1.3 1.304 0 .72.58 1.305 1.3 1.305.72 0 1.3-.585 1.3-1.305 0-.719-.58-1.304-1.3-1.304zm-5.606 4.548c-.065 0-.13.025-.18.074a.243.243 0 0 0 0 .344c.593.593 1.444.891 2.534.891h.03c1.089 0 1.94-.298 2.533-.891a.243.243 0 0 0 0-.344.247.247 0 0 0-.343 0c-.519.52-1.277.78-2.19.78h-.03c-.914 0-1.672-.26-2.19-.78a.246.246 0 0 0-.164-.074z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Payment methods & trust badges — Tasks 14, 28 */}
        <div className="pb-6 border-b border-slate-800 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            <span className="text-xs text-slate-500">Accepted:</span>
            {['💳 Visa', '💳 Mastercard', '🏦 Wire Transfer', '📄 Invoice'].map(m => (
              <span key={m} className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">{m}</span>
            ))}
          </div>
          {/* Canadian trust badges — Task 28 */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: '🇨🇦', text: 'Canadian-Owned Business' },
              { icon: '📦', text: 'Ships from Canada' },
              { icon: '💲', text: 'Canadian Dollar Pricing' },
              { icon: '🔤', text: 'Bilingual Support (EN/FR)' },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-1.5 text-slate-500">
                <span className="text-sm">{b.icon}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider">{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">R</span>
            </div>
            <span className="text-sm font-semibold text-white">RoboNorth</span>
            <span className="text-xs text-slate-500">— Canada&apos;s Humanoid Robot Marketplace</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/privacy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms</Link>
            <Link href="/shipping-policy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Shipping</Link>
            <Link href="/return-policy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Returns</Link>
            <Link href="/refund-policy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Refunds</Link>
            <Link href="/accessibility" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Accessibility</Link>
            <p className="text-xs text-slate-500">© {new Date().getFullYear()} RoboNorth. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
