import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Robots for Hospitality — Hotels, Restaurants & Events',
  description: 'Explore humanoid robots for Canadian hospitality. Concierge service, room service, event support, and guest experience enhancement.',
  alternates: { canonical: 'https://robonorth.ca/use-cases/hospitality' },
};

export default function HospitalityUseCasePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link><span>/</span>
        <Link href="/use-cases" className="hover:text-gray-600 transition-colors">Use Cases</Link><span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Hospitality</span>
      </nav>

      <div className="bg-gradient-to-br from-amber-600 via-orange-700 to-red-800 rounded-3xl px-8 sm:px-12 py-12 sm:py-16 text-white mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative max-w-2xl">
          <p className="text-amber-200 text-sm font-semibold uppercase tracking-wider mb-3">🏨 Hospitality</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Robots for Hospitality</h1>
          <p className="text-amber-100 text-lg mb-8">Enhance guest experiences while addressing labour shortages in Canadian hotels, restaurants, and event venues with humanoid robot assistants.</p>
          <Button href="/inquiry?use-case=hospitality" size="lg" className="!bg-white !text-amber-700 hover:!bg-amber-50 !font-bold">Explore Hospitality Solutions →</Button>
        </div>
      </div>

      <section className="mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: '🛎️', title: 'Concierge Service', desc: 'Multilingual guest greeting, information desk, wayfinding assistance.' },
          { icon: '🍽️', title: 'Food & Beverage', desc: 'Tray delivery, table busing, drink service in restaurants and bars.' },
          { icon: '🧹', title: 'Room Service', desc: 'Deliver amenities, towels, and room service orders to guest rooms.' },
          { icon: '🎉', title: 'Event Support', desc: 'Setup/teardown assistance, registration desk, attendee guidance.' },
          { icon: '🧳', title: 'Luggage Handling', desc: 'Assist with luggage transport from lobby to rooms.' },
          { icon: '📸', title: 'Entertainment', desc: 'Photo opportunities, interactive guest engagement, facility tours.' },
        ].map(item => (
          <div key={item.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <span className="text-2xl">{item.icon}</span>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-3 mb-2">{item.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Elevate Your Guest Experience</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Be among the first Canadian hospitality businesses to deploy humanoid robots.</p>
        <Button href="/inquiry?use-case=hospitality" size="lg">Get Started →</Button>
      </div>
    </div>
  );
}
