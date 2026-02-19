// ============================================================================
// RoboNorth.ca — Shared Constants
// ============================================================================

export const SITE_NAME = 'RoboNorth';
export const SITE_TAGLINE = "Canada's Humanoid Robot Marketplace";
export const SITE_URL = 'https://robonorth.ca';
export const SITE_DESCRIPTION =
  "Browse, compare, and pre-order humanoid robots from the world's leading manufacturers. Canada's first dedicated humanoid robot marketplace.";

export const CONTACT_EMAIL = 'hello@robonorth.ca';
export const SUPPORT_EMAIL = 'support@robonorth.ca';

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/robonorth',
  linkedin: 'https://linkedin.com/company/robonorth',
  youtube: 'https://youtube.com/@robonorth',
  instagram: 'https://instagram.com/robonorth',
  github: 'https://github.com/robonorth',
} as const;

export const COMPANY_INFO = {
  name: 'RoboNorth Inc.',
  legalName: 'RoboNorth Inc.',
  province: 'Alberta',
  country: 'Canada',
  countryCode: 'CA',
  founded: '2025',
} as const;

// Inquiry form rate limiting
export const RATE_LIMIT = {
  windowMs: 60_000, // 1 minute
  maxRequests: 5, // 5 requests per window
} as const;

// USD to CAD approximate rate (update periodically)
export const USD_TO_CAD_RATE = 1.44;
export const CUSTOMS_DUTY_RATE = 0.08; // ~8% average for robotics equipment
export const GST_RATE = 0.05; // 5% GST

// Robot stats
export const SITE_STATS = {
  robotModels: '22+',
  topBrands: '15+',
  startingPrice: '$5.9K',
  allProvinces: '🇨🇦',
} as const;

// Navigation links
export const NAV_LINKS = [
  { href: '/robots', label: 'Robots' },
  { href: '/manufacturers', label: 'Brands' },
  { href: '/parts', label: 'Parts' },
  { href: '/compare', label: 'Compare' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
] as const;

// Footer link columns
export const FOOTER_COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'All Robots', href: '/robots' },
      { label: 'Brands', href: '/manufacturers' },
      { label: 'Parts & Components', href: '/parts' },
      { label: 'Compare', href: '/compare' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/inquiry' },
      { label: 'Press & Media', href: '/press' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Glossary', href: '/glossary' },
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Price Calculator', href: '/calculator' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Warranty Info', href: '/warranty' },
      { label: 'Shipping Info', href: '/about' },
    ],
  },
] as const;
