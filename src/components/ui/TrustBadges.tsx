'use client';

export default function TrustBadges() {
  return (
    <section className="py-8 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {/* Canadian-Owned — Task 28 */}
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
            <span className="text-lg">🇨🇦</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Canadian-Owned Business</span>
          </div>
          {/* Ships from Canada */}
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
            <span className="text-lg">📦</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Ships from Canada</span>
          </div>
          {/* CAD Pricing */}
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
            <span className="text-lg">💲</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Canadian Dollar Pricing</span>
          </div>
          {/* Bilingual */}
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
            <span className="text-lg">🔤</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Bilingual EN/FR</span>
          </div>
          {/* SSL Secured */}
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider">SSL Secured</span>
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
