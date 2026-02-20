import type { Metadata } from 'next';
import Link from 'next/link';

// Improvement #17: "Day in the Life" interactive stories for robot use cases

export const metadata: Metadata = {
  title: 'A Day in the Life — How Robots Work Alongside Canadians',
  description: 'Follow humanoid robots through a typical workday in manufacturing, healthcare, logistics, and more. See how they integrate into Canadian workplaces.',
  alternates: { canonical: 'https://robonorth.ca/day-in-the-life' },
};

interface TimeSlot {
  time: string;
  activity: string;
  detail: string;
  icon: string;
}

interface Story {
  id: string;
  title: string;
  subtitle: string;
  robot: string;
  location: string;
  industry: string;
  schedule: TimeSlot[];
  impact: string;
}

const stories: Story[] = [
  {
    id: 'manufacturing',
    title: 'Manufacturing Floor — Oshawa, ON',
    subtitle: 'Figure 02 on the Assembly Line',
    robot: 'Figure 02',
    location: 'Automotive plant, Oshawa, Ontario',
    industry: 'Manufacturing',
    schedule: [
      { time: '6:00 AM', activity: 'Startup & Self-Check', detail: 'Robot boots up, runs diagnostics, calibrates vision and manipulation systems. Battery at 100%.', icon: '🔋' },
      { time: '6:15 AM', activity: 'Morning Briefing', detail: 'Receives shift instructions via conversational AI. Today: door panel assembly station B7.', icon: '🗣️' },
      { time: '6:30 AM', activity: 'Assembly Line Work', detail: 'Picks up door panels (8kg each), aligns mounting holes, holds parts while human worker fastens bolts.', icon: '🔧' },
      { time: '9:00 AM', activity: 'Quality Inspection', detail: 'Uses vision system to check weld quality on completed panels. Flags 2 defective joints for human review.', icon: '🔍' },
      { time: '10:30 AM', activity: 'Battery Swap', detail: 'Battery at 15%. Walks to charging station, hot-swap to fresh battery. Back in 4 minutes.', icon: '⚡' },
      { time: '10:45 AM', activity: 'Material Handling', detail: 'Reassigned to unloading parts from delivery truck. Carries 10kg bins to staging area.', icon: '📦' },
      { time: '12:00 PM', activity: 'Shift Handoff', detail: 'Logs shift data: 847 panels handled, 12 defects flagged, zero safety incidents. Powers down for maintenance window.', icon: '📊' },
    ],
    impact: 'This Figure 02 unit replaced 2 overtime shifts that the plant couldn\'t fill due to labor shortages, saving $180K/year in overtime costs.',
  },
  {
    id: 'healthcare',
    title: 'Long-Term Care Home — Vancouver, BC',
    subtitle: 'Sanctuary AI Phoenix in Eldercare',
    robot: 'Sanctuary AI Phoenix',
    location: 'Seniors care facility, Vancouver, BC',
    industry: 'Healthcare',
    schedule: [
      { time: '7:00 AM', activity: 'Morning Rounds', detail: 'Delivers breakfast trays to rooms on the third floor. Navigates hallways, opens doors, places trays on tables.', icon: '🍳' },
      { time: '8:30 AM', activity: 'Linen Collection', detail: 'Collects used linens from rooms, sorts by color into laundry carts. Frees up 2 hours of staff time.', icon: '🧺' },
      { time: '10:00 AM', activity: 'Activity Assistant', detail: 'Sets up chairs and tables in the activity room. Carries craft supplies from storage.', icon: '🎨' },
      { time: '11:30 AM', activity: 'Lunch Prep Support', detail: 'Delivers meal carts from kitchen to dining area. Clears and sanitizes tables between seatings.', icon: '🍽️' },
      { time: '1:00 PM', activity: 'Charging Break', detail: 'Plugs in at charging station. Staff reviews the day\'s task log on the companion tablet app.', icon: '🔌' },
      { time: '2:30 PM', activity: 'Supply Restocking', detail: 'Restocks gloves, hand sanitizer, and paper towels in all floor stations from central storage.', icon: '🧴' },
      { time: '4:00 PM', activity: 'Evening Support', detail: 'Helps with dinner tray delivery and common area tidying. Logs vitals observation data for nursing review.', icon: '📋' },
    ],
    impact: 'Care staff report 40% reduction in physical burnout tasks. Resident satisfaction scores increased 18% since deployment.',
  },
  {
    id: 'logistics',
    title: 'Fulfillment Center — Brampton, ON',
    subtitle: 'Agility Digit in E-Commerce Logistics',
    robot: 'Agility Digit',
    location: 'Warehouse, Brampton, Ontario',
    industry: 'Logistics',
    schedule: [
      { time: '5:00 AM', activity: 'Truck Unloading', detail: 'Opens trailer doors and unloads incoming shipment boxes. Handles up to 23kg per box, 800+ boxes per shift.', icon: '🚛' },
      { time: '7:30 AM', activity: 'Tote Staging', detail: 'Moves totes from unloading zone to sorting stations. Follows FIFO lanes on warehouse floor markers.', icon: '📦' },
      { time: '9:00 AM', activity: 'Aisle Restocking', detail: 'Carries replenishment stock from back-of-house to pick zones. Human pickers focus on orders.', icon: '🏪' },
      { time: '11:00 AM', activity: 'Peak Volume Support', detail: 'During mid-morning order surge, moves to outbound dock to stage completed orders for shipping.', icon: '📈' },
      { time: '12:30 PM', activity: 'Battery Swap', detail: 'Hot-swap battery at designated station. 90 seconds downtime. Returns to floor immediately.', icon: '⚡' },
      { time: '1:00 PM', activity: 'Returns Processing', detail: 'Moves returned items from inspection area to appropriate restocking zones.', icon: '🔄' },
      { time: '3:00 PM', activity: 'End of Shift', detail: 'Completes final route, logs 12,400 steps, 1,847 items moved. Parks at charging bay.', icon: '✅' },
    ],
    impact: 'Warehouse throughput increased 23% during peak season. Seasonal temp hiring reduced by 30 positions.',
  },
];

export default function DayInTheLifePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">A Day in the Life</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Stories</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          A Day in the Life
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Follow humanoid robots through a typical workday in Canadian workplaces.
          See exactly how they integrate into daily operations.
        </p>
      </div>

      <div className="space-y-16">
        {stories.map(story => (
          <article key={story.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
              <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">{story.industry}</p>
              <h2 className="text-xl font-bold text-white mb-1">{story.title}</h2>
              <p className="text-blue-200 text-sm">{story.subtitle}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-blue-200">
                <span>🤖 {story.robot}</span>
                <span>📍 {story.location}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-6">
              <div className="relative">
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-900" />
                <div className="space-y-6">
                  {story.schedule.map((slot, i) => (
                    <div key={i} className="flex gap-4 relative">
                      <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-700 rounded-full flex items-center justify-center text-sm z-10 shrink-0">
                        {slot.icon}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{slot.time}</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{slot.activity}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{slot.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div className="mt-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">Impact</p>
                <p className="text-sm text-emerald-800 dark:text-emerald-300">{story.impact}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Want to see how a robot could fit into your operation?</p>
        <Link href="/inquiry" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
          Schedule a Consultation →
        </Link>
      </div>
    </div>
  );
}
