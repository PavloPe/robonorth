import type { Metadata } from 'next';
import { Suspense } from 'react';
import prisma from '@/lib/db';
import RobotCard from '@/components/ui/RobotCard';
import SidebarFilters from '@/components/ui/SidebarFilters';
import type { Robot } from '@/types';

export const metadata: Metadata = {
  title: 'Humanoid Robot Catalog',
  description: 'Browse all humanoid robots available for purchase, pre-order, or coming soon. Compare specs, prices, and availability across 22+ models.',
};

export const dynamic = 'force-dynamic';

// Price range config
const priceRanges = [
  { value: '0-10000', label: 'Under $10K', min: 0, max: 10000 },
  { value: '10000-30000', label: '$10K – $30K', min: 10000, max: 30000 },
  { value: '30000-100000', label: '$30K – $100K', min: 30000, max: 100000 },
  { value: '100000-500000', label: '$100K – $500K', min: 100000, max: 500000 },
  { value: '500000-9999999', label: '$500K+', min: 500000, max: 9999999 },
];

const availabilityLabels: Record<string, string> = {
  shipping: 'In Stock',
  preorder: 'Pre-Order',
  pilot: 'Pilot Program',
  announced: 'Coming Soon',
  prototype: 'Prototype',
};

const categoryLabels: Record<string, string> = {
  consumer: 'Consumer',
  enterprise: 'Enterprise',
  research: 'Research',
  announced: 'Announced',
};

function dbRobotToRobot(r: {
  id: string; name: string; manufacturer: string; manufacturerSlug: string;
  price: string; priceMin: number; availability: string; category: string;
  useCase: string; description: string; country: string; imageUrl: string;
  featured: boolean; canadaAvailable: boolean;
  specHeight: number | null; specWeight: number | null; specDof: number | null;
  specBattery: string | null; specPayload: number | null; specSpeed: number | null;
}): Robot {
  return {
    id: r.id,
    name: r.name,
    manufacturer: r.manufacturer,
    manufacturerSlug: r.manufacturerSlug,
    price: r.price,
    priceMin: r.priceMin,
    availability: r.availability as Robot['availability'],
    category: r.category as Robot['category'],
    useCase: JSON.parse(r.useCase),
    description: r.description,
    country: r.country,
    imageUrl: r.imageUrl,
    featured: r.featured,
    canadaAvailable: r.canadaAvailable,
    specs: {
      height: r.specHeight,
      weight: r.specWeight,
      dof: r.specDof,
      battery: r.specBattery,
      payload: r.specPayload,
      speed: r.specSpeed,
    },
  };
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RobotsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = (params.category as string) || '';
  const availability = (params.availability as string) || '';
  const manufacturer = (params.manufacturer as string) || '';
  const country = (params.country as string) || '';
  const priceRange = (params.price as string) || '';
  const search = (params.q as string) || '';
  const canadaOnly = params.canada === '1';
  const sort = (params.sort as string) || 'featured';

  // Build where clause
  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (availability) where.availability = availability;
  if (manufacturer) where.manufacturerSlug = manufacturer;
  if (country) where.country = country;
  if (canadaOnly) where.canadaAvailable = true;
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { manufacturer: { contains: search } },
      { description: { contains: search } },
    ];
  }
  if (priceRange) {
    const range = priceRanges.find(r => r.value === priceRange);
    if (range) {
      where.priceMin = { gte: range.min, lte: range.max };
    }
  }

  // Sort
  let orderBy: Record<string, string> = { name: 'asc' };
  if (sort === 'price-asc') orderBy = { priceMin: 'asc' };
  else if (sort === 'price-desc') orderBy = { priceMin: 'desc' };
  else if (sort === 'name') orderBy = { name: 'asc' };
  else if (sort === 'featured') orderBy = { featured: 'desc' };

  // Fetch data
  const [allRobots, filteredRobots, allForFacets] = await Promise.all([
    prisma.robot.count(),
    prisma.robot.findMany({ where, orderBy }),
    prisma.robot.findMany({ select: { category: true, availability: true, manufacturerSlug: true, manufacturer: true, country: true, priceMin: true } }),
  ]);

  // Build facet counts
  const categoryCounts: Record<string, number> = {};
  const availabilityCounts: Record<string, number> = {};
  const manufacturerMap: Record<string, { slug: string; name: string; count: number }> = {};
  const countryCounts: Record<string, number> = {};

  for (const r of allForFacets) {
    categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
    availabilityCounts[r.availability] = (availabilityCounts[r.availability] || 0) + 1;
    if (!manufacturerMap[r.manufacturerSlug]) {
      manufacturerMap[r.manufacturerSlug] = { slug: r.manufacturerSlug, name: r.manufacturer, count: 0 };
    }
    manufacturerMap[r.manufacturerSlug].count++;
    countryCounts[r.country] = (countryCounts[r.country] || 0) + 1;
  }

  const robots = filteredRobots.map(dbRobotToRobot);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Humanoid Robot Catalog</h1>
        <p className="text-gray-500 text-sm mt-1">
          Every humanoid robot you can buy, pre-order, or watch in 2026
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 shrink-0">
          <Suspense fallback={<div className="text-sm text-gray-400">Loading filters...</div>}>
            <SidebarFilters
              totalCount={allRobots}
              filteredCount={filteredRobots.length}
              categories={Object.entries(categoryCounts).map(([k, v]) => ({
                value: k, label: categoryLabels[k] || k, count: v,
              }))}
              availabilities={Object.entries(availabilityCounts).map(([k, v]) => ({
                value: k, label: availabilityLabels[k] || k, count: v,
              }))}
              manufacturers={Object.values(manufacturerMap)
                .sort((a, b) => b.count - a.count)
                .map(m => ({ value: m.slug, label: m.name, count: m.count }))}
              countries={Object.entries(countryCounts)
                .sort(([, a], [, b]) => b - a)
                .map(([k, v]) => ({ value: k, label: k, count: v }))}
              priceRanges={priceRanges.map(r => ({ value: r.value, label: r.label }))}
            />
          </Suspense>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <p className="text-sm text-gray-500 lg:hidden">
              <span className="font-semibold text-gray-900">{filteredRobots.length}</span> robots
            </p>
            <div className="flex items-center gap-2 ml-auto">
              <label className="text-xs text-gray-500">Sort by:</label>
              <SortSelect current={sort} />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {robots.map(robot => (
              <RobotCard key={robot.id} robot={robot} />
            ))}
          </div>

          {robots.length === 0 && (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-gray-500 mb-2">No robots match your filters.</p>
              <a href="/robots" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Clear all filters</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SortSelect({ current }: { current: string }) {
  return (
    <form>
      <select
        name="sort"
        defaultValue={current}
        onChange={(e) => {
          const form = e.target.closest('form');
          if (form) form.submit();
        }}
        className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="featured">Featured</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="name">Name A–Z</option>
      </select>
    </form>
  );
}
