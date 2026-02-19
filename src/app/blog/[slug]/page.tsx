import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPosts } from '@/data/blog';
import { blogPostJsonLd } from '@/lib/jsonld';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const categoryVariant: Record<string, 'info' | 'success' | 'warning' | 'default'> = {
  Industry: 'info',
  Guide: 'success',
  'Case Studies': 'warning',
};

export function generateStaticParams() {
  return getAllBlogPosts().map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

// Simple markdown-to-HTML renderer for blog content
function renderMarkdown(content: string): string {
  return content
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-gray-900 mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-gray-900 mt-10 mb-4">$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links - internal
    .replace(/\[(.+?)\]\((\/.+?)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2">$1</a>')
    // Links - external
    .replace(/\[(.+?)\]\((https?.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2">$1</a>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-8 border-gray-200" />')
    // Unordered list items
    .replace(/^- (.+)$/gm, '<li class="ml-4 pl-2 text-gray-600 leading-relaxed list-disc">$1</li>')
    // Table handling
    .replace(/\| (.+) \|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim()).map(c => c.trim());
      if (cells.every(c => /^[-:]+$/.test(c))) return '<!-- table separator -->';
      return `<tr>${cells.map(c => `<td class="px-4 py-2.5 border-b border-gray-100 text-sm text-gray-700">${c}</td>`).join('')}</tr>`;
    })
    // Paragraphs - wrap non-HTML lines
    .split('\n')
    .map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<')) return trimmed;
      if (trimmed.startsWith('<!-- ')) return '';
      return `<p class="text-gray-600 leading-relaxed mb-4">${trimmed}</p>`;
    })
    .join('\n');
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllBlogPosts();
  const otherPosts = allPosts.filter(p => p.slug !== slug).slice(0, 2);
  const jsonLd = blogPostJsonLd(post);
  const htmlContent = renderMarkdown(post.content);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <Link href="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 font-medium line-clamp-1">{post.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main content */}
        <article className="lg:col-span-8">
          {/* Header */}
          <header className="mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Badge text={post.category} variant={categoryVariant[post.category] || 'default'} />
              <span className="text-sm text-gray-400">{post.readTime}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">
                RN
              </div>
              <span className="font-medium text-gray-700">{post.author}</span>
              <span>·</span>
              <time dateTime={post.date}>
                {new Date(post.date + 'T00:00:00').toLocaleDateString('en-CA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </header>

          {/* Article body */}
          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Post footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Looking for a humanoid robot?</h3>
                <p className="text-sm text-gray-500">Browse our catalog or get personalized guidance from our team.</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button href="/robots" size="sm">Browse Robots</Button>
                <Button href="/inquiry" variant="outline" size="sm">Get in Touch</Button>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            {/* Related posts */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">More Articles</h3>
              <div className="space-y-4">
                {otherPosts.map(other => (
                  <Link key={other.slug} href={`/blog/${other.slug}`} className="block group">
                    <div className="flex items-start gap-2 mb-1">
                      <Badge text={other.category} variant={categoryVariant[other.category] || 'default'} />
                      <span className="text-xs text-gray-400">{other.readTime}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors leading-snug">
                      {other.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { href: '/robots', label: 'Robot Catalog', icon: '🤖' },
                  { href: '/compare', label: 'Compare Models', icon: '⚖️' },
                  { href: '/manufacturers', label: 'Manufacturers', icon: '🏭' },
                  { href: '/inquiry', label: 'Get Early Access', icon: '🚀' },
                ].map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-700 transition-colors"
                  >
                    <span>{link.icon}</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* More posts */}
      {otherPosts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Continue Reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherPosts.map(other => (
              <Link key={other.slug} href={`/blog/${other.slug}`} className="group">
                <article className="bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-200 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge text={other.category} variant={categoryVariant[other.category] || 'default'} />
                    <span className="text-xs text-gray-400">{other.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {other.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{other.excerpt}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
