import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getReviewBySlug, getAllReviews } from '@/data/reviews';
import { getRobotBySlug } from '@/lib/queries';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export function generateStaticParams() {
  return getAllReviews().map(r => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) return { title: 'Review Not Found' };
  return {
    title: `${review.title} | RoboNorth`,
    description: review.excerpt,
    openGraph: {
      title: review.title,
      description: review.excerpt,
      type: 'article',
      publishedTime: review.date,
      authors: [review.author],
      url: `https://robonorth.ca/reviews/${review.slug}`,
    },
    alternates: { canonical: `https://robonorth.ca/reviews/${review.slug}` },
  };
}

function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((\/.+?)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium underline underline-offset-2">$1</a>')
    .replace(/\[(.+?)\]\((https?.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium underline underline-offset-2">$1</a>')
    .replace(/^---$/gm, '<hr class="my-8 border-gray-200 dark:border-gray-700" />')
    .replace(/^- (.+)$/gm, '<li class="ml-4 pl-2 text-gray-600 dark:text-gray-300 leading-relaxed list-disc">$1</li>')
    .replace(/\| (.+) \|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim()).map(c => c.trim());
      if (cells.every(c => /^[-:]+$/.test(c))) return '<!-- table separator -->';
      return `<tr>${cells.map(c => `<td class="px-4 py-2.5 border-b border-gray-100 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300">${c}</td>`).join('')}</tr>`;
    })
    .split('\n')
    .map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<')) return trimmed;
      if (trimmed.startsWith('<!-- ')) return '';
      return `<p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">${trimmed}</p>`;
    })
    .join('\n');
}

function ScoreRing({ score, size = 80 }: { score: number; size?: number }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 10) * circumference;
  const colour = score >= 8.5 ? '#10b981' : score >= 7 ? '#3b82f6' : score >= 5 ? '#f59e0b' : '#ef4444';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth={4} fill="none" className="dark:stroke-gray-700" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={colour} strokeWidth={4} fill="none" strokeDasharray={circumference} strokeDashoffset={circumference - progress} strokeLinecap="round" />
      </svg>
      <span className="absolute text-xl font-bold text-gray-900 dark:text-white">{score}</span>
    </div>
  );
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) notFound();

  const robot = await getRobotBySlug(review.robotId);
  const allReviews = getAllReviews();
  const otherReviews = allReviews.filter(r => r.slug !== slug).slice(0, 3);

  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: 'https://robonorth.ca' },
    { name: 'Reviews', url: 'https://robonorth.ca/reviews' },
    { name: review.robotName, url: `https://robonorth.ca/reviews/${review.slug}` },
  ]);

  const reviewLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: review.title,
    author: { '@type': 'Organization', name: 'RoboNorth' },
    datePublished: review.date,
    reviewBody: review.excerpt,
    itemReviewed: {
      '@type': 'Product',
      name: review.robotName,
      url: `https://robonorth.ca/robots/${review.robotId}`,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.score,
      bestRating: 10,
      worstRating: 0,
    },
  };

  const htmlContent = renderMarkdown(review.content);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <Link href="/reviews" className="hover:text-gray-600 dark:hover:text-gray-300">Reviews</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">{review.robotName}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main content */}
        <article className="lg:col-span-8">
          <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Badge text="Expert Review" variant="info" />
              <span className="text-sm text-gray-400 dark:text-gray-500">{review.readTime}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">{review.title}</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{review.excerpt}</p>

            {/* Score card */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex items-center gap-6">
              <ScoreRing score={review.score} size={90} />
              <div>
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">RoboNorth Score</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{review.score} / 10</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {review.score >= 9 ? 'Outstanding' : review.score >= 8 ? 'Excellent' : review.score >= 7 ? 'Very Good' : review.score >= 6 ? 'Good' : 'Average'}
                </div>
              </div>
              {robot && (
                <div className="ml-auto hidden sm:block">
                  <Button href={`/robots/${robot.id}`} size="sm">View Robot →</Button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500 mt-6">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold text-xs">RN</div>
              <span className="font-medium text-gray-700 dark:text-gray-300">{review.author}</span>
              <span>·</span>
              <time dateTime={review.date}>
                {new Date(review.date + 'T00:00:00').toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
          </header>

          {/* Article body */}
          <div className="prose-custom" dangerouslySetInnerHTML={{ __html: htmlContent }} />

          {/* Pros & Cons */}
          <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5">
              <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-3">✅ Pros</h3>
              <ul className="space-y-2">
                {review.pros.map((pro, i) => (
                  <li key={i} className="text-sm text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
                    <span className="shrink-0 mt-1">•</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-5">
              <h3 className="text-sm font-bold text-red-800 dark:text-red-300 uppercase tracking-wider mb-3">❌ Cons</h3>
              <ul className="space-y-2">
                {review.cons.map((con, i) => (
                  <li key={i} className="text-sm text-red-700 dark:text-red-300 flex items-start gap-2">
                    <span className="shrink-0 mt-1">•</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Verdict */}
          <section className="mt-8 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-3">🏆 Verdict</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{review.verdict}</p>
            <div className="mt-4 flex items-center gap-3">
              <ScoreRing score={review.score} size={60} />
              <span className="text-lg font-bold text-gray-900 dark:text-white">{review.score} / 10</span>
            </div>
          </section>

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Interested in the {review.robotName}?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get pricing, availability, and Canadian shipping details.</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {robot && <Button href={`/robots/${robot.id}`} size="sm">View Details</Button>}
                <Button href={`/inquiry?robot=${review.robotId}`} variant="outline" size="sm">Inquire Now</Button>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            {/* Robot quick specs */}
            {robot && (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Quick Specs</h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Price</span><span className="font-medium text-gray-900 dark:text-white">{robot.price}</span></div>
                  {robot.specs.height && <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Height</span><span className="font-medium text-gray-900 dark:text-white">{robot.specs.height} cm</span></div>}
                  {robot.specs.weight && <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Weight</span><span className="font-medium text-gray-900 dark:text-white">{robot.specs.weight} kg</span></div>}
                  {robot.specs.dof && <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">DOF</span><span className="font-medium text-gray-900 dark:text-white">{robot.specs.dof}</span></div>}
                  {robot.specs.payload && <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Payload</span><span className="font-medium text-gray-900 dark:text-white">{robot.specs.payload} kg</span></div>}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <Button href={`/robots/${robot.id}`} variant="outline" size="sm" className="w-full">Full Details →</Button>
                </div>
              </div>
            )}

            {/* More reviews */}
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">More Reviews</h3>
              <div className="space-y-4">
                {otherReviews.map(other => (
                  <Link key={other.slug} href={`/reviews/${other.slug}`} className="block group">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">{other.robotName}</h4>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400 shrink-0 ml-2">{other.score}/10</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{other.excerpt}</p>
                  </Link>
                ))}
              </div>
              <Link href="/reviews" className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 font-semibold mt-4">
                All Reviews →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
