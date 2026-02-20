import type { Metadata } from 'next';
import Link from 'next/link';

// Improvement #18: Canadian robotics industry map

export const metadata: Metadata = {
  title: 'Canadian Robotics Industry Map — Companies by Province',
  description: 'Explore the Canadian robotics industry map. Discover robotics companies, labs, and manufacturers across every province and territory.',
  alternates: { canonical: 'https://robonorth.ca/industry-map' },
};

interface Company {
  name: string;
  location: string;
  focus: string;
  type: 'manufacturer' | 'research' | 'integrator' | 'startup';
}

interface Province {
  code: string;
  name: string;
  companies: Company[];
  highlights: string;
}

const provinces: Province[] = [
  {
    code: 'BC', name: 'British Columbia',
    highlights: 'Home to Sanctuary AI — Canada\'s flagship humanoid robotics company',
    companies: [
      { name: 'Sanctuary AI', location: 'Vancouver', focus: 'General-purpose humanoid robots (Phoenix)', type: 'manufacturer' },
      { name: 'Kinova Robotics (West)', location: 'Vancouver', focus: 'Collaborative robotic arms', type: 'manufacturer' },
      { name: 'UBC Robotics Lab', location: 'Vancouver', focus: 'Academic robotics research', type: 'research' },
      { name: 'StarChase Robotics', location: 'Victoria', focus: 'Autonomous systems & drones', type: 'startup' },
    ],
  },
  {
    code: 'AB', name: 'Alberta',
    highlights: 'Energy sector robotics & AI research hub (Amii, U of A)',
    companies: [
      { name: 'Alberta Machine Intelligence Institute (Amii)', location: 'Edmonton', focus: 'AI research powering robotics', type: 'research' },
      { name: 'University of Alberta Robotics', location: 'Edmonton', focus: 'Reinforcement learning for robots', type: 'research' },
      { name: 'Attabotics', location: 'Calgary', focus: 'Warehouse robotics & automation', type: 'startup' },
      { name: 'SAIT Polytechnic Robotics', location: 'Calgary', focus: 'Applied robotics training', type: 'research' },
    ],
  },
  {
    code: 'ON', name: 'Ontario',
    highlights: 'Canada\'s largest robotics ecosystem — Vector Institute, Clearpath, MDA',
    companies: [
      { name: 'Vector Institute', location: 'Toronto', focus: 'AI research for autonomous systems', type: 'research' },
      { name: 'Clearpath Robotics / Otto Motors', location: 'Kitchener', focus: 'Autonomous mobile robots for logistics', type: 'manufacturer' },
      { name: 'MDA Space (Canadarm)', location: 'Brampton', focus: 'Space robotics, Canadarm legacy', type: 'manufacturer' },
      { name: 'ARA Robotics', location: 'Waterloo', focus: 'Drone / autonomous systems', type: 'startup' },
      { name: 'University of Toronto Robotics', location: 'Toronto', focus: 'Manipulation, locomotion research', type: 'research' },
      { name: 'Myant', location: 'Toronto', focus: 'Smart textiles for robot-human interfaces', type: 'startup' },
    ],
  },
  {
    code: 'QC', name: 'Quebec',
    highlights: 'World-class AI research (Mila) powering next-gen robot intelligence',
    companies: [
      { name: 'Mila — Quebec AI Institute', location: 'Montreal', focus: 'Deep learning, reinforcement learning', type: 'research' },
      { name: 'Kinova Robotics', location: 'Boisbriand', focus: 'Collaborative & assistive robotic arms', type: 'manufacturer' },
      { name: 'McGill Centre for Intelligent Machines', location: 'Montreal', focus: 'Mobile robots, haptics', type: 'research' },
      { name: 'Robotiq', location: 'Lévis', focus: 'Collaborative robot grippers & sensors', type: 'manufacturer' },
    ],
  },
  {
    code: 'MB', name: 'Manitoba',
    highlights: 'Growing aerospace robotics and agricultural automation',
    companies: [
      { name: 'Magellan Aerospace', location: 'Winnipeg', focus: 'Aerospace manufacturing automation', type: 'integrator' },
      { name: 'U of Manitoba Robotics', location: 'Winnipeg', focus: 'Agricultural & space robotics', type: 'research' },
    ],
  },
  {
    code: 'SK', name: 'Saskatchewan',
    highlights: 'Agricultural robotics innovation and mining automation',
    companies: [
      { name: 'U of Saskatchewan Robotics', location: 'Saskatoon', focus: 'Agricultural robotics research', type: 'research' },
      { name: 'Raven Industries (CNH)', location: 'Regina', focus: 'Precision agriculture automation', type: 'integrator' },
    ],
  },
  {
    code: 'NS', name: 'Nova Scotia',
    highlights: 'Ocean robotics & marine autonomy',
    companies: [
      { name: 'Dalhousie Ocean Robotics', location: 'Halifax', focus: 'Marine autonomous systems', type: 'research' },
      { name: 'Cellula Robotics', location: 'Halifax', focus: 'Subsea autonomous vehicles', type: 'startup' },
    ],
  },
  {
    code: 'NB', name: 'New Brunswick',
    highlights: 'Emerging tech corridor with cyber and automation focus',
    companies: [
      { name: 'UNB Mechanical Engineering Robotics', location: 'Fredericton', focus: 'Biomechanics & assistive robots', type: 'research' },
    ],
  },
];

const typeColors: Record<string, string> = {
  manufacturer: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  research: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  integrator: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  startup: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
};

export default function IndustryMapPage() {
  const totalCompanies = provinces.reduce((sum, p) => sum + p.companies.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Industry Map</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">🇨🇦 Ecosystem</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Canadian Robotics Industry Map
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          {totalCompanies} companies, labs, and organizations across {provinces.length} provinces powering Canada&apos;s robotics revolution.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {Object.entries(typeColors).map(([key, cls]) => (
          <span key={key} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${cls} capitalize`}>
            {key}
          </span>
        ))}
      </div>

      {/* Province cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {provinces.map(province => (
          <div key={province.code} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center justify-center">
                <span className="text-xs font-bold text-red-600 dark:text-red-400">{province.code}</span>
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">{province.name}</h2>
                <p className="text-[10px] text-gray-400">{province.companies.length} organizations</p>
              </div>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-4">{province.highlights}</p>

            <div className="space-y-3">
              {province.companies.map(company => (
                <div key={company.name} className="flex items-start gap-3">
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap mt-0.5 ${typeColors[company.type]}`}>
                    {company.type}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{company.name}</p>
                    <p className="text-xs text-gray-500">{company.location} — {company.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Know a Canadian robotics company we should add?</p>
        <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
          Submit a Company →
        </Link>
      </div>
    </div>
  );
}
