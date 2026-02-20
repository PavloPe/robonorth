import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'À propos de RoboNorth — Le marché canadien des robots humanoïdes',
  description: 'RoboNorth est le premier marché canadien dédié aux robots humanoïdes. Découvrez notre mission, notre équipe et notre vision pour la robotique au Canada.',
  alternates: {
    canonical: 'https://robonorth.ca/fr/about',
    languages: { 'en-CA': 'https://robonorth.ca/about', 'fr-CA': 'https://robonorth.ca/fr/about' },
  },
};

export default function FrenchAboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-3 mb-8 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-300">🇫🇷 Version française · <Link href="/about" className="text-blue-600 dark:text-blue-400 font-semibold">English →</Link></p>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">À propos de RoboNorth</h1>

      <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
        <p>
          <strong className="text-gray-900 dark:text-white">RoboNorth</strong> est le premier marché canadien entièrement dédié aux robots humanoïdes. Notre mission est de rendre la robotique humanoïde accessible aux entreprises et aux particuliers canadiens.
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notre mission</h2>
        <p>
          Nous croyons que les robots humanoïdes transformeront le travail, les soins de santé, l&apos;éducation et la vie quotidienne au Canada. Notre rôle est de guider les acheteurs canadiens à travers ce marché en évolution rapide avec expertise, transparence et un engagement envers leur succès.
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ce que nous offrons</h2>
        <ul className="space-y-2">
          <li>🤖 <strong>Plus de 32 robots humanoïdes</strong> catalogués avec des spécifications vérifiées</li>
          <li>💰 <strong>Prix en dollars canadiens</strong> avec estimation des droits d&apos;importation</li>
          <li>📊 <strong>Outils de comparaison</strong> pour trouver le robot idéal</li>
          <li>🏛️ <strong>Guide des subventions</strong> gouvernementales pour la robotique</li>
          <li>📦 <strong>Assistance à l&apos;importation</strong> pour les acheteurs canadiens</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pourquoi le Canada?</h2>
        <p>
          Le Canada possède des avantages uniques dans la robotique : des talents de classe mondiale en IA (Montréal, Toronto, Edmonton), un soutien gouvernemental substantiel, et un besoin industriel croissant avec plus de 80 000 postes manufacturiers non pourvus.
        </p>
      </div>

      <div className="mt-8 flex gap-3">
        <Button href="/fr/robots">Parcourir les robots</Button>
        <Button href="/inquiry" variant="outline">Nous contacter</Button>
      </div>
    </div>
  );
}
