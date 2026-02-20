'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'robonorth-favorites';

export default function WishlistClient() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      setFavorites(stored);
    } catch {}
    setLoaded(true);
  }, []);

  const removeFavorite = (id: string) => {
    const next = favorites.filter(f => f !== id);
    setFavorites(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  if (!loaded) return <div className="max-w-4xl mx-auto px-4 py-16 text-center"><p className="text-gray-400">Loading...</p></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Wishlist</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Robots you&apos;ve saved for later. {favorites.length > 0 && `${favorites.length} item${favorites.length === 1 ? '' : 's'} saved.`}</p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-12 text-center">
          <div className="text-5xl mb-4">❤️</div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Browse robots and click the heart icon to save your favourites here.</p>
          <Link href="/robots" className="inline-flex px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
            Browse Robots →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.map(id => (
            <div key={id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-xl">🤖</div>
                <div>
                  <Link href={`/robots/${id}`} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Saved to wishlist</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/robots/${id}`} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">
                  View Details
                </Link>
                <button onClick={() => removeFavorite(id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Remove">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center">
        <p className="text-xs text-blue-700 dark:text-blue-400">
          💡 <Link href="/register" className="font-semibold underline">Create an account</Link> to sync your wishlist across devices and get price drop alerts.
        </p>
      </div>
    </div>
  );
}
