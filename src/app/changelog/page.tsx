import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "What's New — Changelog",
  description: 'Latest updates to the RoboNorth marketplace — new robots, features, and improvements. Complete version history from v0.1.0 to v4.0.0.',
  alternates: { canonical: 'https://robonorth.ca/changelog' },
};

type ChangeCategory = {
  label: string;
  icon: 'added' | 'changed' | 'fixed';
  items: string[];
};

type Release = {
  version: string;
  date: string;
  title: string;
  summary: string;
  categories: ChangeCategory[];
};

const changelog: Release[] = [
  {
    version: '4.0.0',
    date: '2026-02-20',
    title: 'E-commerce & Canadian Marketplace',
    summary: 'Full e-commerce flow, Canadian regulatory content, trust infrastructure, and seller portal.',
    categories: [
      {
        label: 'E-commerce Core',
        icon: 'added',
        items: [
          'Cart & checkout flow — Add to Cart → Cart → Checkout experience',
          'Buy Now page for streamlined purchases',
          'Order tracking page for post-purchase status',
          'Seller registration portal for third-party sellers',
          'Enterprise inquiry page for B2B flow',
          'Payment methods badges component',
        ],
      },
      {
        label: 'Canadian Advantage',
        icon: 'added',
        items: [
          'Why Canada page — Canadian robotics advantage overview',
          'CUSMA page — tariff-free trade agreement benefits',
          'Compliance guide — Canadian regulatory requirements',
          'Provincial robotics pages — Alberta, BC, Ontario, Quebec',
          'Provincial tax calculator — real-time tax by province',
          'Cross-border pricing comparison — Canada vs US vs EU',
        ],
      },
      {
        label: 'Trust & Community',
        icon: 'added',
        items: [
          'Affiliate program page',
          'Trade-in program for robot upgrades',
          'Warranty plans with tiered options',
          'Installation services page',
          'Awards & certification pages',
          'Community hub and referral program',
          'Wishlist with localStorage persistence',
        ],
      },
      {
        label: 'Policies & Layout',
        icon: 'added',
        items: [
          'Shipping, return, and refund policy pages',
          'Winter shipping banner across all pages',
          'CCA tax deduction blog post',
          'Social share buttons on product pages',
          'Homepage enhancements and footer overhaul',
        ],
      },
    ],
  },
  {
    version: '3.0.0',
    date: '2026-02-20',
    title: 'Data Update & Reviews',
    summary: '8 new robots (40 total), 13 expert reviews, scoring system, and variant configurations.',
    categories: [
      {
        label: 'New Robots (8)',
        icon: 'added',
        items: [
          'Fourier GR-2 — enterprise rehabilitation robot',
          'UBTECH Walker X — tall-form commercial humanoid',
          'Kepler Forerunner K2 — Chinese industrial humanoid',
          'Agility Digit V3 — warehouse logistics specialist',
          'Sanctuary AI Phoenix Gen 8 — carbon-based general AI',
          'PAL Robotics TALOS — European research platform',
          'Apptronik Astra — enterprise manufacturing humanoid',
          'LimX Dynamics CL-1 — dynamic locomotion research bot',
        ],
      },
      {
        label: 'Review System',
        icon: 'added',
        items: [
          '13 in-depth robot reviews (1,500–2,000 words each)',
          'Robot scoring system — 5 criteria (Deployment, Capability, Availability, Value, Impact)',
          'Category winner badges — "Best Value", "Best for Research", etc.',
          'Score display UI with radar-style visualization',
        ],
      },
      {
        label: 'Variants & Data',
        icon: 'added',
        items: [
          'Robot variant system for multiple configurations',
          'Unitree G1 with 6 variants (EDU, Standard, DEX, Pro, Research, Enterprise)',
          '"What Is a Humanoid Robot" guide and "Day in the Life" page',
        ],
      },
      {
        label: 'Updated Robots (10)',
        icon: 'changed',
        items: [
          'Tesla Optimus Gen 3, Unitree G1, Unitree H1-2, 1X NEO Beta, Figure 04 — refreshed to Feb 2026 data',
          'Boston Dynamics Atlas, Agility Digit, Apptronik Apollo, Sanctuary AI Phoenix, UBTECH Walker S — updated specs',
        ],
      },
    ],
  },
  {
    version: '2.5.0',
    date: '2026-02-20',
    title: 'SEO & Conversion Optimization',
    summary: 'Head-to-head comparisons, calculators, industry landing pages, French language, and conversion tools.',
    categories: [
      {
        label: 'Comparison Pages',
        icon: 'added',
        items: [
          '5 head-to-head comparison pages with pros/cons and verdicts',
          'Tesla Optimus vs Unitree G1, Figure 04 vs 1X NEO, Atlas vs Digit, and more',
        ],
      },
      {
        label: 'SEO Content',
        icon: 'added',
        items: [
          '"Best Humanoid Robots" ranked list (high-intent keyword target)',
          'Pricing guide with comprehensive breakdown',
          'Industry landing pages — Manufacturing, Healthcare, Education, Logistics',
          'Canadian Robotics overview and industry report',
          'Robotics-as-a-Service (RaaS) page',
        ],
      },
      {
        label: 'Tools & Calculators',
        icon: 'added',
        items: [
          'TCO Calculator — Total Cost of Ownership analysis',
          'Import Duty Calculator — Canadian customs duties',
          'Size Comparison Tool — visual height/weight comparison',
          'Currency toggle (CAD/USD) — site-wide switching',
          'Financing and fleet discount calculators',
        ],
      },
      {
        label: 'i18n & Trust',
        icon: 'added',
        items: [
          'French homepage, about, and robots pages (/fr)',
          'RSS feed for blog syndication (/feed.xml)',
          'Accessibility statement page',
          'Trust badges — SSL, Canadian-owned, secure checkout',
          'Security headers and hreflang tags',
        ],
      },
    ],
  },
  {
    version: '2.0.0',
    date: '2026-02-20',
    title: 'Parts Catalog & Inquiry System',
    summary: '71 real parts across 7 categories with full specifications and an inquiry basket system.',
    categories: [
      {
        label: 'Parts Catalog',
        icon: 'added',
        items: [
          '71 real parts across 7 categories (Actuators, Sensors, Controllers, Power, Structural, Hands, Software)',
          'Part detail pages with specs, compatible robots, and datasheets',
          'Parts catalog with sidebar filters, search, and pagination',
          'Dual-currency pricing (CAD and USD) for every part',
          'New Part database model with full schema',
        ],
      },
      {
        label: 'Inquiry Basket',
        icon: 'added',
        items: [
          'Inquiry basket provider — React context for basket state',
          'Slide-out basket drawer with item management',
          'Multi-item inquiry submission with reference numbers',
          'Add to Basket button on robot and part pages',
          'Basket API endpoint with validation and rate limiting',
          'Live inquiry widget — floating inquiry prompt',
        ],
      },
      {
        label: 'Database',
        icon: 'changed',
        items: [
          'New Part model with CAD/USD pricing, compatibility, specifications',
          'New InquiryItem model for basket line items',
          'Added company, type, contactMethod, referenceNumber to Inquiry model',
          'Homepage featured parts section and sitemap integration',
        ],
      },
    ],
  },
  {
    version: '1.5.0',
    date: '2026-02-19',
    title: 'Visual & Interactive Overhaul',
    summary: '50 visual improvements and 50 interactive features, growing the site to 132 static pages.',
    categories: [
      {
        label: 'Visual Design',
        icon: 'added',
        items: [
          'Gradient backgrounds with animated hero section',
          '3D card hover effects with perspective transforms',
          'Custom 404 page with animated robot illustration',
          'Loading skeleton cards and scroll-reveal animations',
          'Glass morphism effects and premium card designs',
          'Print stylesheet for robot detail pages',
        ],
      },
      {
        label: 'Interactive Tools',
        icon: 'added',
        items: [
          'ROI Calculator — return on investment analysis',
          'Fleet Builder — multi-robot fleet configuration',
          'Timeline — humanoid robotics history',
          'Industry Map — Canadian robotics visualization',
          'Admin Dashboard with stats overview',
          'Robot quiz wizard — 5-question recommendation engine',
        ],
      },
      {
        label: 'Content Pages',
        icon: 'added',
        items: [
          '6 use case pages (Manufacturing, Healthcare, Education, Hospitality, Agriculture)',
          'Webinars, Events, Resources, Universities pages',
          'Education pricing, Support plans, Jobs board',
          'Getting Started guide, Safety information, Grants & funding',
          'Submit a robot, Used robots marketplace',
        ],
      },
    ],
  },
  {
    version: '1.2.0',
    date: '2026-02-19',
    title: 'UX & Feature Expansion',
    summary: 'Dark mode, global search, PWA support, and dozens of new interactive features.',
    categories: [
      {
        label: 'Core UX',
        icon: 'added',
        items: [
          'Dark mode with system preference detection',
          'Global search (⌘K) across robots, manufacturers, and articles',
          'PWA support — installable, works offline',
          'Breadcrumbs, pagination, and top progress bar',
          'Quick view modal and persistent compare bar',
        ],
      },
      {
        label: 'Components & Pages',
        icon: 'added',
        items: [
          'Image gallery and YouTube video embeds',
          'Cookie consent, newsletter signup, social proof section',
          'Exit intent popup and back-to-top button',
          'Legal pages (Privacy, Terms), category pages, use case pages',
          'Press & media page, warranty info',
          'Lazy loading, fade-in animations, responsive images',
        ],
      },
    ],
  },
  {
    version: '1.0.0',
    date: '2026-02-19',
    title: 'Architecture & Data Foundation',
    summary: 'Production-ready infrastructure with rate limiting, logging, structured data, and content expansion.',
    categories: [
      {
        label: 'Infrastructure',
        icon: 'added',
        items: [
          'Environment configuration with typed validation (dev/staging/production)',
          'Rate limiting — 5 requests/min per IP on API routes',
          'Structured logging with context and timestamps',
          'JSON-LD generators (Product, Organization, BreadcrumbList, FAQ)',
          'Honeypot and CSRF protection on forms',
          'Shared constants module (site config, nav, footer)',
        ],
      },
      {
        label: 'Data & Content',
        icon: 'added',
        items: [
          '10 new robots added to catalog',
          'Robot extras (FAQ, CAD pricing, video URLs, shipping info)',
          'Comprehensive 2,500-word buying guide',
          'Manufacturer founding stories',
          '60+ real parts from 10+ manufacturers',
        ],
      },
    ],
  },
  {
    version: '0.5.0',
    date: '2026-02-19',
    title: 'Design & Polish',
    summary: 'Blog system, SEO foundation, loading skeletons, and error boundaries.',
    categories: [
      {
        label: 'SEO & Content',
        icon: 'added',
        items: [
          'Blog with 3 full articles (list + detail pages)',
          'XML sitemap, robots.txt, JSON-LD structured data',
          'Enhanced meta tags — per-page OG, Twitter Card, canonical URLs',
          'Loading skeletons, error boundaries, custom 404',
        ],
      },
      {
        label: 'Design',
        icon: 'changed',
        items: [
          'Comparison page redesign with visual diff highlighting',
          'Improved filter UX with search and sort',
          'Enhanced card designs with hover effects',
        ],
      },
    ],
  },
  {
    version: '0.1.0',
    date: '2026-02-19',
    title: 'Initial Release',
    summary: 'The foundation — Next.js 15.5, React 19, 22 robots from 18 manufacturers.',
    categories: [
      {
        label: 'Foundation',
        icon: 'added',
        items: [
          'Next.js 15.5 + React 19 + Tailwind CSS 4 + Prisma 7',
          '22 humanoid robots from 18 manufacturers with full specs',
          'Robot catalog with sidebar filters (category, availability, price)',
          'Manufacturer directory with detail pages',
          'Side-by-side comparison tool (up to 4 robots)',
          'Parts & components catalog — 7 categories',
          'Early access inquiry form with database persistence',
          'Responsive design — mobile-first, Inter font',
        ],
      },
    ],
  },
];

const iconColors = {
  added: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400', label: 'Added' },
  changed: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400', label: 'Changed' },
  fixed: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', label: 'Fixed' },
};

const versionColors: Record<string, string> = {
  '4.0.0': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  '3.0.0': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  '2.5.0': 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400',
  '2.0.0': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
  '1.5.0': 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
  '1.2.0': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  '1.0.0': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  '0.5.0': 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400',
  '0.1.0': 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-500',
};

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
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">What&apos;s New</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Every major update to the RoboNorth marketplace, from initial launch to the latest release.</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium rounded">40 robots</span>
          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium rounded">26 manufacturers</span>
          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium rounded">71 parts</span>
          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium rounded">299+ pages</span>
          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium rounded">9 versions</span>
        </div>
      </div>

      {/* Quick nav */}
      <div className="mb-10 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Jump to version</p>
        <div className="flex flex-wrap gap-2">
          {changelog.map((release) => (
            <a
              key={release.version}
              href={`#v${release.version}`}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-opacity hover:opacity-80 ${versionColors[release.version] || 'bg-gray-100 text-gray-600'}`}
            >
              v{release.version}
            </a>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 hidden sm:block" />

        <div className="space-y-12">
          {changelog.map((release, idx) => (
            <article key={release.version} id={`v${release.version}`} className="relative scroll-mt-24">
              {/* Timeline dot */}
              <div className="absolute left-[8px] top-1 w-[15px] h-[15px] rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-white dark:border-gray-950 hidden sm:block" />

              <div className={`sm:ml-10 ${idx > 0 ? '' : ''}`}>
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className={`px-3 py-1 text-xs font-bold rounded-lg ${versionColors[release.version] || 'bg-gray-100 text-gray-600'}`}>
                    v{release.version}
                  </span>
                  <time className="text-xs text-gray-400 dark:text-gray-500 font-mono" dateTime={release.date}>
                    {new Date(release.date + 'T00:00:00').toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">{release.title}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">{release.summary}</p>

                {/* Categories */}
                <div className="space-y-5">
                  {release.categories.map((cat) => {
                    const colors = iconColors[cat.icon];
                    return (
                      <div key={cat.label}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded ${colors.bg} ${colors.text}`}>
                            {colors.label}
                          </span>
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{cat.label}</span>
                        </div>
                        <ul className="space-y-1.5 ml-1">
                          {cat.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <svg className={`w-4 h-4 shrink-0 mt-0.5 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                {cat.icon === 'added' && <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />}
                                {cat.icon === 'changed' && <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />}
                                {cat.icon === 'fixed' && <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />}
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Built with ❤️ in Alberta, Canada 🇨🇦 · Full changelog on{' '}
          <a href="https://github.com/robonorth/robonorth/blob/main/CHANGELOG.md" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </div>
    </div>
  );
}
