import type { Metadata } from 'next';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Robot News & Insights',
  description: 'Stay up to date with humanoid robot news, buying guides, price comparisons, and industry insights for Canadian robot buyers.',
};

const posts = [
  {
    title: 'Tesla Optimus Gen 3: What Canadians Need to Know',
    date: 'Coming Soon',
    excerpt: 'A comprehensive breakdown of Tesla\'s latest humanoid robot — pricing, availability timeline for Canada, and how it compares to the competition.',
    category: 'Guide',
  },
  {
    title: 'Humanoid Robot Pricing Guide 2026',
    date: 'Coming Soon',
    excerpt: 'Complete price comparison of every humanoid robot on the market. From $5,900 entry-level to $250,000+ enterprise systems — find the right robot for your budget.',
    category: 'Pricing',
  },
  {
    title: '1X NEO Pre-Order: Complete Guide for Canadians',
    date: 'Coming Soon',
    excerpt: 'Everything you need to know about pre-ordering the 1X NEO home robot in Canada. Pricing, delivery timeline, and what to expect.',
    category: 'Guide',
  },
  {
    title: 'Robot Parts Buying Guide for Beginners',
    date: 'Coming Soon',
    excerpt: 'New to robotics? Here\'s what you need to know about buying actuators, sensors, and controllers for your first humanoid robot build.',
    category: 'Tutorial',
  },
  {
    title: 'Sanctuary AI Phoenix: Canada\'s Own Humanoid Robot',
    date: 'Coming Soon',
    excerpt: 'Vancouver-based Sanctuary AI is building one of the most advanced humanoid robots in the world. Here\'s what makes Phoenix special.',
    category: 'Profile',
  },
  {
    title: 'Unitree G1 vs 1X NEO: Best Consumer Humanoid Robot 2026',
    date: 'Coming Soon',
    excerpt: 'Two robots, two philosophies. We compare the Unitree G1 and 1X NEO across price, capability, and availability for Canadian buyers.',
    category: 'Comparison',
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-3">Robot News & Insights</h1>
        <p className="text-gray-400 text-lg">
          Guides, comparisons, and news for the Canadian robot buyer.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <article key={post.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Badge text={post.category} variant="info" />
              <Badge text="Coming Soon" variant="default" />
            </div>
            <h2 className="text-lg font-bold text-white mb-3">{post.title}</h2>
            <p className="text-sm text-gray-400 line-clamp-3">{post.excerpt}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
          <p className="text-gray-400 mb-4">Our blog is launching soon. Want to be notified?</p>
          <div className="flex justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
            <button className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold text-sm rounded-lg transition-colors">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
