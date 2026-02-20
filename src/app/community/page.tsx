import type { Metadata } from 'next';
import Link from 'next/link';

// Improvement #41: Community forum placeholder page

export const metadata: Metadata = {
  title: 'Community Forum — Connect with Canadian Robot Enthusiasts',
  description: 'Join the RoboNorth community forum. Discuss humanoid robots, share experiences, ask questions, and connect with other Canadian robot enthusiasts and professionals.',
  alternates: { canonical: 'https://robonorth.ca/community' },
};

const forumCategories = [
  { icon: '💬', name: 'General Discussion', topics: 142, posts: 1284, desc: 'Open conversation about humanoid robots, industry news, and the future of robotics in Canada.', lastPost: '2 hours ago' },
  { icon: '🤖', name: 'Robot Reviews', topics: 38, posts: 256, desc: 'Share your experience with specific robot models. First-hand reviews and deployment stories.', lastPost: '5 hours ago' },
  { icon: '🔧', name: 'Technical Help', topics: 89, posts: 543, desc: 'Get help with robot setup, maintenance, integration, and troubleshooting.', lastPost: '1 hour ago' },
  { icon: '💼', name: 'Business & Enterprise', topics: 56, posts: 312, desc: 'Discuss ROI, business cases, deployment strategies, and enterprise robotics planning.', lastPost: '12 hours ago' },
  { icon: '🇨🇦', name: 'Canadian Market', topics: 67, posts: 445, desc: 'Import guides, customs tips, provincial regulations, and Canadian-specific topics.', lastPost: '3 hours ago' },
  { icon: '🎓', name: 'Research & Education', topics: 45, posts: 198, desc: 'Academic research, student projects, educational programs, and lab setups.', lastPost: '1 day ago' },
  { icon: '📢', name: 'Jobs & Careers', topics: 23, posts: 87, desc: 'Robotics job postings, career advice, and professional development resources.', lastPost: '6 hours ago' },
  { icon: '🏪', name: 'Buy / Sell / Trade', topics: 34, posts: 156, desc: 'Marketplace for used robots, parts, accessories, and related equipment.', lastPost: '4 hours ago' },
];

export default function CommunityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Community</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">🌐 Forum</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">RoboNorth Community</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Connect with other Canadian robot enthusiasts, professionals, and researchers. Share knowledge, ask questions, and stay informed.</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Members', value: '2,847' },
          { label: 'Topics', value: '494' },
          { label: 'Posts', value: '3,281' },
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
            <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Forum categories */}
      <div className="space-y-3">
        {forumCategories.map(cat => (
          <div key={cat.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-blue-200 dark:hover:border-blue-800 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-lg shrink-0">
                {cat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cat.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{cat.desc}</p>
              </div>
              <div className="hidden sm:flex items-center gap-6 text-xs text-gray-400 shrink-0">
                <div className="text-center"><p className="font-semibold text-gray-600 dark:text-gray-300">{cat.topics}</p><p>Topics</p></div>
                <div className="text-center"><p className="font-semibold text-gray-600 dark:text-gray-300">{cat.posts}</p><p>Posts</p></div>
                <div className="text-right w-20"><p>Last post</p><p className="text-blue-500">{cat.lastPost}</p></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coming soon notice */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6 text-center">
        <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">Community Forum — Coming Soon!</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">We&apos;re building a community space for Canadian robot enthusiasts. Be the first to know when it launches.</p>
        <Link href="/inquiry?type=community" className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
          Join the Waitlist →
        </Link>
      </div>
    </div>
  );
}
