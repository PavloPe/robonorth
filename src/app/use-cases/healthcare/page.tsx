import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Robots for Healthcare — Eldercare, Hospital Support & Rehabilitation',
  description: 'Discover how humanoid robots are supporting Canadian healthcare. From eldercare facilities to hospitals, explore robot solutions for healthcare staffing challenges.',
  alternates: { canonical: 'https://robonorth.ca/use-cases/healthcare' },
};

export default function HealthcareUseCasePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/use-cases" className="hover:text-gray-600 transition-colors">Use Cases</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Healthcare</span>
      </nav>

      <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 rounded-3xl px-8 sm:px-12 py-12 sm:py-16 text-white mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative max-w-2xl">
          <p className="text-emerald-200 text-sm font-semibold uppercase tracking-wider mb-3">🏥 Healthcare</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Robots for Canadian Healthcare</h1>
          <p className="text-emerald-100 text-lg mb-8">Address critical staffing shortages in eldercare, hospitals, and rehabilitation with humanoid robots that handle physical tasks — letting caregivers focus on care.</p>
          <Button href="/inquiry?use-case=healthcare" size="lg" className="!bg-white !text-emerald-700 hover:!bg-emerald-50 !font-bold">Explore Healthcare Solutions →</Button>
        </div>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Healthcare Robot Applications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: '🧓', title: 'Eldercare Support', desc: 'Meal delivery, linen management, supply restocking in long-term care facilities. Reduces physical burnout among staff.' },
            { icon: '🏥', title: 'Hospital Logistics', desc: 'Transport supplies, medications, and equipment between departments. 24/7 operation frees clinical staff.' },
            { icon: '🧹', title: 'Sanitization', desc: 'Routine cleaning and disinfection of rooms, common areas, and equipment. Consistent protocols every time.' },
            { icon: '🧪', title: 'Lab Assistance', desc: 'Sample transport, inventory management, and basic lab preparation tasks in clinical laboratories.' },
            { icon: '♿', title: 'Rehabilitation', desc: 'Physical therapy assistance, guided exercises, and patient mobility support with precise force control.' },
            { icon: '📦', title: 'Supply Management', desc: 'Automated restocking of PPE stations, medication carts, and supply closets throughout facilities.' },
          ].map(item => (
            <div key={item.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-3 mb-2">{item.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recommended for Healthcare</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: 'Sanctuary AI Phoenix', slug: 'sanctuary-phoenix', note: 'Canadian-made, general-purpose, excellent dexterity' },
            { name: '1X NEO', slug: '1x-neo', note: 'Lightweight (30kg), safe around patients, home-friendly design' },
            { name: 'Fourier GR-2', slug: 'fourier-gr-2', note: 'Healthcare-focused design, rehabilitation expertise' },
          ].map(r => (
            <Link key={r.slug} href={`/robots/${r.slug}`} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">{r.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{r.note}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Interested in Healthcare Robotics?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">We work with healthcare facilities to identify the right robot and navigate Health Canada requirements.</p>
        <Button href="/inquiry?use-case=healthcare" size="lg">Schedule a Consultation →</Button>
      </div>
    </div>
  );
}
