'use client';

import { useState } from 'react';

interface ImageGalleryProps {
  robotName: string;
  category: string;
}

const categoryGradients: Record<string, string> = {
  consumer: 'from-emerald-50 to-cyan-50 dark:from-emerald-950/30 dark:to-cyan-950/30',
  enterprise: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
  research: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
  announced: 'from-slate-50 to-gray-100 dark:from-slate-900/30 dark:to-gray-900/30',
};

export default function ImageGallery({ robotName, category }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const gradient = categoryGradients[category] || 'from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-900/30';

  // Placeholder images (ready for real photos)
  const placeholders = [
    { id: 'front', label: 'Front View', emoji: '🤖' },
    { id: 'side', label: 'Side View', emoji: '🤖' },
    { id: 'hand', label: 'Hand Detail', emoji: '🦾' },
    { id: 'back', label: 'Back View', emoji: '🔧' },
  ];

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className={`aspect-square bg-gradient-to-br ${gradient} border border-gray-200/80 dark:border-gray-700/80 rounded-3xl flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-dot-pattern opacity-40" />
        <div className="relative text-center">
          <span className="text-[140px] opacity-25">{placeholders[activeIndex].emoji}</span>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{placeholders[activeIndex].label}</p>
        </div>
        {/* Photo placeholder notice */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-gray-200/60 dark:border-gray-700/60">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            📸 Real product photos coming soon — {robotName}
          </p>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto gallery-container pb-1">
        {placeholders.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setActiveIndex(i)}
            className={`shrink-0 w-20 h-20 rounded-xl border-2 flex items-center justify-center transition-all ${
              i === activeIndex
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <span className="text-2xl opacity-40">{img.emoji}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
