import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Robots for Agriculture — Farming, Harvesting & Livestock',
  description: 'Discover humanoid robots for Canadian agriculture. From greenhouse operations to livestock management, explore automation solutions for farming.',
  alternates: { canonical: 'https://robonorth.ca/use-cases/agriculture' },
};

export default function AgricultureUseCasePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link><span>/</span>
        <Link href="/use-cases" className="hover:text-gray-600 transition-colors">Use Cases</Link><span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Agriculture</span>
      </nav>

      <div className="bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 rounded-3xl px-8 sm:px-12 py-12 sm:py-16 text-white mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative max-w-2xl">
          <p className="text-green-200 text-sm font-semibold uppercase tracking-wider mb-3">🌾 Agriculture</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Robots for Canadian Agriculture</h1>
          <p className="text-green-100 text-lg mb-8">Address seasonal labour shortages and harsh conditions with humanoid robots for greenhouse operations, livestock management, and harvest assistance.</p>
          <Button href="/inquiry?use-case=agriculture" size="lg" className="!bg-white !text-green-700 hover:!bg-green-50 !font-bold">Explore Ag Solutions →</Button>
        </div>
      </div>

      <section className="mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: '🌱', title: 'Greenhouse Operations', desc: 'Planting, pruning, and harvesting in controlled environments where human-shaped robots excel.' },
          { icon: '🐄', title: 'Livestock Management', desc: 'Feed distribution, facility cleaning, and monitoring in barns and feedlots.' },
          { icon: '📦', title: 'Packing & Sorting', desc: 'Post-harvest sorting, grading, and packing of produce for market.' },
          { icon: '🔍', title: 'Crop Inspection', desc: 'Walking rows to inspect crops, identify disease, and assess harvest readiness.' },
          { icon: '🧪', title: 'Soil & Sample Collection', desc: 'Collecting soil samples, water samples, and environmental data across fields.' },
          { icon: '❄️', title: 'Winter Operations', desc: 'Cold-weather variants (coming 2027) for year-round outdoor agricultural work.' },
        ].map(item => (
          <div key={item.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <span className="text-2xl">{item.icon}</span>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-3 mb-2">{item.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Agricultural Robotics Pilot Program</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">We&apos;re working with Canadian farms to pilot humanoid robots in agricultural settings. Join the waitlist.</p>
        <Button href="/inquiry?use-case=agriculture" size="lg">Join Agricultural Pilot →</Button>
      </div>
    </div>
  );
}
