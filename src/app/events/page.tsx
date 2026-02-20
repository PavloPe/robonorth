import type { Metadata } from 'next';
import Link from 'next/link';

// Improvement #25: Events page

export const metadata: Metadata = {
  title: 'Robotics Events & Conferences in Canada — 2026-2027',
  description: 'Upcoming robotics conferences, trade shows, and meetups in Canada. Connect with manufacturers, researchers, and industry leaders.',
  alternates: { canonical: 'https://robonorth.ca/events' },
};

interface Event {
  name: string;
  date: string;
  location: string;
  type: 'conference' | 'tradeshow' | 'meetup' | 'webinar';
  description: string;
  url?: string;
  robonorthPresence: boolean;
}

const events: Event[] = [
  { name: 'ICRA 2026 — IEEE International Conference on Robotics and Automation', date: 'May 19–23, 2026', location: 'Atlanta, GA (Canadian delegation)', type: 'conference', description: 'The world\'s premier robotics research conference. Multiple Canadian labs presenting papers on humanoid robotics.', robonorthPresence: false },
  { name: 'Canadian Manufacturing Technology Show (CMTS)', date: 'September 28 – October 1, 2026', location: 'Toronto, ON', type: 'tradeshow', description: 'Canada\'s largest manufacturing trade show. Humanoid robots on display for the first time in 2026. RoboNorth booth confirmed.', robonorthPresence: true },
  { name: 'Montreal AI & Robotics Summit', date: 'October 15–16, 2026', location: 'Montreal, QC', type: 'conference', description: 'Mila-hosted summit bringing together AI researchers and robotics companies. Focus on embodied AI and humanoid systems.', robonorthPresence: true },
  { name: 'RoboNorth Live Demo Day', date: 'November 5, 2026', location: 'Vancouver, BC', type: 'meetup', description: 'Hands-on demo day featuring live humanoid robot demonstrations. Meet representatives from Sanctuary AI, Unitree, and more.', robonorthPresence: true },
  { name: 'Western Canadian Robotics Expo', date: 'November 20–21, 2026', location: 'Calgary, AB', type: 'tradeshow', description: 'Energy sector robotics focus. Showcasing robots for inspection, maintenance, and hazardous environment operations.', robonorthPresence: true },
  { name: 'Humanoid Robotics for Canadian Business (Webinar)', date: 'Monthly — Last Thursday', location: 'Online', type: 'webinar', description: 'Free monthly webinar covering humanoid robot updates, new model announcements, and Canadian market insights.', robonorthPresence: true },
  { name: 'CES 2027', date: 'January 7–10, 2027', location: 'Las Vegas, NV', type: 'tradeshow', description: 'The world\'s largest consumer electronics show. Expect major humanoid robot announcements and cold-weather variant reveals.', robonorthPresence: false },
  { name: 'Automate 2027', date: 'May 2027', location: 'Detroit, MI', type: 'tradeshow', description: 'North America\'s largest automation trade show. Humanoid robotics pavilion expected to be the biggest section.', robonorthPresence: true },
];

const typeColors: Record<string, string> = {
  conference: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  tradeshow: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  meetup: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  webinar: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

export default function EventsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Events</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">📅 Calendar</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Robotics Events & Conferences</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Upcoming events where you can see humanoid robots in action, meet manufacturers, and connect with the Canadian robotics community.</p>
      </div>

      <div className="space-y-4">
        {events.map(event => (
          <div key={event.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex flex-col items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800">
                <span className="text-lg">📅</span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${typeColors[event.type]} capitalize`}>{event.type}</span>
                      {event.robonorthPresence && (
                        <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-blue-600 text-white">RoboNorth Present</span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">{event.name}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>🗓️ {event.date}</span>
                  <span>📍 {event.location}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Want to Meet Us at an Event?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Schedule a meeting in advance and we&apos;ll arrange a private demo at any event where RoboNorth is present.</p>
        <Link href="/inquiry?type=event-meeting" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
          Schedule a Meeting →
        </Link>
      </div>
    </div>
  );
}
