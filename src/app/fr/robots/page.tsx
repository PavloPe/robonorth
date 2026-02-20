import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllRobots } from '@/lib/queries';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Catalogue de robots humanoïdes — RoboNorth',
  description: 'Parcourez plus de 32 robots humanoïdes disponibles au Canada. Filtrez par catégorie, prix et disponibilité.',
  alternates: {
    canonical: 'https://robonorth.ca/fr/robots',
    languages: { 'en-CA': 'https://robonorth.ca/robots', 'fr-CA': 'https://robonorth.ca/fr/robots' },
  },
};

const availabilityLabels: Record<string, string> = {
  shipping: 'En stock', preorder: 'Précommande', pilot: 'Pilote', announced: 'Bientôt', prototype: 'Prototype',
};

export default async function FrenchRobotsPage() {
  const robots = await getAllRobots();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-3 mb-8 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-300">🇫🇷 Version française · <Link href="/robots" className="text-blue-600 dark:text-blue-400 font-semibold">English →</Link></p>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Catalogue de robots humanoïdes</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">{robots.length} robots disponibles</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {robots.map(robot => (
          <Link key={robot.id} href={`/robots/${robot.id}`} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase">{robot.manufacturer}</p>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{robot.name}</h2>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">{robot.price}</p>
            <div className="flex gap-1.5 mt-2">
              <Badge text={availabilityLabels[robot.availability] || robot.availability} variant={robot.availability === 'shipping' ? 'success' : 'default'} />
              {robot.canadaAvailable && <Badge text="🇨🇦 Canada" variant="success" />}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
