"use client";

import { useState, useMemo } from 'react';
import type { Robot } from '@/types';
import RobotCard from './RobotCard';
import FilterBar, { type Filters } from './FilterBar';

export default function RobotCatalog({ robots }: { robots: Robot[] }) {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: '',
    availability: '',
    priceRange: '',
  });

  const filtered = useMemo(() => {
    return robots.filter(r => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!r.name.toLowerCase().includes(q) && !r.manufacturer.toLowerCase().includes(q)) return false;
      }
      if (filters.category && r.category !== filters.category) return false;
      if (filters.availability && r.availability !== filters.availability) return false;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (r.priceMin < min || r.priceMin > max) return false;
      }
      return true;
    });
  }, [robots, filters]);

  return (
    <>
      <FilterBar filters={filters} onChange={setFilters} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(robot => (
          <RobotCard key={robot.id} robot={robot} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">No robots match your filters. Try adjusting your criteria.</p>
      )}
      <p className="text-center text-gray-600 text-sm mt-8">Showing {filtered.length} of {robots.length} robots</p>
    </>
  );
}
