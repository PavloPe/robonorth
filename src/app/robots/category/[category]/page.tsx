import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import { toRobot } from '@/lib/queries';
import RobotCard from '@/components/ui/RobotCard';

const categories: Record<string, { title: string; description: string; icon: string }> = {
  consumer: {
    title: 'Consumer Robots',
    description: 'Humanoid robots designed for personal use, home assistance, and education. The most accessible robots for individual buyers.',
    icon: '🏠',
  },
  enterprise: {
    title: 'Enterprise Robots',
    description: 'Industrial-grade humanoid robots for manufacturing, logistics, and commercial deployment. Built for 24/7 operation.',
    icon: '🏭',
  },
  research: {
    title: 'Research Robots',
    description: 'Advanced humanoid platforms for academic research, R&D labs, and cutting-edge robotics experiments.',
    icon: '🔬',
  },
  announced: {
    title: 'Coming Soon',
    description: 'Recently announced humanoid robots not yet available for purchase. Track upcoming releases and expected availability.',
    icon: '📢',
  },
};

export async function generateStaticParams() {
  return Object.keys(categories).map(category => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = categories[category];
  if (!cat) return { title: 'Not Found' };

  return {
    title: `${cat.title} — Humanoid Robots`,
    description: cat.description,
    alternates: { canonical: `https://robonorth.ca/robots/category/${category}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categories[category];
  if (!cat) notFound();

  const rows = await prisma.robot.findMany({
    where: { category },
    orderBy: { priceMin: 'asc' },
  });
  const robots = rows.map(toRobot);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <Link href="/robots" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Robots</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">{cat.title}</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{cat.icon}</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{cat.title}</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl">{cat.description}</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{robots.length} robots in this category</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {robots.map(robot => (
          <RobotCard key={robot.id} robot={robot} />
        ))}
      </div>

      {robots.length === 0 && (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">{cat.icon}</div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No robots yet</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Check back soon — we&rsquo;re adding new robots regularly.</p>
        </div>
      )}

      {/* Other categories */}
      <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Browse Other Categories</h2>
        <div className="flex flex-wrap gap-3">
          {Object.entries(categories).filter(([k]) => k !== category).map(([key, c]) => (
            <Link
              key={key}
              href={`/robots/category/${key}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              {c.icon} {c.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
