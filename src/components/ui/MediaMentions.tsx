'use client';

// Task 31: "As Seen In" media mentions section
const publications = [
  { name: 'TechCrunch', logo: 'TC' },
  { name: 'The Globe and Mail', logo: 'G&M' },
  { name: 'BetaKit', logo: 'BK' },
  { name: 'IEEE Spectrum', logo: 'IEEE' },
  { name: 'MaRS Discovery', logo: 'MaRS' },
  { name: 'Financial Post', logo: 'FP' },
];

export default function MediaMentions() {
  return (
    <section className="py-10 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center mb-6">As featured in</p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {publications.map(pub => (
            <div key={pub.name} className="flex items-center justify-center w-24 h-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200/50 dark:border-gray-700/50 opacity-40 hover:opacity-70 transition-opacity cursor-default" title={pub.name}>
              <span className="text-sm font-bold text-gray-400 dark:text-gray-500">{pub.logo}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-gray-300 dark:text-gray-600 text-center mt-4">Publication logos appear when coverage is confirmed</p>
      </div>
    </section>
  );
}
