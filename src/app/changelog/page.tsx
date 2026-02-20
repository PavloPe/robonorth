import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "What's New — Changelog",
  description: 'Latest updates to the RoboNorth marketplace — new robots, features, and improvements. Stay up to date with our changelog.',
  alternates: { canonical: 'https://robonorth.ca/changelog' },
};

const changelog = [
  {
    version: '2.0',
    date: '2026-06-15',
    title: 'Major Update — 32 Robots, Quiz, & More',
    changes: [
      'Added 10 new robots: 1X NEO Beta, Apptronik Apollo 2, Figure 04, Unitree H1-2, Sanctuary AI Phoenix Gen 2, Kepler K2, Agility Digit V2, NVIDIA GR00T, Galbot G1, Mentee Bot',
      'New robot quiz — answer 5 questions to get personalized recommendations',
      'CAD pricing estimates on all robot detail pages',
      'Shipping & import info for each robot (customs duties, HS codes, timelines)',
      'FAQ sections on robot detail pages with structured data',
      'Real YouTube video embeds on robot pages',
      'Share button with Web Share API support',
      'Favorites/wishlist with localStorage persistence',
      'Notify Me button for announced and prototype robots',
      'Toast notification system for user actions',
      'NProgress-style loading bar for page transitions',
      'Improved mobile menu with slide-in animation',
      'Mega footer with 6 columns and comprehensive sitemap',
      'Contact page with form and map placeholder',
      'Careers page with open positions',
      'Partners & integrators directory',
      'Robot leasing/financing information page',
      'Customer success stories page',
      'API documentation page',
      'Comprehensive 2,500-word Robot Buying Guide',
      'Skip-to-content link for accessibility',
      'JSON-LD structured data for FAQs and breadcrumbs',
      'Improved SEO: canonical URLs, hreflang, meta descriptions',
      'Reduced motion support (prefers-reduced-motion)',
      'Resource hints (dns-prefetch, preconnect)',
      'Skeleton loading CSS animations',
      'i18n preparation (en/fr structure)',
    ],
  },
  {
    version: '1.5',
    date: '2026-04-01',
    title: 'Dark Mode, Search & Comparison Tools',
    changes: [
      'Dark mode with system preference detection',
      'Global search (⌘K / Ctrl+K)',
      'Side-by-side robot comparison with up to 4 models',
      'Compare bar — persistent comparison from any page',
      'Quick view modal on robot cards',
      'Image gallery on detail pages',
      'YouTube video embeds',
      'Cookie consent banner',
      'Newsletter signup in footer',
      'Social proof / testimonials section',
      'PWA support with offline capabilities',
    ],
  },
  {
    version: '1.0',
    date: '2026-02-01',
    title: 'Initial Launch',
    changes: [
      'Launched with 22 humanoid robots from 18 manufacturers',
      'Robot catalog with filters (category, availability, price, Canada shipping)',
      'Manufacturer directory with detail pages',
      'Parts & components catalog',
      'Blog with industry articles',
      'Early access inquiry form',
      'About, FAQ, Glossary, Calculator pages',
      'Legal pages (Privacy, Terms, Warranty)',
      'Mobile-responsive design',
      'XML sitemap and robots.txt',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Changelog</span>
      </nav>

      <div className="mb-10">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Updates</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">What&apos;s New</h1>
        <p className="text-gray-500 dark:text-gray-400">Every major update to the RoboNorth marketplace, newest first.</p>
      </div>

      <div className="space-y-10">
        {changelog.map((release, idx) => (
          <article key={release.version} className={`${idx > 0 ? 'pt-10 border-t border-gray-200 dark:border-gray-800' : ''}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-lg">v{release.version}</span>
              <time className="text-xs text-gray-400 dark:text-gray-500" dateTime={release.date}>
                {new Date(release.date + 'T00:00:00').toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{release.title}</h2>
            <ul className="space-y-2">
              {release.changes.map((change, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  {change}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
