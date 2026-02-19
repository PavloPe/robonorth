import type { Metadata } from 'next';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { getAllBlogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog — Robot News & Insights',
  description: 'Humanoid robot news, buying guides, industry analysis, and case studies for Canadian buyers and businesses. Expert analysis of the Canadian robotics market.',
  openGraph: {
    title: 'RoboNorth Blog — Humanoid Robot Insights for Canada',
    description: 'Buying guides, industry analysis, and case studies on humanoid robots in Canada.',
    url: 'https://robonorth.ca/blog',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'RoboNorth Blog' }],
  },
  alternates: {
    canonical: 'https://robonorth.ca/blog',
  },
};

const categoryVariant: Record<string, 'info' | 'success' | 'warning' | 'default'> = {
  Industry: 'info',
  Guide: 'success',
  'Case Studies': 'warning',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Blog</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Robot News & Insights</h1>
        <p className="text-gray-500 max-w-2xl">
          Guides, comparisons, case studies, and industry analysis for the Canadian robot buyer.
        </p>
      </div>

      {/* Featured post (first one) */}
      {posts.length > 0 && (
        <Link
          href={`/blog/${posts[0].slug}`}
          className="block mb-10 group"
        >
          <article className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 border border-gray-200/80 rounded-2xl p-8 sm:p-10 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <Badge text={posts[0].category} variant={categoryVariant[posts[0].category] || 'default'} />
              <span className="text-xs text-gray-400">{posts[0].readTime}</span>
              <span className="text-xs text-gray-400">·</span>
              <time className="text-xs text-gray-400" dateTime={posts[0].date}>
                {new Date(posts[0].date + 'T00:00:00').toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
              {posts[0].title}
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-3xl">
              {posts[0].excerpt}
            </p>
            <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
              Read article
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </span>
          </article>
        </Link>
      )}

      {/* Other posts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.slice(1).map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <article className="bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-200 p-6 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Badge text={post.category} variant={categoryVariant[post.category] || 'default'} />
                <span className="text-xs text-gray-400">{post.readTime}</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <time className="text-xs text-gray-400" dateTime={post.date}>
                  {new Date(post.date + 'T00:00:00').toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                  Read →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Newsletter CTA */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl p-8 sm:p-10 max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-[-50%] right-[-20%] w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-xl font-bold text-white mb-2">Stay in the loop</h2>
            <p className="text-blue-200 text-sm mb-5">Get notified when we publish new articles about humanoid robots in Canada.</p>
            <div className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <button className="px-5 py-2.5 bg-white text-slate-900 font-semibold text-sm rounded-lg hover:bg-slate-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
