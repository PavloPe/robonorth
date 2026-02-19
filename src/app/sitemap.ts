import type { MetadataRoute } from 'next';
import { getAllRobotSlugs, getAllManufacturerSlugs } from '@/lib/queries';

const BASE_URL = 'https://robonorth.ca';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [robotSlugs, manufacturerSlugs] = await Promise.all([
    getAllRobotSlugs(),
    getAllManufacturerSlugs(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/robots`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/manufacturers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/parts`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/compare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/inquiry`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/glossary`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/use-cases`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/warranty`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/press`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ];

  const robotPages: MetadataRoute.Sitemap = robotSlugs.map(slug => ({
    url: `${BASE_URL}/robots/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const manufacturerPages: MetadataRoute.Sitemap = manufacturerSlugs.map(slug => ({
    url: `${BASE_URL}/manufacturers/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = ['consumer', 'enterprise', 'research', 'announced'].map(cat => ({
    url: `${BASE_URL}/robots/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Use case pages
  const useCasePages: MetadataRoute.Sitemap = [
    'education', 'research', 'manufacturing', 'home-assistance', 'healthcare', 'entertainment',
  ].map(uc => ({
    url: `${BASE_URL}/robots/use-case/${uc}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const blogPosts: MetadataRoute.Sitemap = [
    'the-rise-of-humanoid-robots-in-canadian-industry',
    'top-5-humanoid-robots-available-in-canada-2026',
    'how-canadian-businesses-are-adopting-humanoid-robots',
  ].map(slug => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...robotPages, ...manufacturerPages, ...categoryPages, ...useCasePages, ...blogPosts];
}
