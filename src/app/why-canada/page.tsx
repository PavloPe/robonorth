import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// Improvement #23: "Why Canada?" page

export const metadata: Metadata = {
  title: 'Why Canada for Robotics — Canadian Advantages for Robot Adoption',
  description: 'Why Canada is uniquely positioned for humanoid robotics adoption. World-class AI research, government incentives, skilled workforce, and growing ecosystem.',
  alternates: { canonical: 'https://robonorth.ca/why-canada' },
};

const advantages = [
  { icon: '🧠', title: 'World-Class AI Research', desc: 'Home to Mila (Montreal), Vector Institute (Toronto), and Amii (Edmonton) — the three pillars of Canadian AI that power modern robot intelligence. Yoshua Bengio, Geoffrey Hinton, and Richard Sutton all built their labs here.', stat: '3', statLabel: 'Major AI Institutes' },
  { icon: '🇨🇦', title: 'Homegrown Champions', desc: 'Sanctuary AI (Vancouver), Kinova (Quebec), Clearpath (Kitchener), and MDA (Brampton) represent a growing ecosystem of world-class Canadian robotics companies building and deploying robots globally.', stat: '50+', statLabel: 'Robotics Companies' },
  { icon: '💰', title: 'Generous Incentives', desc: 'SR&ED tax credits (up to 35%), IRAP grants, provincial manufacturing incentives, and the Strategic Innovation Fund make Canada one of the most financially attractive places to invest in robotics R&D.', stat: '35%', statLabel: 'Max SR&ED Credit' },
  { icon: '🎓', title: 'Talent Pipeline', desc: 'Canadian universities produce world-class robotics engineers. The Global Talent Stream immigration pathway brings in international robotics experts in just 2 weeks.', stat: '100K+', statLabel: 'Annual STEM Grads' },
  { icon: '🏭', title: 'Manufacturing Need', desc: '80,000+ unfilled manufacturing positions create genuine demand for robotic automation. Canadian manufacturers need humanoid robots — this isn\'t hype, it\'s necessity.', stat: '80K+', statLabel: 'Unfilled Positions' },
  { icon: '⚖️', title: 'Balanced Regulation', desc: 'The Artificial Intelligence and Data Act (AIDA) takes a pragmatic approach — enabling innovation while protecting workers. Less restrictive than EU, more structured than US.', stat: 'AIDA', statLabel: 'AI Framework' },
  { icon: '🌐', title: 'Trade Agreements', desc: 'CUSMA, CETA, and CPTPP give Canadian robotics companies and buyers access to preferential trade terms with the US, EU, and Asia-Pacific markets.', stat: '3', statLabel: 'Major Trade Deals' },
  { icon: '❄️', title: 'Extreme Conditions Testing', desc: 'Canadian winters provide a natural testing ground for cold-weather robotics. Robots that work in Canada can work anywhere — a competitive advantage for Canadian robotics companies.', stat: '-40°C', statLabel: 'Winter Testing' },
];

export default function WhyCanadaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Why Canada?</span>
      </nav>

      <div className="text-center mb-16">
        <p className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-2">🇨🇦 The Canadian Advantage</p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Why Canada Is the Future of Robotics
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          World-class AI research, government incentives, growing demand, and a thriving ecosystem make Canada one of the best places in the world for robotics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {advantages.map(a => (
          <div key={a.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-red-200 dark:hover:border-red-800 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center text-2xl shrink-0">
                {a.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{a.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">{a.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-red-600 dark:text-red-400">{a.stat}</span>
                  <span className="text-xs text-gray-400">{a.statLabel}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-10 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative">
          <h2 className="text-2xl font-bold mb-4">Ready to explore robotics in Canada?</h2>
          <p className="text-red-100 mb-6 max-w-lg mx-auto">Whether you&apos;re buying, building, or researching — Canada is the place to be.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/robots" size="lg" className="!bg-white !text-red-700 hover:!bg-red-50 !font-bold">Browse Robots →</Button>
            <Button href="/inquiry" variant="outline" size="lg" className="!border-white/30 !text-white hover:!bg-white/10">Get in Touch</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
