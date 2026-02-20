import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Customer Success Stories — Real Deployments',
  description: 'How Canadian businesses are deploying humanoid robots — real success stories from warehousing, manufacturing, healthcare, and research.',
  alternates: { canonical: 'https://robonorth.ca/success-stories' },
};

const stories = [
  {
    company: 'GTA Fulfillment Co.',
    industry: 'Logistics & Warehousing',
    location: 'Brampton, ON',
    robot: 'Agility Digit',
    quote: 'We reduced peak-season temporary hiring by 25% and eliminated workplace injuries in our unloading zone. The ROI was clear within 6 months.',
    contact: 'Marcus Williams, VP Operations',
    metrics: [
      { label: 'Temp hiring reduced', value: '25%' },
      { label: 'Throughput increase', value: '18%' },
      { label: 'Workplace injuries', value: '0' },
    ],
  },
  {
    company: 'University of Toronto Robotics Lab',
    industry: 'Research & Education',
    location: 'Toronto, ON',
    robot: 'Unitree G1',
    quote: 'The G1 democratized our research. We can afford to take risks with $16K robots that we\'d never take with a $150K platform. Research output is up 40%.',
    contact: 'Dr. Sarah Chen, Lab Director',
    metrics: [
      { label: 'Research output', value: '+40%' },
      { label: 'Cost per lab', value: '-75%' },
      { label: 'Industry partnerships', value: '3 new' },
    ],
  },
  {
    company: 'Alberta Energy Services',
    industry: 'Energy & Resources',
    location: 'Fort McMurray, AB',
    robot: 'Boston Dynamics Spot + Humanoid evaluation',
    quote: 'Every worker we keep out of a confined space is a potential rescue we don\'t need to plan. The safety ROI alone justified the investment.',
    contact: 'HSE Manager',
    metrics: [
      { label: 'Inspections automated', value: '60%' },
      { label: 'H₂S exposure reduced', value: '40%' },
      { label: 'Annual savings', value: '$1.2M' },
    ],
  },
  {
    company: 'Montreal AI Startup',
    industry: 'Technology',
    location: 'Montreal, QC',
    robot: 'Sanctuary AI Phoenix',
    quote: 'Having a Canadian-made humanoid with local support was a game-changer. Carbon AI learned our specific tasks in under two days.',
    contact: 'Jean-Pierre Bouchard, CTO',
    metrics: [
      { label: 'Task learning time', value: '<2 days' },
      { label: 'Support response', value: '<4 hours' },
      { label: 'Import complexity', value: 'Zero' },
    ],
  },
];

export default function SuccessStoriesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Success Stories</span>
      </nav>

      <div className="mb-10">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Case Studies</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Customer Success Stories</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
          Real Canadian businesses deploying humanoid robots — the results, the lessons, and the impact.
        </p>
      </div>

      <div className="space-y-8">
        {stories.map(story => (
          <article key={story.company} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-8 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-gray-400 dark:text-gray-500">
              <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded font-semibold">{story.industry}</span>
              <span>{story.location}</span>
              <span>·</span>
              <span>Robot: {story.robot}</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{story.company}</h2>
            <blockquote className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 italic border-l-4 border-blue-200 dark:border-blue-800 pl-4">
              &ldquo;{story.quote}&rdquo;
            </blockquote>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">— {story.contact}</p>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              {story.metrics.map(m => (
                <div key={m.label} className="text-center">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{m.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{m.label}</div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          Want to share your robot deployment story?
        </p>
        <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-semibold text-sm">
          Get in touch — we&apos;d love to feature you →
        </Link>
      </div>
    </div>
  );
}
