import type { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/db';

// Improvement #50: Comprehensive admin dashboard

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

async function getStats() {
  const [robotCount, manufacturerCount, inquiryCount, recentInquiries] = await Promise.all([
    prisma.robot.count(),
    prisma.manufacturer.count(),
    prisma.inquiry.count(),
    prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
  ]);

  const robots = await prisma.robot.findMany({
    select: { id: true, name: true, manufacturer: true, category: true, availability: true, featured: true, priceMin: true },
    orderBy: { name: 'asc' },
  });

  const categoryCounts = {
    consumer: robots.filter(r => r.category === 'consumer').length,
    enterprise: robots.filter(r => r.category === 'enterprise').length,
    research: robots.filter(r => r.category === 'research').length,
    announced: robots.filter(r => r.category === 'announced').length,
  };

  const availabilityCounts = {
    shipping: robots.filter(r => r.availability === 'shipping').length,
    preorder: robots.filter(r => r.availability === 'preorder').length,
    pilot: robots.filter(r => r.availability === 'pilot').length,
    announced: robots.filter(r => r.availability === 'announced').length,
    prototype: robots.filter(r => r.availability === 'prototype').length,
  };

  return { robotCount, manufacturerCount, inquiryCount, recentInquiries, robots, categoryCounts, availabilityCounts };
}

export default async function AdminDashboardPage() {
  const { robotCount, manufacturerCount, inquiryCount, recentInquiries, robots, categoryCounts, availabilityCounts } = await getStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Site overview and management</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full font-semibold">● System Healthy</span>
          <Link href="/api/health" className="text-xs text-blue-600 hover:text-blue-700 font-medium" target="_blank">API Status →</Link>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Robots', value: robotCount, icon: '🤖', color: 'blue' },
          { label: 'Manufacturers', value: manufacturerCount, icon: '🏭', color: 'purple' },
          { label: 'Inquiries', value: inquiryCount, icon: '📬', color: 'emerald' },
          { label: 'Blog Posts', value: 18, icon: '📝', color: 'amber' },
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent inquiries */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Recent Inquiries</h2>
          {recentInquiries.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">No inquiries yet</p>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map(inq => (
                <div key={inq.id} className="flex items-start justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{inq.name}</p>
                    <p className="text-xs text-gray-400">{inq.email} · {inq.city}</p>
                    {inq.robot && <p className="text-[10px] text-blue-500 mt-0.5">Robot: {inq.robot}</p>}
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0 ml-2">
                    {new Date(inq.createdAt).toLocaleDateString('en-CA')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category/availability breakdown */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">By Category</h2>
            <div className="space-y-3">
              {Object.entries(categoryCounts).map(([cat, count]) => (
                <div key={cat} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">{cat}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(count / robotCount) * 100}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 w-6 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">By Availability</h2>
            <div className="space-y-3">
              {Object.entries(availabilityCounts).map(([avail, count]) => {
                const colors: Record<string, string> = { shipping: 'bg-emerald-500', preorder: 'bg-blue-500', pilot: 'bg-amber-500', announced: 'bg-gray-400', prototype: 'bg-gray-300' };
                return (
                  <div key={avail} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">{avail}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${colors[avail] || 'bg-gray-400'}`} style={{ width: `${(count / robotCount) * 100}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 w-6 text-right">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Robot management table */}
      <div className="mt-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Robot Management</h2>
          <span className="text-xs text-gray-400">{robotCount} robots total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Robot</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Manufacturer</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Price</th>
                <th className="text-center py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Featured</th>
              </tr>
            </thead>
            <tbody>
              {robots.map(robot => {
                const statusColors: Record<string, string> = {
                  shipping: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
                  preorder: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
                  pilot: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20',
                  announced: 'text-gray-500 bg-gray-50 dark:bg-gray-900/20',
                  prototype: 'text-gray-400 bg-gray-50 dark:bg-gray-900/20',
                };
                return (
                  <tr key={robot.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="py-2.5 px-3">
                      <Link href={`/robots/${robot.id}`} className="font-medium text-gray-900 dark:text-white hover:text-blue-600 transition-colors">{robot.name}</Link>
                    </td>
                    <td className="py-2.5 px-3 text-gray-500">{robot.manufacturer}</td>
                    <td className="py-2.5 px-3 capitalize text-gray-500">{robot.category}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusColors[robot.availability] || ''}`}>
                        {robot.availability}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right text-gray-700 dark:text-gray-300 font-medium">
                      ${robot.priceMin.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {robot.featured ? <span className="text-amber-500">⭐</span> : <span className="text-gray-300">○</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'View Site', href: '/', icon: '🌐' },
          { label: 'API Health', href: '/api/health', icon: '🏥' },
          { label: 'Robots API', href: '/api/robots', icon: '📡' },
          { label: 'Sitemap', href: '/sitemap.xml', icon: '🗺️' },
        ].map(action => (
          <Link key={action.label} href={action.href} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-200 dark:hover:border-blue-800 transition-colors" target={action.href.startsWith('/api') ? '_blank' : undefined}>
            <span className="text-lg">{action.icon}</span>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mt-1">{action.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
