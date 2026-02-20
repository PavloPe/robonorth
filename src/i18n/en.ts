// ============================================================================
// RoboNorth.ca — English (en-CA) translations
// ============================================================================

export const en = {
  // Common
  common: {
    siteName: 'RoboNorth',
    tagline: "Canada's Humanoid Robot Marketplace",
    language: 'English',
    locale: 'en-CA',
  },

  // Navigation
  nav: {
    robots: 'Robots',
    brands: 'Brands',
    parts: 'Parts',
    compare: 'Compare',
    blog: 'Blog',
    about: 'About',
    earlyAccess: 'Get Early Access',
    menu: 'Menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to main content',
  },

  // Robot detail
  robot: {
    inquireNow: 'Inquire Now',
    requestQuote: 'Request a Quote',
    compare: 'Compare',
    specifications: 'Specifications',
    performance: 'Performance',
    details: 'Details',
    shipsToCanada: 'Ships to Canada',
    inStock: 'In Stock',
    preOrder: 'Pre-Order',
    pilotProgram: 'Pilot Program',
    comingSoon: 'Coming Soon',
    prototype: 'Prototype',
    faq: 'Frequently Asked Questions',
    shippingToCanada: 'Shipping to Canada',
    videos: 'Videos',
    youMightAlsoLike: 'You Might Also Like',
    recentlyViewed: 'Recently Viewed',
    share: 'Share',
    save: 'Save',
    saved: 'Saved',
    notifyMe: 'Notify Me When Available',
  },

  // Categories
  categories: {
    consumer: 'Consumer',
    enterprise: 'Enterprise',
    research: 'Research',
    announced: 'Announced',
  },

  // Footer
  footer: {
    stayUpdated: 'Stay Updated',
    newsletterDesc: 'Get robot news & early access offers.',
    subscribed: "You're subscribed!",
    subscribedDesc: "We'll keep you posted on new robots.",
    enterEmail: 'Enter your email',
    subscribe: 'Subscribe',
    validEmail: 'Please enter a valid email.',
    allRightsReserved: 'All rights reserved.',
  },

  // Search
  search: {
    placeholder: 'Search robots, brands, articles...',
    noResults: 'No results found',
    shortcut: '⌘K',
  },

  // Quiz
  quiz: {
    title: 'What Robot is Right for Me?',
    subtitle: 'Answer 5 quick questions and we\'ll recommend the best humanoid robots for your needs.',
    retake: 'Retake Quiz',
    compareResults: 'Compare These Robots',
    getAdvice: 'Get Expert Advice',
    strongMatch: 'Strong Match',
    goodMatch: 'Good Match',
    yourRecommendations: 'Your Recommended Robots',
  },
} as const;

// Deep type that allows any string values but preserves the structure
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};
export type TranslationKey = DeepStringify<typeof en>;
