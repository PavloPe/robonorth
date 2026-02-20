'use client';

export default function TrustBadges() {
  return (
    <section className="py-8 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {/* Canadian Business */}
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
            <span className="text-lg">🇨🇦</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Canadian Business</span>
          </div>
          {/* SSL Secured */}
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider">SSL Secured</span>
          </div>
          {/* Privacy Protected */}
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider">Privacy Protected</span>
          </div>
          {/* WCAG Accessible */}
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
            <span className="text-lg">♿</span>
            <span className="text-xs font-semibold uppercase tracking-wider">WCAG 2.1 AA</span>
          </div>
          {/* Expert Curated */}
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider">Expert Curated</span>
          </div>
        </div>
      </div>
    </section>
  );
}
