"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import GlobalSearch from '@/components/ui/GlobalSearch';

const navLinks = [
  { href: '/robots', label: 'Robots' },
  { href: '/manufacturers', label: 'Brands' },
  { href: '/parts', label: 'Parts' },
  { href: '/compare', label: 'Compare' },
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
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-sm shadow-blue-600/20 group-hover:shadow-blue-600/40 transition-shadow">
              <span className="text-white text-sm font-bold">R</span>
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
            <GlobalSearch />
            <DarkModeToggle />
            <Link
              href="/inquiry"
              className="hidden sm:inline-flex px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shadow-blue-600/20 hover:shadow-blue-600/40"
            >
              Get Early Access
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
              <div className="p-3 mt-2 border-t border-gray-100 dark:border-gray-800">
                <Link
                  href="/inquiry"
                  className="block py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Early Access
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
