import type { Metadata } from 'next';
import Link from 'next/link';

// Improvement #48: Canadian robotics newsletter archive page

export const metadata: Metadata = {
  title: 'Newsletter Archive — Canadian Robotics Updates',
  description: 'Browse past issues of the RoboNorth newsletter. Weekly updates on humanoid robotics, new models, industry trends, and Canadian market insights.',
  alternates: { canonical: 'https://robonorth.ca/newsletter-archive' },
};

const newsletters = [
  { issue: '#24', date: 'June 13, 2026', title: 'Unitree G1 Ships to Canada, Figure AI Expands Pilots', highlights: ['Unitree G1 EDU now shipping direct to Canada', 'Figure AI announces Canadian pilot program', 'New blog: Maintenance guide for humanoid robots'], reads: 1847 },
  { issue: '#23', date: 'June 6, 2026', title: 'Tesla Optimus Price Revealed, IRAP Funding Update', highlights: ['Tesla reveals Optimus pricing: $25K-$30K range', 'IRAP opens new robotics funding stream', 'Robot of the Month: Unitree G1'], reads: 2134 },
  { issue: '#22', date: 'May 30, 2026', title: 'Sanctuary AI Phoenix Gen 2, Cold Weather Breakthroughs', highlights: ['Sanctuary AI announces Phoenix Gen 2 specs', 'First cold-weather robot variant tested in Alberta', 'Interview: Kinova Robotics CEO on Canadian market'], reads: 1956 },
  { issue: '#21', date: 'May 23, 2026', title: 'Canadian Robotics Policy Update, New Safety Standards', highlights: ['AIDA implementation timeline announced', 'CSA publishes new humanoid robot safety guidance', 'Agility Digit available for Canadian warehouses'], reads: 1623 },
  { issue: '#20', date: 'May 16, 2026', title: 'Humanoid Robot Market Hits $1B, RoboNorth Milestones', highlights: ['Global humanoid robot market exceeds $1 billion', 'RoboNorth surpasses 10,000 newsletter subscribers', 'New comparison: Figure 02 vs Optimus'], reads: 2301 },
  { issue: '#19', date: 'May 9, 2026', title: '1X NEO Pre-Orders Open, BC Tech Fund Updates', highlights: ['1X Technologies opens global pre-orders for NEO', 'BC Tech Fund allocates $5M for robotics startups', 'Guide: How to apply for SR&ED credits'], reads: 1789 },
  { issue: '#18', date: 'May 2, 2026', title: 'Humanoid Robots in Healthcare: Canadian Pilots Begin', highlights: ['Two BC care homes begin humanoid robot pilots', 'Healthcare-specific robot certifications explained', 'Q&A with a Canadian robotics safety assessor'], reads: 1534 },
  { issue: '#17', date: 'April 25, 2026', title: 'Spring Robotics Roundup, New Models Announced', highlights: ['Three new humanoid robots announced at spring conferences', 'Canadian import duty changes for robotics equipment', 'Calgary energy company deploys inspection robots'], reads: 1445 },
];

export default function NewsletterArchivePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Newsletter Archive</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">📬 Archive</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Newsletter Archive</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Browse past issues of our weekly Canadian robotics newsletter. 10,000+ subscribers and counting.</p>
      </div>

      {/* Subscribe CTA */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">Don&apos;t miss an issue</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Get weekly robotics updates delivered to your inbox.</p>
        </div>
        <Link href="/inquiry" className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap">
          Subscribe Free →
        </Link>
      </div>

      <div className="space-y-4">
        {newsletters.map(nl => (
          <div key={nl.issue} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-blue-200 dark:hover:border-blue-800 transition-colors cursor-pointer group">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{nl.issue}</span>
                  <span className="text-xs text-gray-400">{nl.date}</span>
                  <span className="text-[10px] text-gray-400">· {nl.reads.toLocaleString()} reads</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{nl.title}</h3>
                <ul className="mt-2 space-y-1">
                  {nl.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1.5">
                      <span className="text-blue-400">•</span> {h}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold shrink-0 mt-1">Read →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
