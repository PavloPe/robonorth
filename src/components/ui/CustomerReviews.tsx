'use client';

import { useState } from 'react';

// Improvement #27: Customer review/rating placeholders on robot detail pages

interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

const sampleReviews: Record<string, Review[]> = {
  default: [
    { id: '1', author: 'David K.', role: 'Lab Manager', rating: 5, date: '2026-01-15', text: 'Exceeded expectations for our research lab. Setup was straightforward and support was excellent.', verified: true },
    { id: '2', author: 'Michelle R.', role: 'VP Operations', rating: 4, date: '2025-12-20', text: 'Good performance for the price point. Battery life could be better but overall very capable.', verified: true },
    { id: '3', author: 'James L.', role: 'CTO', rating: 5, date: '2025-11-10', text: 'This robot has transformed our pilot program. The AI capabilities are genuinely impressive.', verified: false },
  ],
};

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const s = size === 'md' ? 'w-5 h-5' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className={`${s} ${i <= rating ? 'text-amber-400' : 'text-gray-200 dark:text-gray-700'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function CustomerReviews({ robotId }: { robotId: string }) {
  const [showForm, setShowForm] = useState(false);
  const reviews = sampleReviews[robotId] || sampleReviews.default;
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section className="mb-16">
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Reviews</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Reviews</h2>
      </div>

      {/* Summary */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{avgRating.toFixed(1)}</p>
            <StarRating rating={Math.round(avgRating)} size="md" />
            <p className="text-xs text-gray-400 mt-1">{reviews.length} reviews</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map(star => {
              const count = reviews.filter(r => r.rating === star).length;
              const pct = (count / reviews.length) * 100;
              return (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500 w-4">{star}★</span>
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-gray-400 w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-700/80 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-400">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{review.author}</span>
                    {review.verified && (
                      <span className="text-[9px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded-md font-semibold">✓ Verified</span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400">{review.role} · {review.date}</p>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{review.text}</p>
          </div>
        ))}
      </div>

      {/* Write review CTA */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 text-sm text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300"
        >
          Write a Review →
        </button>
      ) : (
        <div className="mt-4 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-700/80 rounded-xl p-5">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Write a Review</p>
          <p className="text-xs text-gray-400 mb-4">Reviews are moderated before publishing. Only verified purchases will be marked.</p>
          <div className="space-y-3">
            <input type="text" placeholder="Your name" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            <textarea placeholder="Write your review..." rows={3} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none" />
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">Submit Review</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-500 text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
