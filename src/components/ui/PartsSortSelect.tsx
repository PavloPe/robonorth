"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function PartsSortSelect({ current }: { current: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'featured') {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    router.push(`/parts?${params.toString()}`);
  }, [router, searchParams]);

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-gray-400 hidden sm:block">Sort:</label>
      <select
        value={current}
        onChange={e => handleSort(e.target.value)}
        className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
      >
        <option value="featured">Featured</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="name">Name A–Z</option>
        <option value="newest">Newest First</option>
      </select>
    </div>
  );
}
