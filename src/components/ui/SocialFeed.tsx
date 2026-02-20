// Improvement #45: Social media feed integration placeholders

import Link from 'next/link';

const tweets = [
  { author: 'RoboNorth', handle: '@robonorth', text: '🤖 The Unitree G1 EDU is now available for direct shipping to Canada! $16K for a 43-DOF humanoid. The future of robotics education is here. #robotics #Canada', time: '2h', likes: 128 },
  { author: 'RoboNorth', handle: '@robonorth', text: '📊 New blog: "Canadian Robotics Policy Landscape in 2026" — everything you need to know about AIDA, SR&ED, and provincial incentives.', time: '1d', likes: 89 },
  { author: 'RoboNorth', handle: '@robonorth', text: '🇨🇦 Sanctuary AI just announced Phoenix Gen 2 production scaling in Vancouver. Proud to see Canadian-made humanoid robots leading the world.', time: '3d', likes: 256 },
];

const linkedinPosts = [
  { title: 'The ROI of Humanoid Robots in Canadian Manufacturing', preview: 'We analyzed 15 Canadian manufacturers who piloted humanoid robots in 2025. The results are striking: average 18-month payback period...', engagement: '2.4K views' },
  { title: 'Hiring: Robotics Integration Specialist (Toronto, ON)', preview: 'RoboNorth is growing! We\'re looking for an experienced robotics integration specialist to join our technical team...', engagement: '1.1K views' },
];

export default function SocialFeed() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Social</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Follow Us</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Stay updated on the latest from RoboNorth</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Twitter/X Feed */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-gray-800 dark:text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            <span className="text-sm font-bold text-gray-900 dark:text-white">@robonorth</span>
          </div>
          <div className="space-y-4">
            {tweets.map((tweet, i) => (
              <div key={i} className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-4 last:pb-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{tweet.author}</span>
                  <span className="text-xs text-gray-400">{tweet.handle} · {tweet.time}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{tweet.text}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                  <span>❤️ {tweet.likes}</span>
                  <span>🔁 Share</span>
                </div>
              </div>
            ))}
          </div>
          <Link href="https://twitter.com/robonorth" className="block mt-4 text-center text-xs text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700" target="_blank" rel="noopener">
            Follow on X →
          </Link>
        </div>

        {/* LinkedIn Feed */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            <span className="text-sm font-bold text-gray-900 dark:text-white">RoboNorth</span>
          </div>
          <div className="space-y-4">
            {linkedinPosts.map((post, i) => (
              <div key={i} className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-4 last:pb-0">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{post.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{post.preview}</p>
                <span className="text-[10px] text-gray-400 mt-2 inline-block">{post.engagement}</span>
              </div>
            ))}
          </div>
          <Link href="https://linkedin.com/company/robonorth" className="block mt-4 text-center text-xs text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700" target="_blank" rel="noopener">
            Follow on LinkedIn →
          </Link>
        </div>
      </div>
    </section>
  );
}
