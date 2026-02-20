import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// Improvement #43: Referral program landing page

export const metadata: Metadata = {
  title: 'Referral Program — Earn Rewards by Referring Robot Buyers',
  description: 'Earn rewards for referring businesses to RoboNorth. Our referral program offers cash bonuses for successful robot purchases.',
  alternates: { canonical: 'https://robonorth.ca/referral' },
};

const tiers = [
  { name: 'Bronze', referrals: '1-2', reward: '$500', perks: ['$500 per successful referral', 'Referral tracking dashboard', 'Email notifications'] },
  { name: 'Silver', referrals: '3-5', reward: '$750', perks: ['$750 per successful referral', 'Priority support for referrals', 'Quarterly bonus draws', 'Co-branded marketing materials'] },
  { name: 'Gold', referrals: '6+', reward: '$1,000+', perks: ['$1,000+ per successful referral', 'Custom referral codes', 'Dedicated account manager', 'Annual partner summit invitation', 'Revenue sharing options'] },
];

export default function ReferralPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Referral Program</span>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 rounded-3xl px-8 sm:px-12 py-12 sm:py-16 text-white mb-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-purple-200 text-sm font-semibold uppercase tracking-wider mb-3">💰 Earn Rewards</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Refer a Robot Buyer, Earn Cash</h1>
          <p className="text-purple-100 text-lg mb-8">Know a business that could benefit from humanoid robots? Refer them to RoboNorth and earn up to $1,000+ per successful purchase.</p>
          <Button href="/inquiry?type=referral" size="lg" className="!bg-white !text-purple-700 hover:!bg-purple-50 !font-bold">Join the Referral Program →</Button>
        </div>
      </div>

      {/* How it works */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { step: '1', icon: '📧', title: 'Refer', desc: 'Share your unique referral link or submit the business contact details through our form.' },
            { step: '2', icon: '🤝', title: 'Connect', desc: 'We reach out to your referral, provide consultation, and help them find the right robot.' },
            { step: '3', icon: '💰', title: 'Earn', desc: 'When your referral makes a purchase or signs a pilot agreement, you earn your reward.' },
          ].map(item => (
            <div key={item.step} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center relative">
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Reward Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map(tier => (
            <div key={tier.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{tier.name}</h3>
              <p className="text-xs text-gray-400 mb-2">{tier.referrals} successful referrals</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">{tier.reward}</p>
              <ul className="space-y-2">
                {tier.perks.map(perk => (
                  <li key={perk} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="text-emerald-500">✓</span> {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Ready to Start Earning?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Join hundreds of partners already earning rewards through our referral program.</p>
        <Button href="/inquiry?type=referral" size="lg">Apply for Referral Program →</Button>
      </div>
    </div>
  );
}
