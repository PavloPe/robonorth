import Link from 'next/link';

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'All Robots', href: '/robots' },
      { label: 'Brands', href: '/manufacturers' },
      { label: 'Parts & Components', href: '/parts' },
      { label: 'Compare', href: '/compare' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/inquiry' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Buying Guide', href: '/blog' },
      { label: 'Pricing Guide', href: '/blog' },
      { label: 'FAQ', href: '/about' },
      { label: 'Shipping Info', href: '/about' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {columns.map(col => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Newsletter</h4>
            <p className="text-sm text-gray-500 mb-3">Get robot news & early access offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">R</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">RoboNorth</span>
            <span className="text-xs text-gray-400">— Canada&apos;s Humanoid Robot Marketplace</span>
          </div>
          <p className="text-xs text-gray-400">© 2026 RoboNorth. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
