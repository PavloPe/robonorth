"use client";

import { useState } from 'react';
import Link from 'next/link';

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

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">RoboNorth</span>
            <span className="text-[10px] bg-red-50 text-red-600 font-semibold px-1.5 py-0.5 rounded-full border border-red-100">CA</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/inquiry"
              className="hidden sm:inline-flex px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
            >
              Get Early Access
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-3 border-t border-gray-100">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2.5 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/inquiry"
              className="block mt-2 mx-3 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg text-center"
              onClick={() => setMobileOpen(false)}
            >
              Get Early Access
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
