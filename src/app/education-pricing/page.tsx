import type { Metadata } from 'next';
import Link from 'next/link';
import EducationForm from '@/components/ui/EducationForm';

export const metadata: Metadata = {
  title: 'Education & Student Pricing — 15% Off | RoboNorth',
  description: 'Verified students and educational institutions get 15% off all robots and parts. Apply for academic pricing.',
  alternates: { canonical: 'https://robonorth.ca/education-pricing' },
};

export default function EducationPricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Education Pricing</span>
      </nav>

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-full px-5 py-2 mb-4">
          <span className="text-lg">🎓</span>
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">15% Education Discount</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Student & Educator Pricing</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Verified students, professors, and educational institutions receive 15% off all robots and components.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: '🎒', title: 'Students', desc: 'Valid .edu or university email required. Full-time or part-time.' },
          { icon: '👩‍🏫', title: 'Educators', desc: 'Professors, teachers, and lab coordinators at accredited institutions.' },
          { icon: '🏫', title: 'Institutions', desc: 'Universities, colleges, K-12 schools, and research labs. PO accepted.' },
        ].map(b => (
          <div key={b.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-center">
            <span className="text-3xl">{b.icon}</span>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-3 mb-1">{b.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{b.desc}</p>
          </div>
        ))}
      </div>

      <EducationForm />
    </div>
  );
}
