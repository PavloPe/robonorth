"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import GlobalSearch from '@/components/ui/GlobalSearch';
import InquiryBasketIcon from '@/components/ui/InquiryBasketIcon';
import CurrencyToggle from '@/components/ui/CurrencyToggle';

const navLinks = [
  { href: '/robots', label: 'Robots' },
  { href: '/manufacturers', label: 'Brands' },
  { href: '/parts', label: 'Parts' },
  { href: '/compare', label: 'Compare' },
  { href: '/why-humanoid-first', label: 'Why Humanoid?' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-700/80 shadow-sm'
        : 'bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Improvement #6: Animated SVG robot logo */}
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-sm shadow-blue-600/20 group-hover:shadow-blue-600/40 transition-shadow logo-animated">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <rect x="5" y="9" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="2" />
                <line x1="12" y1="7" x2="12" y2="9" stroke="currentColor" strokeWidth="2" />
                <circle cx="9" cy="14" r="1.5" fill="currentColor" />
                <circle cx="15" cy="14" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold text-gray-900 dark:text-white">RoboNorth</span>
              <span className="text-[10px] bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold px-1.5 py-0.5 rounded-md border border-red-100 dark:border-red-800">CA</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Sales phone — Task 9 */}
            <a
              href="tel:+15873250017"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
              title="Call our sales team"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              (587) 325-0017
            </a>
            {/* FR/EN toggle — Task 27 */}
            <Link
              href="/fr"
              className="hidden md:inline-flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Version française"
            >
              FR
            </Link>
            <GlobalSearch />
            <CurrencyToggle />
            <InquiryBasketIcon />
            <DarkModeToggle />
            <Link
              href="/robots"
              className="hidden sm:inline-flex px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shadow-blue-600/20 hover:shadow-blue-600/40"
            >
              Shop Robots
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu — slide-in overlay */}
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/30 z-40 md:hidden animate-fade-in"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            {/* Slide-in panel */}
            <div className="fixed top-0 right-0 bottom-0 w-72 bg-white dark:bg-gray-900 z-50 md:hidden shadow-2xl mobile-menu-slide-in">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900 dark:text-white">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <nav className="p-3 space-y-1" role="navigation" aria-label="Mobile navigation">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-3 px-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl text-sm font-medium transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/quiz"
                  className="block py-3 px-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl text-sm font-medium transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  🧭 Robot Quiz
                </Link>
              </nav>
              <div className="p-3 mt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
                {/* Mobile phone link */}
                <a
                  href="tel:+15873250017"
                  className="flex items-center justify-center gap-2 py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-sm font-semibold rounded-xl"
                  onClick={() => setMobileOpen(false)}
                >
                  📞 Call (587) 325-0017
                </a>
                <Link
                  href="/robots"
                  className="block py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Shop Robots
                </Link>
                <Link
                  href="/fr"
                  className="block py-2 text-center text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600"
                  onClick={() => setMobileOpen(false)}
                >
                  🇫🇷 Version française
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
