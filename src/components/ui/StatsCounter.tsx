'use client';

import { useIntersectionObserver, useCountUp } from '@/hooks/useIntersectionObserver';

const stats = [
  { end: 32, suffix: '+', label: 'Robots Cataloged', icon: '🤖' },
  { end: 21, suffix: '+', label: 'Manufacturers', icon: '🏭' },
  { end: 71, suffix: '+', label: 'Parts & Components', icon: '🔧' },
  { end: 10, suffix: '', label: 'Canadian Provinces', icon: '🇨🇦' },
];

function StatItem({ end, suffix, label, icon, isVisible }: {
  end: number; suffix: string; label: string; icon: string; isVisible: boolean;
}) {
  const count = useCountUp(end, 2000, isVisible);
  return (
    <div className="text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-1">
        {isVisible ? count : 0}{suffix}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}

export default function StatsCounter() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-gray-900 dark:to-blue-950/20 rounded-3xl border border-gray-200/60 dark:border-gray-700/60 p-10 sm:p-14">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">By the Numbers</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Canada&apos;s Most Comprehensive Robot Catalog
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(stat => (
            <StatItem key={stat.label} {...stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
