import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getPartsCount, getFilteredPartsCount, getFilteredParts, getPartFacets } from '@/lib/queries';
import PartCard from '@/components/ui/PartCard';
import PartsSidebarFilters from '@/components/ui/PartsSidebarFilters';
import PartsMobileFilters from '@/components/ui/PartsMobileFilters';
import PartsSortSelect from '@/components/ui/PartsSortSelect';
import Pagination from '@/components/ui/Pagination';
import type { Part } from '@/types';
import { partCategoryLabels } from '@/data/parts-catalog';

export const metadata: Metadata = {
  title: 'Robot Parts & Components Catalog — 70+ Products',
  description: 'Browse 70+ robot parts and components: actuators, sensors, controllers, power systems, grippers, and software. Real prices in CAD. All with Canadian shipping.',
  openGraph: {
    title: 'Robot Parts & Components | RoboNorth',
    description: 'Actuators, sensors, controllers, power systems, grippers, and dev kits for humanoid robots. Ships to Canada.',
    url: 'https://robonorth.ca/parts',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'RoboNorth Robot Parts' }],
  },
  alternates: {
    canonical: 'https://robonorth.ca/parts',
  },
};

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PartsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = (params.category as string) || '';
  const manufacturer = (params.manufacturer as string) || '';
  const search = (params.q as string) || '';
  const inStockOnly = params.instock === '1';
  const minPrice = parseFloat((params.minPrice as string) || '') || 0;
  const maxPrice = parseFloat((params.maxPrice as string) || '') || 0;
  const robotFilter = (params.robot as string) || '';
  const sort = (params.sort as string) || 'featured';
  const page = Math.max(1, parseInt((params.page as string) || '1', 10) || 1);
  const perPage = 16;

  // Build where clause
  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (manufacturer) where.manufacturerSlug = manufacturer;
  if (inStockOnly) where.inStock = true;
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { manufacturer: { contains: search } },
      { description: { contains: search } },
      { subcategory: { contains: search } },
    ];
  }
  if (minPrice > 0 || maxPrice > 0) {
    const priceFilter: Record<string, number> = {};
    if (minPrice > 0) priceFilter.gte = minPrice;
    if (maxPrice > 0) priceFilter.lte = maxPrice;
    where.priceCAD = priceFilter;
  }
  if (robotFilter) {
    where.compatibility = { contains: robotFilter };
  }

  // Sort
  let orderBy: Record<string, string> = { featured: 'desc' };
  if (sort === 'price-asc') orderBy = { priceCAD: 'asc' };
  else if (sort === 'price-desc') orderBy = { priceCAD: 'desc' };
  else if (sort === 'name') orderBy = { name: 'asc' };
  else if (sort === 'newest') orderBy = { createdAt: 'desc' };
  else if (sort === 'featured') orderBy = { featured: 'desc' };

  // Fetch data
  const [allPartsCount, filteredCount, filteredParts, allForFacets] = await Promise.all([
    getPartsCount(),
    getFilteredPartsCount(where),
    getFilteredParts(where, orderBy, (page - 1) * perPage, perPage),
    getPartFacets(),
  ]);

  const totalPages = Math.ceil(filteredCount / perPage);

  // Build facets
  const categoryCounts: Record<string, number> = {};
  const manufacturerMap: Record<string, { slug: string; name: string; count: number }> = {};

  for (const p of allForFacets) {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    if (!manufacturerMap[p.manufacturerSlug]) {
      manufacturerMap[p.manufacturerSlug] = { slug: p.manufacturerSlug, name: p.manufacturer, count: 0 };
    }
    manufacturerMap[p.manufacturerSlug].count++;
  }

  const hasFilters = category || manufacturer || search || inStockOnly || minPrice || maxPrice || robotFilter;

  const filterProps = {
    totalCount: allPartsCount,
    filteredCount,
    categories: Object.entries(categoryCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([k, v]) => ({
        value: k,
        label: partCategoryLabels[k] || k,
        count: v,
      })),
    manufacturers: Object.values(manufacturerMap)
      .sort((a, b) => b.count - a.count)
      .map(m => ({ value: m.slug, label: m.name, count: m.count })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page header */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Catalog</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Robot Parts & Components</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
          Everything you need to build, repair, or upgrade humanoid robots — sourced with Canadian shipping
        </p>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <Suspense fallback={<div className="text-sm text-gray-400">Loading filters...</div>}>
              <PartsSidebarFilters {...filterProps} />
            </Suspense>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/80 dark:border-gray-700/80">
            <div className="flex items-center gap-3">
              <Suspense fallback={null}>
                <PartsMobileFilters {...filterProps} />
              </Suspense>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-bold text-gray-900 dark:text-white">{filteredCount}</span>
                {filteredCount !== allPartsCount && <span className="text-gray-400"> of {allPartsCount}</span>}
                {' '}parts
              </p>
              {hasFilters && (
                <a href="/parts" className="text-xs text-blue-600 hover:text-blue-700 font-medium lg:hidden">
                  Clear
                </a>
              )}
            </div>
            <Suspense fallback={null}>
              <PartsSortSelect current={sort} />
            </Suspense>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {filteredParts.map(part => (
              <PartCard key={part.id} part={part} />
            ))}
          </div>

          {/* Pagination */}
          <Suspense fallback={null}>
            <Pagination currentPage={page} totalPages={totalPages} basePath="/parts" />
          </Suspense>

          {filteredParts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🔍</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No parts found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm max-w-sm mx-auto">Try adjusting your filters or search query to find what you&apos;re looking for.</p>
              <a href="/parts" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-semibold">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                Clear all filters
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
