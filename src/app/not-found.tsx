import Button from '@/components/ui/Button';
import Link from 'next/link';

// Improvement #4: Custom 404 page with CSS robot illustration
export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />

      <div className="text-center max-w-lg relative z-10">
        {/* CSS Robot Art */}
        <div className="relative mb-8 flex justify-center" aria-hidden="true">
          {/* Robot body */}
          <div className="relative w-48 h-56">
            {/* Antenna */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50" />
            </div>
            {/* Head */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-24 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded-2xl border-2 border-slate-300 dark:border-slate-500 shadow-lg">
              {/* Eyes */}
              <div className="flex justify-center gap-6 mt-5">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full shadow-inner relative overflow-hidden">
                  <div className="absolute top-1 right-1 w-2 h-2 bg-white/60 rounded-full" />
                  <div className="absolute bottom-1 left-1 w-5 h-3 bg-blue-600/30 rounded-full" />
                </div>
                <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full shadow-inner relative overflow-hidden">
                  <div className="absolute top-1 right-1 w-2 h-2 bg-white/60 rounded-full" />
                  {/* X eye for confusion */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold opacity-80">×</span>
                  </div>
                </div>
              </div>
              {/* Mouth */}
              <div className="mt-3 mx-auto w-12 h-4 bg-slate-300 dark:bg-slate-500 rounded-md flex items-center justify-center gap-0.5 overflow-hidden">
                <div className="w-1.5 h-full bg-slate-400/50" />
                <div className="w-1.5 h-full bg-slate-400/50" />
                <div className="w-1.5 h-full bg-slate-400/50" />
                <div className="w-1.5 h-full bg-slate-400/50" />
                <div className="w-1.5 h-full bg-slate-400/50" />
              </div>
              {/* Ears */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-8 bg-gradient-to-r from-slate-300 to-slate-200 dark:from-slate-600 dark:to-slate-500 rounded-l-lg border-l-2 border-y-2 border-slate-300 dark:border-slate-500" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-8 bg-gradient-to-l from-slate-300 to-slate-200 dark:from-slate-600 dark:to-slate-500 rounded-r-lg border-r-2 border-y-2 border-slate-300 dark:border-slate-500" />
            </div>
            {/* Neck */}
            <div className="absolute top-[118px] left-1/2 -translate-x-1/2 w-6 h-4 bg-slate-300 dark:bg-slate-600 rounded-sm" />
            {/* Body */}
            <div className="absolute top-[134px] left-1/2 -translate-x-1/2 w-36 h-24 bg-gradient-to-br from-slate-200 via-blue-50 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded-2xl border-2 border-slate-300 dark:border-slate-500 shadow-lg">
              {/* Chest plate */}
              <div className="mt-3 mx-auto w-16 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-xl border border-blue-200 dark:border-blue-700 flex items-center justify-center">
                <span className="text-2xl font-black text-blue-500/40 dark:text-blue-400/40">404</span>
              </div>
              {/* Buttons */}
              <div className="flex justify-center gap-2 mt-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                <div className="w-2 h-2 bg-red-400 rounded-full" />
              </div>
            </div>
            {/* Arms */}
            <div className="absolute top-[140px] -left-2 w-5 h-16 bg-gradient-to-b from-slate-300 to-slate-200 dark:from-slate-600 dark:to-slate-500 rounded-full border border-slate-300 dark:border-slate-500 rotate-[15deg]" />
            <div className="absolute top-[140px] -right-2 w-5 h-16 bg-gradient-to-b from-slate-300 to-slate-200 dark:from-slate-600 dark:to-slate-500 rounded-full border border-slate-300 dark:border-slate-500 -rotate-[15deg]" />
          </div>
        </div>

        {/* 404 big text behind */}
        <div className="relative mb-4">
          <div className="text-[100px] sm:text-[140px] font-black text-gray-100 dark:text-gray-800 leading-none select-none absolute inset-0 flex items-center justify-center -mt-4">
            404
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 relative">
          Page not found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
          Our robot looked everywhere but couldn&apos;t find this page. It might have been moved, deleted, or never existed.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Button href="/" size="lg">← Go Home</Button>
          <Button href="/robots" variant="outline" size="lg">Browse Robots</Button>
        </div>

        {/* Quick links */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-4">Popular pages</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { href: '/robots', label: 'Robot Catalog' },
              { href: '/manufacturers', label: 'Brands' },
              { href: '/compare', label: 'Compare' },
              { href: '/quiz', label: 'Robot Quiz' },
              { href: '/contact', label: 'Contact' },
              { href: '/blog', label: 'Blog' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
