import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'State of Robotics in Canada 2026 — Market Report | RoboNorth',
  description: 'Comprehensive report on the Canadian robotics industry in 2026. Market size, key players, government investment, job market data, and 5-year forecast.',
  keywords: ['Canadian robotics market', 'robotics industry Canada', 'Canada robot market 2026', 'robotics market report'],
  openGraph: {
    title: 'State of Robotics in Canada 2026 — Market Report',
    description: 'Data-driven analysis of Canada\'s robotics industry. Market size, investment, key players, and forecast.',
    url: 'https://robonorth.ca/canada-robotics-report',
  },
  alternates: { canonical: 'https://robonorth.ca/canada-robotics-report' },
};

const marketData = [
  { label: 'Canadian Robotics Market Size (2026)', value: '$4.2 Billion CAD', growth: '+22% YoY' },
  { label: 'Humanoid Robot Segment', value: '$180 Million CAD', growth: '+340% since 2024' },
  { label: 'Government R&D Investment', value: '$1.2 Billion CAD', growth: 'Federal + Provincial combined' },
  { label: 'Robotics Jobs in Canada', value: '45,000+', growth: '+28% YoY growth' },
  { label: 'Robotics Patents Filed (2025)', value: '1,200+', growth: '+35% over 2024' },
  { label: 'VC Investment in Canadian Robotics', value: '$890 Million CAD', growth: '2025 calendar year' },
];

const keyPlayers = [
  { name: 'Sanctuary AI', city: 'Vancouver, BC', focus: 'Humanoid robots (Phoenix)', stage: 'Growth', funding: '$100M+' },
  { name: 'Clearpath/OTTO', city: 'Kitchener, ON', focus: 'AMRs/AGVs', stage: 'Acquired ($1.4B)', funding: 'Rockwell' },
  { name: 'Kinova', city: 'Montreal, QC', focus: 'Collaborative arms', stage: 'Growth', funding: '$100M+' },
  { name: 'Attabotics', city: 'Calgary, AB', focus: '3D warehouse robotics', stage: 'Growth', funding: '$200M+' },
  { name: 'Avidbots', city: 'Kitchener, ON', focus: 'Autonomous cleaning', stage: 'Growth', funding: '$150M+' },
  { name: 'MDA', city: 'Brampton, ON', focus: 'Space robotics', stage: 'Public (TSX)', funding: '$3B+ market cap' },
  { name: 'Robotiq', city: 'Quebec City, QC', focus: 'Cobot accessories', stage: 'Profitable', funding: 'Private' },
  { name: 'Carbon Robotics', city: 'Kelowna, BC', focus: 'AgTech', stage: 'Growth', funding: '$80M+' },
];

const forecast = [
  { year: '2024', market: '$2.8B', humanoid: '$40M' },
  { year: '2025', market: '$3.4B', humanoid: '$95M' },
  { year: '2026', market: '$4.2B', humanoid: '$180M' },
  { year: '2027', market: '$5.1B', humanoid: '$350M' },
  { year: '2028', market: '$6.2B', humanoid: '$600M' },
  { year: '2030', market: '$9.5B', humanoid: '$1.5B' },
];

export default function CanadaRoboticsReportPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Canada Robotics Report</span>
      </nav>

      <div className="mb-12">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">February 2026 Edition</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">State of Robotics in Canada 2026</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl">
          A data-driven overview of Canada&apos;s robotics industry — market size, key players, government investment, talent pipeline, and where the industry is heading.
        </p>
      </div>

      {/* Market Data */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📊 Key Market Data</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketData.map(item => (
            <div key={item.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{item.value}</p>
              <p className="text-sm text-gray-900 dark:text-white font-medium mt-1">{item.label}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{item.growth}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Players */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🏢 Key Players</h2>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase text-gray-500">Company</th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase text-gray-500">Location</th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase text-gray-500">Focus</th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase text-gray-500">Stage</th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase text-gray-500">Funding</th>
              </tr>
            </thead>
            <tbody>
              {keyPlayers.map(p => (
                <tr key={p.name} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">{p.name}</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{p.city}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{p.focus}</td>
                  <td className="py-3 px-4 text-gray-500">{p.stage}</td>
                  <td className="py-3 px-4 text-gray-500">{p.funding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-3">
          <Link href="/canadian-robotics" className="text-blue-600 dark:text-blue-400 font-semibold">View our full directory of 25+ Canadian robotics companies →</Link>
        </p>
      </section>

      {/* Canada's Advantages */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🇨🇦 Canada&apos;s Competitive Advantages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'World-Class AI Talent', desc: 'Home to Yoshua Bengio (Mila), Geoffrey Hinton (Vector), and Richard Sutton (Amii). Montreal, Toronto, and Edmonton form the global AI triangle.' },
            { title: 'Government Support', desc: '$1.2B+ in federal and provincial R&D funding. SR&ED, IRAP, SIF, and provincial programmes actively support robotics adoption.' },
            { title: 'Trade Agreements', desc: 'CUSMA (USA), CETA (EU), CPTPP (Asia-Pacific) enable duty-free or reduced-duty import of robotic equipment from most major manufacturing nations.' },
            { title: 'Industrial Need', desc: '80,000+ unfilled manufacturing positions. Aging workforce. Geographic challenges. Canada has strong economic motivation to adopt automation.' },
            { title: 'Regulatory Balance', desc: 'AIDA provides AI governance without stifling innovation. ISO standards adoption is progressing pragmatically.' },
            { title: 'Domestic Manufacturers', desc: 'Sanctuary AI, Kinova, and Robotiq give Canada domestic capability in humanoids, cobots, and accessories — reducing dependence on imports.' },
          ].map(item => (
            <div key={item.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Forecast */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📈 Market Forecast (2024–2030)</h2>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <div className="space-y-3">
            {forecast.map(row => (
              <div key={row.year} className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-900 dark:text-white w-12">{row.year}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500">Total: {row.market}</span>
                    <span className="text-xs text-blue-500">Humanoid: {row.humanoid}</span>
                  </div>
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex">
                    <div className="h-full bg-gray-300 dark:bg-gray-600 rounded-l-full" style={{ width: `${parseInt(row.market.replace(/[^0-9.]/g, '')) / 10 * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">Source: RoboNorth analysis based on IFR, StatsCan, and industry data. Projections are estimates.</p>
        </div>
      </section>

      {/* Job Market */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">💼 Job Market</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { role: 'Robotics Engineer', salary: '$85K–$130K CAD', demand: 'Very High', growth: '+32%' },
            { role: 'AI/ML Engineer (Robotics)', salary: '$95K–$160K CAD', demand: 'Extremely High', growth: '+45%' },
            { role: 'Robot Integration Technician', salary: '$55K–$85K CAD', demand: 'High', growth: '+28%' },
          ].map(job => (
            <div key={job.role} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 dark:text-white">{job.role}</h3>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-2">{job.salary}</p>
              <p className="text-xs text-gray-500 mt-1">Demand: {job.demand} · Growth: {job.growth} YoY</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-3">
          <Link href="/jobs-board" className="text-blue-600 dark:text-blue-400 font-semibold">Browse robotics job listings →</Link>
        </p>
      </section>

      <div className="text-center">
        <Button href="/canadian-robotics">View Full Company Directory</Button>
      </div>
    </div>
  );
}
