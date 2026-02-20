import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Certified Pre-Owned Humanoid Robots — Coming Soon | RoboNorth',
  description: 'Certified pre-owned humanoid robots at reduced prices. Coming soon to RoboNorth. Sign up for notifications when used robots become available in Canada.',
  keywords: ['used humanoid robot', 'pre-owned robot', 'refurbished robot Canada', 'cheap humanoid robot'],
  openGraph: {
    title: 'Certified Pre-Owned Humanoid Robots — Coming Soon',
    description: 'Quality-checked used humanoid robots at reduced prices. Sign up for launch notifications.',
    url: 'https://robonorth.ca/used-robots',
  },
  alternates: { canonical: 'https://robonorth.ca/used-robots' },
};

export default function UsedRobotsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Pre-Owned Robots</span>
      </nav>

      <div className="text-center mb-12">
        <span className="text-6xl block mb-4">♻️</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Certified Pre-Owned Humanoid Robots</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Quality-inspected humanoid robots at reduced prices. Each unit undergoes a comprehensive 50-point inspection, battery health check, and software refresh before listing.
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 text-center mb-12">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-2">Coming Q3 2026</p>
        <p className="text-gray-600 dark:text-gray-300">We&apos;re building Canada&apos;s first marketplace for certified pre-owned humanoid robots. Sign up below to be notified when listings go live.</p>
      </div>

      {/* What to expect */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {[
          { icon: '🔍', title: '50-Point Inspection', desc: 'Every joint, sensor, actuator, and electronic system checked' },
          { icon: '🔋', title: 'Battery Health Report', desc: 'Certified capacity remaining with transparent degradation data' },
          { icon: '📜', title: '90-Day Warranty', desc: 'Full parts and labour warranty on all certified units' },
          { icon: '💰', title: '30–50% Savings', desc: 'Significant savings vs. new purchase price' },
        ].map(item => (
          <div key={item.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <span className="text-2xl block mb-2">{item.icon}</span>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Email signup */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Get Notified When We Launch</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Be the first to browse certified pre-owned humanoid robots in Canada.</p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={undefined}>
          <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <Button href="/inquiry?interest=used-robots">Notify Me</Button>
        </form>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Looking to buy new? <Link href="/buy" className="text-blue-600 dark:text-blue-400 font-semibold">Browse new robots →</Link>
        </p>
      </div>
    </div>
  );
}
