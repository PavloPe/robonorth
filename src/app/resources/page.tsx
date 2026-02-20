import type { Metadata } from 'next';
import Link from 'next/link';

// Improvement #24: Resources/downloads page

export const metadata: Metadata = {
  title: 'Resources & Downloads — Whitepapers, Datasheets & Guides',
  description: 'Download free robotics resources: whitepapers, comparison datasheets, buying guides, and industry reports for Canadian robot buyers.',
  alternates: { canonical: 'https://robonorth.ca/resources' },
};

const resources = [
  { category: 'Whitepapers', items: [
    { title: 'The State of Humanoid Robotics in Canada 2026', type: 'PDF', pages: '28 pages', desc: 'Comprehensive analysis of the Canadian humanoid robotics market, key players, and adoption trends.' },
    { title: 'ROI Analysis Framework for Robot Adoption', type: 'PDF', pages: '15 pages', desc: 'Step-by-step guide to calculating the return on investment for humanoid robot deployments.' },
    { title: 'Cold Weather Robotics: Canadian Challenges', type: 'PDF', pages: '12 pages', desc: 'Technical analysis of cold-weather operation challenges and emerging solutions for Canadian deployments.' },
  ]},
  { category: 'Datasheets', items: [
    { title: 'Robot Comparison Matrix — All 32 Models', type: 'PDF', pages: '4 pages', desc: 'Side-by-side comparison of every robot in our catalog with key specs, pricing, and availability.' },
    { title: 'Canadian Import Guide for Robots', type: 'PDF', pages: '8 pages', desc: 'HS codes, duty rates, customs procedures, and regulatory requirements for importing robots to Canada.' },
    { title: 'Safety Certification Quick Reference', type: 'PDF', pages: '6 pages', desc: 'Summary of CSA, ISO, UL, and CE certifications relevant to humanoid robot deployment in Canada.' },
  ]},
  { category: 'Guides', items: [
    { title: 'First-Time Robot Buyer\'s Checklist', type: 'PDF', pages: '10 pages', desc: 'Everything you need to consider before purchasing your first humanoid robot for business use.' },
    { title: 'Robot Maintenance Schedule Template', type: 'Excel', pages: 'Template', desc: 'Customizable maintenance tracking template for daily, weekly, monthly, and annual robot care.' },
    { title: 'Government Grants Application Guide', type: 'PDF', pages: '14 pages', desc: 'How to apply for SR&ED, IRAP, and provincial grants for robotics projects in Canada.' },
  ]},
  { category: 'Industry Reports', items: [
    { title: 'Canadian Manufacturing Automation Survey 2026', type: 'PDF', pages: '20 pages', desc: 'Survey results from 500+ Canadian manufacturers on automation adoption, barriers, and plans.' },
    { title: 'Global Humanoid Robot Market Forecast', type: 'PDF', pages: '16 pages', desc: 'Market size projections, key players, and technology trends through 2030.' },
  ]},
];

export default function ResourcesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Resources</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">📚 Library</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Resources & Downloads</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Free whitepapers, datasheets, guides, and industry reports for Canadian robot buyers and researchers.</p>
      </div>

      <div className="space-y-12">
        {resources.map(section => (
          <section key={section.category}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{section.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map(item => (
                <div key={item.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-blue-200 dark:hover:border-blue-800 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">{item.type}</span>
                    <span className="text-[10px] text-gray-400">{item.pages}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{item.desc}</p>
                  <button className="text-xs text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5m0 0l5-5m-5 5V3" /></svg>
                    Download
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Need a Custom Report?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">We offer custom research and consulting for organizations evaluating robotics adoption.</p>
        <Link href="/inquiry?type=research" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
          Request Custom Research →
        </Link>
      </div>
    </div>
  );
}
