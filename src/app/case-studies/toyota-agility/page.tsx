import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { breadcrumbJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Case Study: Toyota Deploys Agility Digit Robots in Ontario | RoboNorth',
  description: 'Business case study of Toyota\'s deployment of 7 Agility Digit humanoid robots at their Woodstock, Ontario plant via the RaaS model. ROI, deployment details, and lessons learned.',
  keywords: ['Toyota robot case study', 'Agility Digit deployment', 'humanoid robot case study', 'RaaS case study'],
  openGraph: {
    title: 'Case Study: Toyota Deploys Agility Robots in Ontario',
    description: 'How Toyota deployed 7 humanoid robots via RaaS at their Canadian plant.',
    url: 'https://robonorth.ca/case-studies/toyota-agility',
  },
  alternates: { canonical: 'https://robonorth.ca/case-studies/toyota-agility' },
};

export default function ToyotaCaseStudyPage() {
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: 'https://robonorth.ca' },
    { name: 'Case Studies', url: 'https://robonorth.ca/case-studies/toyota-agility' },
    { name: 'Toyota / Agility Robotics', url: 'https://robonorth.ca/case-studies/toyota-agility' },
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <Link href="/success-stories" className="hover:text-gray-600 dark:hover:text-gray-300">Case Studies</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Toyota / Agility Robotics</span>
      </nav>

      <div className="mb-8">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-1 rounded-lg uppercase tracking-wider">Case Study</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
          Toyota Deploys 7 Agility Digit Robots at Ontario Manufacturing Plant
        </h1>
        <p className="text-gray-500 dark:text-gray-400">February 2026 · Woodstock, Ontario, Canada</p>
      </div>

      {/* Quick Facts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'Company', value: 'Toyota Motor Manufacturing Canada' },
          { label: 'Robots Deployed', value: '7 × Agility Digit' },
          { label: 'Model', value: 'Robot as a Service (RaaS)' },
          { label: 'Location', value: 'Woodstock, ON' },
        ].map(fact => (
          <div key={fact.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{fact.label}</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">{fact.value}</p>
          </div>
        ))}
      </div>

      {/* Challenge */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Challenge</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
          Toyota Motor Manufacturing Canada&apos;s Woodstock plant — one of the company&apos;s highest-performing facilities globally — faced a growing operational challenge: material handling labour was increasingly difficult to recruit and retain.
        </p>
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-5 space-y-2">
          <p className="text-sm text-gray-700 dark:text-gray-300">• <strong>50%+ annual turnover</strong> in material handling positions</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">• <strong>Chronic understaffing</strong> requiring mandatory overtime</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">• <strong>Ergonomic injuries</strong> from repetitive tote handling</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">• <strong>$2.5M+ annual</strong> recruiting and retraining costs for these roles</p>
        </div>
      </section>

      {/* Solution */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Solution</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
          After evaluating multiple automation options, TMMC chose Agility Robotics&apos; Digit — a purpose-built humanoid for logistics — deployed via the Robot-as-a-Service model.
        </p>
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-5 space-y-3">
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Why Digit?</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Purpose-built for tote handling and material transport. Bird-inspired legs navigate cluttered manufacturing floors. Proven at Amazon facilities.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Why RaaS?</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Avoided $1.75M upfront capital expenditure. Predictable monthly OPEX. Includes maintenance, software updates, and fleet management. Ability to scale up or down.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Deployment Timeline</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Contract signed (Jan 2026) → Installation (Feb 1–15) → Operations began (Feb 19, 2026). Total deployment: 6 weeks from contract to operation.</p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Results (First 30 Days)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { metric: 'Material handling throughput', result: '+22% improvement', icon: '📈' },
            { metric: 'Ergonomic injury claims', result: '-35% reduction (targeted tasks)', icon: '🛡️' },
            { metric: 'Overtime hours', result: '-40% reduction', icon: '⏰' },
            { metric: 'Zero workers displaced', result: 'Redeployed to higher-value roles', icon: '👥' },
          ].map(item => (
            <div key={item.metric} className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-sm font-bold text-gray-900 dark:text-white mt-2">{item.metric}</p>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{item.result}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Takeaways for Canadian Businesses</h2>
        <div className="space-y-3">
          {[
            { title: 'RaaS eliminates capital risk', desc: 'Monthly subscription means no large upfront investment. If technology improves, swap for newer models.' },
            { title: 'Canadian import logistics work', desc: '0% duty under CUSMA. Agility handled installation and commissioning. Process took 6 weeks.' },
            { title: 'Augmentation, not replacement', desc: 'Zero workers laid off. Existing staff moved to more skilled, better-compensated positions.' },
            { title: 'Government incentives apply', desc: 'SR&ED credits available for integration work. Ontario MITC applies to the capital portion.' },
            { title: 'Start small, scale fast', desc: '7 robots is a controlled pilot. Results will inform expansion to other Toyota plants.' },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Considering a Similar Deployment?</h2>
        <p className="text-blue-100 mb-6">RoboNorth can help you evaluate humanoid robots and RaaS options for your Canadian operation.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/robots/agility-digit-v2" variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">View Agility Digit V2</Button>
          <Button href="/raas" variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">Explore RaaS Options</Button>
          <Button href="/inquiry" variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">Request Consultation</Button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/blog/toyota-agility-robots-ontario-2026" className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700">
          Read the full news coverage →
        </Link>
      </div>
    </div>
  );
}
