import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getIndustryBySlug, getAllIndustrySlugs, industries } from '@/data/industries';
import { getRobotBySlug } from '@/lib/queries';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export function generateStaticParams() {
  return getAllIndustrySlugs().map(industry => ({ industry }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry } = await params;
  const data = getIndustryBySlug(industry);
  if (!data) return { title: 'Industry Not Found' };
  return {
    title: data.title,
    description: data.metaDescription,
    openGraph: {
      title: data.title,
      description: data.metaDescription,
      url: `https://robonorth.ca/robots-for/${industry}`,
      type: 'website',
    },
    alternates: { canonical: `https://robonorth.ca/robots-for/${industry}` },
  };
}

const availabilityLabels: Record<string, string> = {
  shipping: 'In Stock', preorder: 'Pre-Order', pilot: 'Pilot Program', announced: 'Coming Soon', prototype: 'Prototype',
};

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const data = getIndustryBySlug(industry);
  if (!data) notFound();

  const robots = (await Promise.all(data.robotIds.map(id => getRobotBySlug(id)))).filter(Boolean);

  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: 'https://robonorth.ca' },
    { name: 'Robots For', url: 'https://robonorth.ca/robots-for/manufacturing' },
    { name: data.name, url: `https://robonorth.ca/robots-for/${industry}` },
  ]);

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <Link href="/use-cases" className="hover:text-gray-600 dark:hover:text-gray-300">Use Cases</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">{data.name}</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <span className="text-5xl mb-4 block">{data.icon}</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{data.title}</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl">{data.heroDescription}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {data.stats.map(stat => (
          <div key={stat.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 text-center">
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Use Cases */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.useCases.map(uc => (
            <div key={uc.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{uc.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{uc.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Robots */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recommended Robots for {data.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {robots.map(robot => robot && (
            <Link key={robot.id} href={`/robots/${robot.id}`} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
              <p className="text-sm font-bold text-gray-900 dark:text-white">{robot.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{robot.manufacturer}</p>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-2">{robot.price}</p>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                <Badge text={availabilityLabels[robot.availability] || robot.availability} variant={robot.availability === 'shipping' ? 'success' : 'default'} />
                {robot.canadaAvailable && <Badge text="🇨🇦" variant="success" />}
              </div>
              {robot.specs.payload && <p className="text-xs text-gray-400 mt-2">Payload: {robot.specs.payload} kg</p>}
            </Link>
          ))}
        </div>
      </section>

      {/* ROI Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">💰 ROI Example</h2>
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4">{data.roiExample.scenario}</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-red-500 font-bold text-sm shrink-0">Before:</span>
              <p className="text-sm text-gray-600 dark:text-gray-300">{data.roiExample.before}</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-500 font-bold text-sm shrink-0">After:</span>
              <p className="text-sm text-gray-600 dark:text-gray-300">{data.roiExample.after}</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold text-sm shrink-0">Savings:</span>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{data.roiExample.savings}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Case Example</h2>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{data.caseExample.company}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{data.caseExample.description}</p>
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3">
            <p className="text-sm text-blue-700 dark:text-blue-300"><strong>Result:</strong> {data.caseExample.result}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">❓ Frequently Asked Questions</h2>
        <div className="space-y-3">
          {data.faqs.map((faq, i) => (
            <details key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl group">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {faq.q}
                <svg className="w-4 h-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-centre">
        <h2 className="text-2xl font-bold mb-2">Ready to Explore Robots for {data.name}?</h2>
        <p className="text-blue-100 mb-6">Get a personalized recommendation based on your specific {data.name.toLowerCase()} requirements.</p>
        <div className="flex flex-wrap gap-3">
          <Button href="/inquiry" variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">Request a Quote</Button>
          <Button href="/roi-calculator" variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">ROI Calculator</Button>
          <Button href="/demo" variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">Request a Demo</Button>
        </div>
      </div>

      {/* Other Industries */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Explore Other Industries</h2>
        <div className="flex flex-wrap gap-2">
          {industries.filter(i => i.slug !== industry).map(ind => (
            <Link key={ind.slug} href={`/robots-for/${ind.slug}`} className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              {ind.icon} {ind.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
