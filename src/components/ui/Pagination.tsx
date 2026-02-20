'use client';

import { useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const searchParams = useSearchParams();

  const createPageUrl = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }, [searchParams, basePath]);

  // Inject rel=prev/next link tags for SEO (#26)
  useEffect(() => {
    document.querySelectorAll('link[data-pagination]').forEach(el => el.remove());

    if (totalPages <= 1) return;

    if (currentPage > 1) {
      const prevLink = document.createElement('link');
      prevLink.rel = 'prev';
      prevLink.href = createPageUrl(currentPage - 1);
      prevLink.setAttribute('data-pagination', 'true');
      document.head.appendChild(prevLink);
    }
    if (currentPage < totalPages) {
      const nextLink = document.createElement('link');
      nextLink.rel = 'next';
      nextLink.href = createPageUrl(currentPage + 1);
      nextLink.setAttribute('data-pagination', 'true');
      document.head.appendChild(nextLink);
    }

    return () => {
      document.querySelectorAll('link[data-pagination]').forEach(el => el.remove());
    };
  }, [currentPage, totalPages, createPageUrl]);

  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const pages: (number | 'ellipsis')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('ellipsis');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('ellipsis');
    pages.push(totalPages);
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1 mt-10">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          rel="prev"
          aria-label="Go to previous page"
        >
          ← Prev
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm font-medium text-gray-300 dark:text-gray-600 cursor-not-allowed" aria-disabled="true">← Prev</span>
      )}

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === 'ellipsis' ? (
          <span key={`e${i}`} className="px-2 py-2 text-sm text-gray-400" aria-hidden="true">…</span>
        ) : (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
            }`}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          rel="next"
          aria-label="Go to next page"
        >
          Next →
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm font-medium text-gray-300 dark:text-gray-600 cursor-not-allowed" aria-disabled="true">Next →</span>
      )}
    </nav>
  );
}
