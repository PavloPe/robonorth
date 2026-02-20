import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllReviews } from '@/data/reviews';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Humanoid Robot Reviews 2026 — Expert Analysis | RoboNorth',
  description: 'In-depth expert reviews of the top 13 humanoid robots in 2026. Unbiased scoring, pros & cons, and Canadian buying guidance for every major humanoid on the market.',
  keywords: ['humanoid robot reviews', 'robot reviews 2026', 'best humanoid robot review', 'unitree g1 review', 'figure 03 review', 'tesla optimus review'],
  openGraph: {
    title: 'Humanoid Robot Reviews 2026 — Expert Analysis',
    description: 'In-depth expert reviews of the top 13 humanoid robots. Unbiased scoring and Canadian buying guidance.',
    url: 'https://robonorth.ca/reviews',
    type: 'website',
  },
  alternates: { canonical: 'https://robonorth.ca/reviews' },
};

export default function ReviewsPage() {
  const reviews = getAllReviews().sort((a, b) => b.score - a.score);
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: 'https://robonorth.ca' },
    { name: 'Reviews', url: 'https://robonorth.ca/reviews' },
  ]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Reviews</span>
      </nav>

      <div className="mb-12">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Expert Analysis</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Humanoid Robot Reviews 2026</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl">
          In-depth expert reviews of the top humanoid robots, scored on capability, value, and real-world performance. Written by the RoboNorth team with a focus on Canadian buyers.
        </p>
      </div>

      <div className="space-y-6">
        {reviews.map((review, i) => {
          const scoreColour = review.score >= 8.5 ? 'text-emerald-600 dark:text-emerald-400' : review.score >= 7 ? 'text-blue-600 dark:text-blue-400' : 'text-amber-600 dark:text-amber-400';
          return (
            <Link key={review.slug} href={`/reviews/${review.slug}`} className="block group">
              <article className={`bg-white dark:bg-gray-900 border rounded-2xl p-6 transition-all hover:shadow-md ${
                i === 0 ? 'border-blue-200 dark:border-blue-800' : 'border-gray-200 dark:border-gray-700'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`text-3xl font-bold ${scoreColour}`}>{review.score}</div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">/ 10</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge text="Expert Review" variant="info" />
                      <span className="text-xs text-gray-400 dark:text-gray-500">{review.readTime}</span>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                      {review.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{review.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {review.pros.slice(0, 2).map((pro, j) => (
                        <span key={j} className="text-xs bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full">✅ {pro}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
