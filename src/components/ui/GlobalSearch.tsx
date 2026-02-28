'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { robots } from '@/data/robots';
import { manufacturers } from '@/data/manufacturers';
import { partCategories } from '@/data/parts';
import { parts, partCategoryLabels } from '@/data/parts-catalog';
import { getAllBlogPosts } from '@/data/blog';

interface SearchResult {
  type: 'robot' | 'manufacturer' | 'part' | 'blog';
  title: string;
  subtitle: string;
  href: string;
  icon: string;
}

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [open]);

  // Debounce search to avoid re-filtering on every keystroke
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const performSearch = useCallback((q: string) => {
    if (!q.trim()) { setResults([]); return; }
    const lower = q.toLowerCase();
    const res: SearchResult[] = [];

    // Search robots
    robots.filter(r =>
      r.name.toLowerCase().includes(lower) ||
      r.manufacturer.toLowerCase().includes(lower) ||
      r.description.toLowerCase().includes(lower)
    ).slice(0, 5).forEach(r => res.push({
      type: 'robot', title: r.name, subtitle: `${r.manufacturer} · ${r.price}`,
      href: `/robots/${r.id}`, icon: '🤖',
    }));

    // Search manufacturers
    manufacturers.filter(m =>
      m.name.toLowerCase().includes(lower) ||
      m.country.toLowerCase().includes(lower)
    ).slice(0, 3).forEach(m => res.push({
      type: 'manufacturer', title: m.name, subtitle: m.country,
      href: `/manufacturers/${m.id}`, icon: '🏭',
    }));

    // Search individual parts
    parts.filter(p =>
      p.name.toLowerCase().includes(lower) ||
      p.manufacturer.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.subcategory.toLowerCase().includes(lower)
    ).slice(0, 5).forEach(p => {
      const priceStr = p.priceCAD > 0 ? `$${p.priceCAD.toLocaleString('en-CA')} CAD` : 'Free';
      const catLabel = partCategoryLabels[p.category] || p.category;
      res.push({
        type: 'part',
        title: p.name,
        subtitle: `${p.manufacturer} · ${priceStr} · ${catLabel}${p.inStock ? '' : ' · Out of stock'}`,
        href: `/parts/${p.id}`,
        icon: '🔧',
      });
    });

    // Search part categories
    partCategories.filter(pc =>
      pc.name.toLowerCase().includes(lower) ||
      pc.description.toLowerCase().includes(lower)
    ).slice(0, 2).forEach(pc => res.push({
      type: 'part', title: `Browse ${pc.name}`, subtitle: `${pc.itemCount} items`,
      href: '/parts', icon: '📦',
    }));

    // Search blog
    getAllBlogPosts().filter(b =>
      b.title.toLowerCase().includes(lower) ||
      b.excerpt.toLowerCase().includes(lower)
    ).slice(0, 3).forEach(b => res.push({
      type: 'blog', title: b.title, subtitle: b.category,
      href: `/blog/${b.slug}`, icon: '📝',
    }));

    setResults(res);
    setSelectedIndex(0);
  }, []);

  const search = useCallback((q: string) => {
    setQuery(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!q.trim()) { setResults([]); return; }
    debounceRef.current = setTimeout(() => performSearch(q), 150);
  }, [performSearch]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, []);

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      navigate(results[selectedIndex].href);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 bg-gray-50 dark:bg-gray-800 dark:text-gray-500 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <span>Search...</span>
        <kbd className="hidden lg:inline text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
      </button>

      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
        aria-label="Search"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="Search RoboNorth">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
          <div
            className="relative w-full max-w-lg mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-up"
            onClick={e => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 border-b border-gray-100 dark:border-gray-800">
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                placeholder="Search robots, brands, parts, articles..."
                value={query}
                onChange={e => search(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 py-4 text-sm bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                aria-label="Search robots, brands, parts, and articles"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-autocomplete="list"
              />
              <kbd className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono">ESC</kbd>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="max-h-80 overflow-y-auto py-2">
                {results.map((result, i) => (
                  <button
                    key={`${result.type}-${result.href}`}
                    onClick={() => navigate(result.href)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      i === selectedIndex
                        ? 'bg-blue-50 dark:bg-blue-900/30'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-lg shrink-0">{result.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{result.title}</div>
                      <div className="text-xs text-gray-500 truncate">{result.subtitle}</div>
                    </div>
                    <span className="text-[10px] text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full capitalize shrink-0">
                      {result.type}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {query && results.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-sm text-gray-500">No results for &ldquo;{query}&rdquo;</p>
              </div>
            )}

            {!query && (
              <div className="py-6 px-4 text-center">
                <p className="text-xs text-gray-400">Type to search across robots, brands, parts, and blog articles</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
