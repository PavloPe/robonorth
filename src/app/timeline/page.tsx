import type { Metadata } from 'next';
import Link from 'next/link';

// Improvement #14: Interactive timeline of robotics history

export const metadata: Metadata = {
  title: 'History of Robotics — Interactive Timeline',
  description: 'Explore the history of humanoid robotics from 1920 to 2026. Key milestones, breakthroughs, and the path to modern commercial humanoid robots.',
  alternates: { canonical: 'https://robonorth.ca/timeline' },
};

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: 'concept' | 'research' | 'commercial' | 'milestone' | 'canada';
  icon: string;
}

const events: TimelineEvent[] = [
  { year: '1920', title: 'The Word "Robot" Is Born', description: 'Czech playwright Karel Čapek introduces the word "robot" in his play R.U.R. (Rossum\'s Universal Robots).', category: 'concept', icon: '📖' },
  { year: '1954', title: 'First Industrial Robot Patent', description: 'George Devol patents the Unimate, the first programmable industrial robot arm.', category: 'milestone', icon: '🏭' },
  { year: '1961', title: 'Unimate Joins GM Assembly Line', description: 'The first Unimate robot is installed at a General Motors plant in New Jersey.', category: 'commercial', icon: '🔧' },
  { year: '1973', title: 'WABOT-1 — First Full-Scale Humanoid', description: 'Waseda University in Japan creates WABOT-1, the first full-scale anthropomorphic robot capable of walking.', category: 'research', icon: '🚶' },
  { year: '1986', title: 'Honda Begins Humanoid Research', description: 'Honda starts a secret humanoid robotics program that would eventually produce ASIMO.', category: 'research', icon: '🔬' },
  { year: '1996', title: 'Honda P2 Prototype', description: 'Honda reveals the P2 humanoid robot — the first truly autonomous, self-contained walking humanoid.', category: 'milestone', icon: '🤖' },
  { year: '2000', title: 'ASIMO Unveiled', description: 'Honda unveils ASIMO, the world\'s most advanced humanoid robot at the time. It can walk, climb stairs, and interact.', category: 'milestone', icon: '⭐' },
  { year: '2004', title: 'Canadarm2 Operates on ISS', description: 'Canada\'s Canadarm2 robotic arm becomes fully operational on the International Space Station, showcasing Canadian robotics excellence.', category: 'canada', icon: '🇨🇦' },
  { year: '2013', title: 'Boston Dynamics Atlas (DARPA)', description: 'Boston Dynamics unveils Atlas, a hydraulic humanoid designed for the DARPA Robotics Challenge.', category: 'research', icon: '💪' },
  { year: '2016', title: 'Sophia by Hanson Robotics', description: 'Sophia, a social humanoid robot with expressive face, is activated and becomes a global media sensation.', category: 'milestone', icon: '🗣️' },
  { year: '2017', title: 'Atlas Does Backflips', description: 'Boston Dynamics\' Atlas performs a standing backflip, demonstrating unprecedented agility in humanoid robots.', category: 'milestone', icon: '🤸' },
  { year: '2018', title: 'Sanctuary AI Founded in Vancouver', description: 'Sanctuary AI is founded in Vancouver, BC — Canada\'s first world-class humanoid robotics company targeting general-purpose robots.', category: 'canada', icon: '🇨🇦' },
  { year: '2022', title: 'Tesla Announces Optimus', description: 'Elon Musk unveils the Tesla Bot prototype at AI Day 2022, signaling Tesla\'s entry into humanoid robotics.', category: 'commercial', icon: '⚡' },
  { year: '2023', title: 'Figure AI Raises $70M', description: 'Figure AI raises a massive funding round to build general-purpose humanoid robots for the workforce.', category: 'commercial', icon: '💰' },
  { year: '2023', title: 'Unitree G1 Announced', description: 'Chinese robotics company Unitree announces the G1 humanoid robot at under $16,000, making humanoids accessible.', category: 'commercial', icon: '🎯' },
  { year: '2024', title: 'Figure + BMW + OpenAI Partnership', description: 'Figure AI partners with BMW for factory deployment and integrates OpenAI for conversational control.', category: 'commercial', icon: '🤝' },
  { year: '2024', title: 'Atlas Goes Electric', description: 'Boston Dynamics retires hydraulic Atlas and reveals a new fully electric Atlas designed for commercial use.', category: 'milestone', icon: '🔋' },
  { year: '2024', title: 'Sanctuary AI Phoenix Gen 2', description: 'Vancouver-based Sanctuary AI unveils Phoenix Gen 2 with improved dexterity and their Carbon AI system.', category: 'canada', icon: '🇨🇦' },
  { year: '2025', title: 'Humanoid Market Boom', description: 'Over 20 humanoid robot models become commercially available or enter pilot programs. The market exceeds $1B.', category: 'commercial', icon: '📈' },
  { year: '2025', title: 'Canadian Businesses Begin Adoption', description: 'First wave of Canadian manufacturers, logistics companies, and research labs begin deploying humanoid robots.', category: 'canada', icon: '🇨🇦' },
  { year: '2026', title: 'RoboNorth Launches', description: 'Canada\'s first dedicated humanoid robot marketplace launches, helping Canadians browse, compare, and acquire robots.', category: 'canada', icon: '🚀' },
];

const categoryColors: Record<string, string> = {
  concept: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800',
  research: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
  commercial: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
  milestone: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
  canada: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
};

const categoryLabels: Record<string, string> = {
  concept: 'Concept',
  research: 'Research',
  commercial: 'Commercial',
  milestone: 'Milestone',
  canada: 'Canada',
};

export default function TimelinePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Timeline</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">History</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">The History of Humanoid Robotics</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          From science fiction to factory floors — over 100 years of humanoid robotics innovation.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <span key={key} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${categoryColors[key]}`}>
            {label}
          </span>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-500 sm:-translate-x-px" />

        <div className="space-y-8">
          {events.map((event, i) => (
            <div key={i} className={`relative flex items-start gap-4 sm:gap-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
              {/* Dot */}
              <div className="absolute left-6 sm:left-1/2 w-3 h-3 bg-blue-600 rounded-full border-2 border-white dark:border-gray-950 -translate-x-1/2 mt-2 z-10 shadow-sm" />

              {/* Content card */}
              <div className={`ml-12 sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'sm:pr-4' : 'sm:pl-4'}`}>
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-200 dark:hover:border-blue-800 transition-colors group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{event.icon}</span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{event.year}</span>
                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${categoryColors[event.category]}`}>
                      {categoryLabels[event.category]}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <p className="text-gray-500 dark:text-gray-400 mb-4">The next chapter is being written right now.</p>
        <Link href="/robots" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
          Explore Today&apos;s Robots →
        </Link>
      </div>
    </div>
  );
}
