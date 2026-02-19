'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import Link from 'next/link';

interface CompareItem {
  id: string;
  name: string;
  manufacturer: string;
}

interface CompareContextType {
  items: CompareItem[];
  addItem: (item: CompareItem) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
  isInCompare: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearAll: () => {},
  isInCompare: () => false,
});

export function useCompare() {
  return useContext(CompareContext);
}

const MAX_COMPARE = 4;
const STORAGE_KEY = 'robonorth-compare';

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      setItems(stored);
    } catch { /* ignore */ }
  }, []);

  const save = useCallback((next: CompareItem[]) => {
    setItems(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  }, []);

  const addItem = useCallback((item: CompareItem) => {
    setItems(prev => {
      if (prev.length >= MAX_COMPARE || prev.some(i => i.id === item.id)) return prev;
      const next = [...prev, item];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => {
      const next = prev.filter(i => i.id !== id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const clearAll = useCallback(() => save([]), [save]);
  const isInCompare = useCallback((id: string) => items.some(i => i.id === id), [items]);

  return (
    <CompareContext.Provider value={{ items, addItem, removeItem, clearAll, isInCompare }}>
      {children}
      <CompareBar />
    </CompareContext.Provider>
  );
}

function CompareBar() {
  const { items, removeItem, clearAll } = useCompare();

  if (items.length === 0) return null;

  const compareUrl = `/compare?robots=${items.map(i => i.id).join(',')}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 animate-fade-in-up no-print">
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <div className="bg-slate-900 dark:bg-gray-800 text-white rounded-2xl shadow-2xl border border-slate-700 dark:border-gray-600 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="shrink-0">
                <span className="text-sm font-semibold">⚖️ Compare</span>
                <span className="text-xs text-slate-400 ml-1.5">{items.length}/{MAX_COMPARE}</span>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {items.map(item => (
                  <div key={item.id} className="shrink-0 flex items-center gap-1.5 bg-slate-800 dark:bg-gray-700 rounded-lg px-3 py-1.5">
                    <span className="text-xs font-medium truncate max-w-[120px]">{item.name}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-white transition-colors shrink-0"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={clearAll}
                className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-1"
              >
                Clear
              </button>
              <Link
                href={compareUrl}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  items.length >= 2
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
                onClick={e => { if (items.length < 2) e.preventDefault(); }}
              >
                Compare {items.length >= 2 ? '→' : `(need ${2 - items.length} more)`}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
