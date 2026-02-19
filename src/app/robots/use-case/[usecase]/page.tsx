import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import { toRobot } from '@/lib/queries';
import RobotCard from '@/components/ui/RobotCard';

const useCases: Record<string, { title: string; description: string; icon: string }> = {
  education: {
    title: 'Education & Learning',
    description: 'Humanoid robots ideal for educational institutions, STEM programs, and robotics courses.',
    icon: '🎓',
  },
  research: {
    title: 'Research & Development',
    description: 'Advanced platforms for academic and industrial robotics research.',
    icon: '🔬',
  },
  manufacturing: {
    title: 'Manufacturing & Logistics',
    description: 'Industrial humanoids designed for factory floors, warehouse operations, and supply chain automation.',
    icon: '🏭',
  },
  'home-assistance': {
    title: 'Home Assistance',
    description: 'Personal robots for household tasks, companionship, and daily life support.',
    icon: '🏠',
  },
  healthcare: {
    title: 'Healthcare & Rehabilitation',
    description: 'Robots designed for medical environments, patient care, and physical rehabilitation.',
    icon: '🏥',
  },
  entertainment: {
    title: 'Entertainment & Events',
    description: 'Robots for exhibitions, trade shows, retail experiences, and public engagement.',
    icon: '🎭',
  },
};

// Map use case URL slugs to possible robot useCase values
const useCaseTerms: Record<string, string[]> = {
  education: ['education', 'STEM', 'academic'],
  research: ['research', 'R&D', 'advanced research', 'bipedal locomotion R&D', 'reinforcement learning', 'musculoskeletal research', 'biomechanics', 'academic study'],
  manufacturing: ['manufacturing', 'logistics', 'warehouse', 'factory automation', 'material handling', 'smart manufacturing', 'quality inspection', 'tote handling', 'AMR unloading'],
  'home-assistance': ['home assistance', 'household chores', 'personal AI assistant', 'household tasks', 'smart home'],
  healthcare: ['healthcare', 'rehabilitation', 'elderly care'],
  entertainment: ['events', 'exhibitions', 'entertainment', 'customer service', 'retail', 'hospitality'],
};

export async function generateStaticParams() {
  return Object.keys(useCases).map(usecase => ({ usecase }));
}

export async function generateMetadata({ params }: { params: Promise<{ usecase: string }> }): Promise<Metadata> {
  const { usecase } = await params;
  const uc = useCases[usecase];
  if (!uc) return { title: 'Not Found' };

  return {
    title: `${uc.title} Robots`,
    description: uc.description,
    alternates: { canonical: `https://robonorth.ca/robots/use-case/${usecase}` },
  };
}

export default async function UseCasePage({ params }: { params: Promise<{ usecase: string }> }) {
  const { usecase } = await params;
  const uc = useCases[usecase];
  if (!uc) notFound();

  const terms = useCaseTerms[usecase] || [];
  const allRows = await prisma.robot.findMany({ orderBy: { priceMin: 'asc' } });

  // Filter robots whose useCase array includes any of the matching terms
  const robots = allRows.map(toRobot).filter(robot =>
    robot.useCase.some(u =>
      terms.some(t => u.toLowerCase().includes(t.toLowerCase()))
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <Link href="/robots" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Robots</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">{uc.title}</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{uc.icon}</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Robots for {uc.title}</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl">{uc.description}</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{robots.length} robots for this use case</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {robots.map(robot => (
          <RobotCard key={robot.id} robot={robot} />
        ))}
      </div>

      {robots.length === 0 && (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">{uc.icon}</div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No matching robots</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">We&rsquo;re expanding our catalog. Check back soon!</p>
        </div>
      )}

      {/* Other use cases */}
      <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Browse Other Use Cases</h2>
        <div className="flex flex-wrap gap-3">
          {Object.entries(useCases).filter(([k]) => k !== usecase).map(([key, u]) => (
            <Link
              key={key}
              href={`/robots/use-case/${key}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              {u.icon} {u.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
