import type { Metadata } from 'next';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Robot News & Insights',
  description: 'Stay up to date with humanoid robot news, buying guides, price comparisons, and industry insights for Canadian buyers.',
};

const posts = [
  { title: 'Tesla Optimus Gen 3: What Canadians Need to Know', category: 'Guide',
    excerpt: 'Complete breakdown of Tesla\'s latest humanoid robot — pricing, availability for Canada, and how it stacks up.' },
  { title: 'Humanoid Robot Pricing Guide 2026', category: 'Pricing',
    excerpt: 'Every humanoid robot priced. From $5,900 entry-level to $250,000+ enterprise — find the right robot for your budget.' },
  { title: '1X NEO Pre-Order: Complete Guide', category: 'Guide',
    excerpt: 'Everything about pre-ordering the 1X NEO home robot in Canada. Pricing, delivery timeline, expectations.' },
  { title: 'Robot Parts Buying Guide for Beginners', category: 'Tutorial',
    excerpt: 'New to robotics? What you need to know about actuators, sensors, and controllers for your first build.' },
  { title: 'Sanctuary AI Phoenix: Canada\'s Own Robot', category: 'Profile',
    excerpt: 'Vancouver-based Sanctuary AI builds one of the most advanced humanoid robots in the world.' },
  { title: 'Unitree G1 vs 1X NEO: Best Consumer Robot', category: 'Comparison',
    excerpt: 'Two robots, two philosophies. Side-by-side comparison for Canadian buyers.' },
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Robot News & Insights</h1>
        <p className="text-gray-500">Guides, comparisons, and news for the Canadian robot buyer.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map(post => (
          <article key={post.title} className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow p-5">
            <div className="flex items-center gap-2 mb-3">
              <Badge text={post.category} variant="info" />
              <Badge text="Coming Soon" variant="default" />
            </div>
            <h2 className="text-base font-semibold text-gray-900 mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 max-w-md mx-auto">
          <p className="text-gray-600 text-sm mb-3">Blog launching soon. Get notified:</p>
          <div className="flex gap-2">
            <input type="email" placeholder="your@email.com"
              className="flex-1 px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
