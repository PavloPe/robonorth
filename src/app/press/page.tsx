import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Press & Media',
  description: 'RoboNorth press kit, media resources, and company information for journalists and media outlets.',
  alternates: { canonical: 'https://robonorth.ca/press' },
};

const mediaMentions = [
  { outlet: 'TechCrunch Canada', title: 'Canadian Startups Making Robotics Accessible', date: 'Coming Soon', type: 'pending' },
  { outlet: 'BetaKit', title: 'The Rise of Robot Marketplaces in Canada', date: 'Coming Soon', type: 'pending' },
  { outlet: 'Globe and Mail', title: 'Alberta Tech Sector Expands into Robotics', date: 'Coming Soon', type: 'pending' },
];

const pressStats = [
  { label: 'Robots Cataloged', value: '22+' },
  { label: 'Manufacturers', value: '15+' },
  { label: 'Countries Covered', value: '8' },
  { label: 'Founded', value: '2025' },
];

export default function PressPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Press & Media</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Press & Media</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-2xl">
        Everything journalists and media partners need to know about RoboNorth — Canada&rsquo;s first dedicated humanoid robot marketplace.
      </p>

      {/* Company overview */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Company Overview</h2>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-8">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            RoboNorth is Canada&rsquo;s first dedicated humanoid robot marketplace, connecting Canadian buyers — from hobbyists to enterprise clients — with the world&rsquo;s leading robot manufacturers. Based in Alberta, we provide comprehensive product information, comparison tools, and purchasing guidance for the emerging humanoid robotics market.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {pressStats.map(stat => (
              <div key={stat.label} className="text-center bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Press Kit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-xl mb-3">📋</div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Company Fact Sheet</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Key facts, founding story, and company mission.</p>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Coming Soon</span>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-xl mb-3">🎨</div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Brand Assets & Logos</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">RoboNorth logo in various formats and guidelines.</p>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Coming Soon</span>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-xl mb-3">📸</div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Product Screenshots</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">High-resolution screenshots of the RoboNorth platform.</p>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Coming Soon</span>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-xl mb-3">👤</div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Founder Bios & Photos</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Team photos and executive biographies.</p>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Coming Soon</span>
          </div>
        </div>
      </section>

      {/* Media mentions */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Media Mentions</h2>
        <div className="space-y-3">
          {mediaMentions.map(mention => (
            <div key={mention.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-lg shrink-0">📰</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{mention.outlet}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{mention.title}</p>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">{mention.date}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center">
          As a new platform, we&rsquo;re building our media presence. Journalists, reach out — we&rsquo;d love to chat!
        </p>
      </section>

      {/* Contact */}
      <section className="bg-slate-900 dark:bg-gray-950 rounded-2xl p-8 text-center border border-slate-800 dark:border-gray-800">
        <h2 className="text-xl font-bold text-white mb-2">Media Inquiries</h2>
        <p className="text-sm text-slate-400 mb-5 max-w-md mx-auto">
          For press inquiries, interviews, or media partnerships, please reach out to our team.
        </p>
        <div className="text-sm text-slate-300 mb-4">
          📧 press@robonorth.ca
        </div>
        <Button href="/inquiry" variant="primary">Contact Us</Button>
      </section>
    </div>
  );
}
