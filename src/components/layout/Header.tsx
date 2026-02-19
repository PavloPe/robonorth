"use client";

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/robots', label: 'Robots' },
  { href: '/manufacturers', label: 'Manufacturers' },
  { href: '/parts', label: 'Parts' },
  { href: '/compare', label: 'Compare' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-2xl">🤖</span>
            <span className="text-white">Robo</span>
            <span className="text-cyan-400">North</span>
            <span className="text-xs text-gray-500 ml-1">🇨🇦</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/inquiry"
              className="hidden sm:inline-flex px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-gray-950 text-sm font-bold rounded-lg transition-colors"
            >
              Get Early Access
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="md:hidden py-4 border-t border-gray-800">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/inquiry"
              className="block mt-3 px-4 py-2 bg-cyan-500 text-gray-950 text-sm font-bold rounded-lg text-center"
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
