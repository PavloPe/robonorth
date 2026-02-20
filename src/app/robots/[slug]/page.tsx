import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRobotBySlug, getRelatedRobots, getAllRobotSlugs, getCompatibleParts } from '@/lib/queries';
import { robotJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';
import { robotExtras } from '@/data/robot-extras';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import RobotCard from '@/components/ui/RobotCard';
import ImageGallery from '@/components/ui/ImageGallery';
import VideoEmbed from '@/components/ui/VideoEmbed';
import RecentlyViewed from '@/components/ui/RecentlyViewed';
import RobotDetailTracker from '@/components/ui/RobotDetailTracker';
import ShareButton from '@/components/ui/ShareButton';
import FavoritesButton from '@/components/ui/FavoritesButton';
import NotifyMeButton from '@/components/ui/NotifyMeButton';
import DeliveryEstimator from '@/components/ui/DeliveryEstimator';
import CustomerReviews from '@/components/ui/CustomerReviews';
import SizeComparison from '@/components/ui/SizeComparison';
import PriceAlertSignup from '@/components/ui/PriceAlertSignup';
import AddToBasketButton from '@/components/ui/AddToBasketButton';
import PartCard from '@/components/ui/PartCard';
import LiveInquiryWidget from '@/components/ui/LiveInquiryWidget';

const availabilityVariant: Record<string, 'success' | 'warning' | 'info' | 'default'> = {
  shipping: 'success', preorder: 'info', pilot: 'warning', announced: 'default', prototype: 'default',
};
const availabilityLabels: Record<string, string> = {
  shipping: 'In Stock', preorder: 'Pre-Order', pilot: 'Pilot Program', announced: 'Coming Soon', prototype: 'Prototype',
};

export async function generateStaticParams() {
  const slugs = await getAllRobotSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const robot = await getRobotBySlug(slug);
  if (!robot) return { title: 'Robot Not Found' };

  const title = `${robot.name} — ${robot.price}`;
  const description = `${robot.name} by ${robot.manufacturer}. ${robot.price}. ${robot.description.slice(0, 140)}`;

  return {
    title,
    description,
    openGraph: {
      title: `${robot.name} — ${robot.price} | RoboNorth`,
      description,
      type: 'website',
      url: `https://robonorth.ca/robots/${robot.id}`,
      images: [{ url: robot.imageUrl || '/og-default.png', width: 1200, height: 630, alt: robot.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${robot.name} — ${robot.price}`,
      description: `${robot.manufacturer} · ${robot.price} · ${robot.canadaAvailable ? 'Ships to Canada 🇨🇦' : ''}`,
      images: [robot.imageUrl || '/og-default.png'],
    },
    alternates: {
      canonical: `https://robonorth.ca/robots/${robot.id}`,
    },
  };
}

// Spec bar config: field, label, icon, unit, max for progress bar
const specBarConfig = [
  { key: 'height', label: 'Height', icon: '📏', unit: 'cm', max: 200 },
  { key: 'weight', label: 'Weight', icon: '⚖️', unit: 'kg', max: 100 },
  { key: 'dof', label: 'Degrees of Freedom', icon: '🦾', unit: '', max: 80 },
  { key: 'payload', label: 'Payload', icon: '📦', unit: 'kg', max: 50 },
  { key: 'speed', label: 'Max Speed', icon: '⚡', unit: 'km/h', max: 15 },
] as const;

export default async function RobotDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const robot = await getRobotBySlug(slug);
  if (!robot) notFound();

  const related = await getRelatedRobots(robot);
  const compatibleParts = await getCompatibleParts(robot.id);
  const extras = robotExtras[robot.id];

  const numericSpecs = specBarConfig
    .map(cfg => {
      const val = robot.specs[cfg.key as keyof typeof robot.specs];
      return typeof val === 'number' && val > 0 ? { ...cfg, value: val } : null;
    })
    .filter(Boolean) as Array<{ key: string; label: string; icon: string; unit: string; max: number; value: number }>;

  const textSpecs = [
    { label: 'Battery', icon: '🔋', value: robot.specs.battery },
    { label: 'Country of Origin', icon: '🌍', value: robot.country },
    { label: 'Category', icon: '📂', value: robot.category.charAt(0).toUpperCase() + robot.category.slice(1) },
    { label: 'Use Cases', icon: '🎯', value: robot.useCase.join(', ') },
  ].filter(s => s.value);

  const jsonLd = robotJsonLd(robot);
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: 'https://robonorth.ca' },
    { name: 'Robots', url: 'https://robonorth.ca/robots' },
    { name: robot.name, url: `https://robonorth.ca/robots/${robot.id}` },
  ]);
  const faqLd = extras?.faqs?.length ? faqJsonLd(extras.faqs) : null;
  const isPilotOrEnterprise = robot.availability === 'pilot' || robot.category === 'enterprise';
  const isPreRelease = robot.availability === 'announced' || robot.availability === 'prototype';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      {/* Track robot view */}
      <RobotDetailTracker id={robot.id} name={robot.name} manufacturer={robot.manufacturer} price={robot.price} />

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <Link href="/robots" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Robots</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">{robot.name}</span>
      </nav>

      {/* Main product section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
        {/* Image Gallery */}
        <ImageGallery robotName={robot.name} category={robot.category} />

        {/* Details */}
        <div className="flex flex-col justify-center">
          <Link href={`/manufacturers/${robot.manufacturerSlug}`} className="text-sm text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider mb-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1.5 w-fit">
            {robot.manufacturer}
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{robot.name}</h1>
          
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Badge text={availabilityLabels[robot.availability] || robot.availability} variant={availabilityVariant[robot.availability] || 'default'} dot />
            {robot.canadaAvailable && <Badge text="🇨🇦 Ships to Canada" variant="success" />}
          </div>

          <div className="mb-6">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{robot.price}</div>
            {extras?.cadPricing && (
              <div className="mt-1.5">
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{extras.cadPricing.cadEstimate}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">{extras.cadPricing.exchangeNote}</span>
              </div>
            )}
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{robot.description}</p>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <Button href={`/inquiry?robot=${robot.id}`} size="lg">
              <span className="flex items-center gap-2">
                Inquire Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </span>
            </Button>
            {isPilotOrEnterprise && (
              <Button href={`/inquiry?robot=${robot.id}&type=quote`} variant="dark" size="lg">
                Request a Quote
              </Button>
            )}
            {isPreRelease && <NotifyMeButton robotName={robot.name} robotId={robot.id} />}
            <AddToBasketButton itemType="robot" itemId={robot.id} itemName={robot.name} price={robot.price} />
            <Button href={`/compare?robots=${robot.id}`} variant="outline" size="lg">Compare</Button>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <ShareButton title={robot.name} />
            <FavoritesButton robotId={robot.id} robotName={robot.name} />
          </div>
          {/* Price alert — Improvement #47 */}
          <PriceAlertSignup robotId={robot.id} robotName={robot.name} currentPrice={robot.price} />
        </div>
      </div>

      {/* Specifications */}
      <section className="mb-16">
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Technical</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Specifications</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Numeric specs with progress bars */}
          {numericSpecs.length > 0 && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-5">Performance</h3>
              <div className="space-y-5">
                {numericSpecs.map(spec => {
                  const pct = Math.min(100, (spec.value / spec.max) * 100);
                  return (
                    <div key={spec.key}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                          <span className="text-base">{spec.icon}</span>
                          {spec.label}
                        </span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {spec.value}{spec.unit && ` ${spec.unit}`}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full spec-bar-fill"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Text specs */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-5">Details</h3>
            <div className="space-y-0">
              {textSpecs.map((spec, i) => (
                <div key={spec.label} className={`flex items-start justify-between py-3.5 ${i < textSpecs.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 shrink-0">
                    <span className="text-base">{spec.icon}</span>
                    {spec.label}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white text-right ml-4">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shipping & Import Info */}
      {extras?.shipping && (
        <section className="mb-16">
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Import</p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shipping to Canada</h2>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Ships From', value: extras.shipping.origin, icon: '📍' },
                { label: 'Estimated Shipping', value: extras.shipping.estimatedShipping, icon: '🚚' },
                { label: 'Customs Duty', value: extras.shipping.customsDuty, icon: '🏛️' },
                { label: 'HS Code', value: extras.shipping.hsCode, icon: '📋' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{item.label}</div>
                    <div className="text-sm text-gray-900 dark:text-white mt-0.5">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            {extras.shipping.importNotes && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 leading-relaxed">
                💡 {extras.shipping.importNotes}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Video Embed with real YouTube IDs */}
      {extras?.videos && extras.videos.length > 0 ? (
        <section className="mb-16">
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Media</p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Videos</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {extras.videos.map(video => (
              <div key={video.youtubeId} className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{video.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <VideoEmbed robotName={robot.name} manufacturer={robot.manufacturer} />
      )}

      {/* Delivery Estimator */}
      <section className="mb-16">
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Delivery</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Estimated Delivery</h2>
        </div>
        <div className="max-w-md">
          <DeliveryEstimator availability={robot.availability} country={robot.country} canadaAvailable={robot.canadaAvailable} />
        </div>
      </section>

      {/* FAQ Section */}
      {extras?.faqs && extras.faqs.length > 0 && (
        <section className="mb-16">
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">FAQ</p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {extras.faqs.map((faq, i) => (
              <details key={i} className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-700/80 rounded-xl group">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {faq.question}
                  <svg className="w-4 h-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-6 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Size Comparison — Improvement #11 */}
      <section className="mb-16">
        <SizeComparison robots={[{ name: robot.name, height: robot.specs.height, weight: robot.specs.weight }]} />
      </section>

      {/* Customer Reviews — Improvement #27 */}
      <CustomerReviews robotId={robot.id} />

      {/* Recently Viewed */}
      <RecentlyViewed excludeId={robot.id} />

      {/* Compatible Parts */}
      {compatibleParts.length > 0 && (
        <section className="mb-16">
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Compatible</p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Parts & Components</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Parts tested and verified to work with the {robot.name}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {compatibleParts.slice(0, 4).map(part => <PartCard key={part.id} part={part} />)}
          </div>
          {compatibleParts.length > 4 && (
            <div className="text-center mt-6">
              <a href={`/parts?robot=${robot.id}`} className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                View all {compatibleParts.length} compatible parts →
              </a>
            </div>
          )}
        </section>
      )}

      {/* Live Inquiry Widget */}
      <LiveInquiryWidget preselectedItem={robot.id} preselectedType="robot" />

      {/* Related robots */}
      {related.length > 0 && (
        <section className="mb-8">
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Similar</p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">You Might Also Like</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(r => <RobotCard key={r.id} robot={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
