import Link from 'next/link';

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/inquiry' },
    ],
  },
  {
    title: 'Catalog',
    links: [
      { label: 'All Robots', href: '/robots' },
      { label: 'Manufacturers', href: '/manufacturers' },
      { label: 'Parts & Components', href: '/parts' },
      { label: 'Compare', href: '/compare' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Pricing Guide', href: '/blog' },
      { label: 'Buying Guide', href: '/blog' },
      { label: 'FAQ', href: '/about' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map(col => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Stay Updated</h4>
            <p className="text-sm text-gray-500 mb-3">Get robot news and early access offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
              <button className="px-3 py-2 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold text-sm rounded-lg transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🤖</span>
            <span className="text-sm font-bold text-white">RoboNorth</span>
            <span className="text-xs text-gray-600">— Canada&apos;s #1 Humanoid Robot Marketplace</span>
          </div>
          <p className="text-xs text-gray-600">© 2026 RoboNorth. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
