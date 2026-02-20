import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// Improvement #46: Webinar/demo scheduling page

export const metadata: Metadata = {
  title: 'Webinars & Live Demos — See Humanoid Robots in Action',
  description: 'Attend free webinars and live demo sessions. See humanoid robots in action, ask questions to experts, and learn about deployment options.',
  alternates: { canonical: 'https://robonorth.ca/webinars' },
};

const upcoming = [
  { title: 'Unitree G1 Deep Dive: Setup, SDK & First Impressions', date: 'June 26, 2026', time: '2:00 PM ET', type: 'Live Demo', spots: 45, desc: 'Hands-on walkthrough of the Unitree G1 — from unboxing to running your first SDK commands.', speaker: 'Alex Park, RoboNorth Technical Lead' },
  { title: 'ROI of Humanoid Robots in Canadian Manufacturing', date: 'July 3, 2026', time: '1:00 PM ET', type: 'Webinar', spots: 100, desc: 'Real numbers from real deployments. Learn how to build a business case for humanoid robots.', speaker: 'RoboNorth Team + Guest Manufacturer' },
  { title: 'Importing Robots to Canada: A Step-by-Step Guide', date: 'July 10, 2026', time: '11:00 AM ET', type: 'Webinar', spots: 75, desc: 'HS codes, customs duties, brokerage, and regulatory requirements — everything you need to know.', speaker: 'Trade Compliance Specialist' },
  { title: 'Figure 02 vs Tesla Optimus: Head-to-Head Comparison', date: 'July 17, 2026', time: '2:00 PM ET', type: 'Webinar', spots: 150, desc: 'In-depth comparison of the two most anticipated enterprise humanoid robots for Canadian businesses.', speaker: 'RoboNorth Analysis Team' },
];

const past = [
  { title: 'Introduction to Humanoid Robotics for Canadian Businesses', date: 'May 2026', views: 1247 },
  { title: 'Government Grants for Robotics: SR&ED & IRAP Explained', date: 'April 2026', views: 892 },
  { title: 'Safety Certification Overview for Robot Deployments', date: 'March 2026', views: 634 },
];

export default function WebinarsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link><span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Webinars</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">🎥 Learn</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Webinars & Live Demos</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Free sessions to see robots in action, learn from experts, and ask questions.</p>
      </div>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Sessions</h2>
      <div className="space-y-4 mb-12">
        {upcoming.map(event => (
          <div key={event.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${event.type === 'Live Demo' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>{event.type}</span>
                  <span className="text-xs text-gray-400">{event.spots} spots left</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{event.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{event.desc}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                  <span>📅 {event.date}</span>
                  <span>🕐 {event.time}</span>
                  <span>🎙️ {event.speaker}</span>
                </div>
              </div>
              <Button href={`/inquiry?type=webinar&session=${encodeURIComponent(event.title)}`} variant="primary" size="sm">
                Register →
              </Button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Past Recordings</h2>
      <div className="space-y-3 mb-12">
        {past.map(p => (
          <div key={p.title} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{p.title}</h3>
              <p className="text-xs text-gray-400">{p.date} · {p.views.toLocaleString()} views</p>
            </div>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Watch →</span>
          </div>
        ))}
      </div>
    </div>
  );
}
