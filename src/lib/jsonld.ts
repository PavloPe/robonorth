import type { Robot, Manufacturer } from '@/types';

const BASE_URL = 'https://robonorth.ca';

export function robotJsonLd(robot: Robot) {
  const availabilityMap: Record<string, string> = {
    shipping: 'https://schema.org/InStock',
    preorder: 'https://schema.org/PreOrder',
    pilot: 'https://schema.org/LimitedAvailability',
    announced: 'https://schema.org/PreOrder',
    prototype: 'https://schema.org/OutOfStock',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: robot.name,
    description: robot.description,
    url: `${BASE_URL}/robots/${robot.id}`,
    image: robot.imageUrl || `${BASE_URL}/og-default.png`,
    brand: {
      '@type': 'Organization',
      name: robot.manufacturer,
      url: `${BASE_URL}/manufacturers/${robot.manufacturerSlug}`,
    },
    category: 'Humanoid Robots',
    offers: {
      '@type': 'Offer',
      price: robot.priceMin > 0 ? robot.priceMin : undefined,
      priceCurrency: robot.priceMin > 0 ? 'USD' : undefined,
      availability: availabilityMap[robot.availability] || 'https://schema.org/OutOfStock',
      url: `${BASE_URL}/robots/${robot.id}`,
      seller: {
        '@type': 'Organization',
        name: 'RoboNorth',
        url: BASE_URL,
      },
    },
    additionalProperty: [
      robot.specs.height ? { '@type': 'PropertyValue', name: 'Height', value: `${robot.specs.height} cm` } : null,
      robot.specs.weight ? { '@type': 'PropertyValue', name: 'Weight', value: `${robot.specs.weight} kg` } : null,
      robot.specs.dof ? { '@type': 'PropertyValue', name: 'Degrees of Freedom', value: `${robot.specs.dof}` } : null,
      robot.specs.battery ? { '@type': 'PropertyValue', name: 'Battery Life', value: robot.specs.battery } : null,
      robot.specs.payload ? { '@type': 'PropertyValue', name: 'Payload Capacity', value: `${robot.specs.payload} kg` } : null,
      robot.specs.speed ? { '@type': 'PropertyValue', name: 'Max Speed', value: `${robot.specs.speed} km/h` } : null,
      { '@type': 'PropertyValue', name: 'Country of Origin', value: robot.country },
      { '@type': 'PropertyValue', name: 'Ships to Canada', value: robot.canadaAvailable ? 'Yes' : 'No' },
    ].filter(Boolean),
  };
}

export function manufacturerJsonLd(manufacturer: Manufacturer) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: manufacturer.name,
    description: manufacturer.description,
    url: manufacturer.website,
    foundingDate: manufacturer.founded,
    address: {
      '@type': 'PostalAddress',
      addressCountry: manufacturer.country,
    },
  };
}

export function blogPostJsonLd(post: {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${BASE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RoboNorth',
      url: BASE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RoboNorth',
    url: BASE_URL,
    description: "Canada's first humanoid robot marketplace. Browse, compare, and pre-order humanoid robots.",
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/robots?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RoboNorth',
    url: BASE_URL,
    description: "Canada's first dedicated humanoid robot marketplace.",
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Alberta',
      addressCountry: 'CA',
    },
    sameAs: [],
  };
}
