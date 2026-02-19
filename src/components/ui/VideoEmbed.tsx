'use client';

import { useState } from 'react';

interface VideoEmbedProps {
  robotName: string;
  manufacturer: string;
}

export default function VideoEmbed({ robotName, manufacturer }: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  // Placeholder — replace with actual YouTube video IDs per robot
  const placeholderVideoId = 'dQw4w9WgXcQ';

  return (
    <section className="mb-16">
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Demo</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Video Overview</h2>
      </div>

      <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {!loaded ? (
          <button
            onClick={() => setLoaded(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 group cursor-pointer"
          >
            {/* Play button */}
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-red-700 transition-colors group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Watch {robotName} Demo
              </p>
              <p className="text-xs text-gray-400 mt-1">
                by {manufacturer} · YouTube
              </p>
            </div>
          </button>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${placeholderVideoId}?autoplay=1&rel=0`}
            title={`${robotName} demo video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            loading="lazy"
          />
        )}
      </div>
    </section>
  );
}
