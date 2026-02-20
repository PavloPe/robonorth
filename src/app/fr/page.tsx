import type { Metadata } from 'next';
import Link from 'next/link';
import { getFeaturedRobots } from '@/lib/queries';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'RoboNorth — Le marché canadien des robots humanoïdes',
  description: 'Parcourez, comparez et précommandez des robots humanoïdes des principaux fabricants mondiaux. Le premier marché dédié aux robots humanoïdes au Canada. Plus de 32 modèles.',
  openGraph: {
    title: 'RoboNorth — Le marché canadien des robots humanoïdes',
    description: 'Plus de 32 robots humanoïdes, de 5 900 $ à la gamme entreprise.',
    locale: 'fr_CA',
  },
  alternates: {
    canonical: 'https://robonorth.ca/fr',
    languages: { 'en-CA': 'https://robonorth.ca', 'fr-CA': 'https://robonorth.ca/fr' },
  },
};

export default async function FrenchHomePage() {
  const featured = await getFeaturedRobots();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Language banner */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-3 mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          🇫🇷 Vous consultez la version française. <Link href="/" className="text-blue-600 dark:text-blue-400 font-semibold">Switch to English →</Link>
        </p>
        <span className="text-xs text-gray-400">Version bêta</span>
      </div>

      {/* Hero */}
      <section className="py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Le futur de la robotique,{' '}
          <span className="text-blue-600 dark:text-blue-400">livré au Canada</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Le premier marché dédié aux robots humanoïdes au Canada. Parcourez plus de 32 modèles, de 5 900 $ à la gamme entreprise.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/robots" size="lg">Parcourir le catalogue</Button>
          <Button href="/quiz" variant="outline" size="lg">Faire le quiz 🧭</Button>
        </div>
      </section>

      {/* Featured */}
      <section className="pb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">⭐ Robots vedettes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.slice(0, 6).map(robot => (
            <Link key={robot.id} href={`/robots/${robot.id}`} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-md">
              <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">{robot.manufacturer}</p>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{robot.name}</h3>
              <p className="text-xl font-bold text-gray-900 dark:text-white mt-2">{robot.price}</p>
              {robot.canadaAvailable && <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">🇨🇦 Livraison au Canada</p>}
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button href="/robots" variant="outline">Voir tous les robots →</Button>
        </div>
      </section>

      {/* Quick links */}
      <section className="pb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔗 Liens rapides</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Guide des prix', href: '/pricing-guide', icon: '💰' },
            { label: 'Comparer les robots', href: '/compare', icon: '⚖️' },
            { label: 'Subventions gouvernementales', href: '/grants', icon: '🏛️' },
            { label: 'Nous contacter', href: '/inquiry', icon: '📧' },
          ].map(link => (
            <Link key={link.href} href={link.href} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
              <span className="text-2xl block mb-2">{link.icon}</span>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{link.label}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
