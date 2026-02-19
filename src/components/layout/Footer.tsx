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
    <footer className="bg-slate-900 text-slate-300 mt-16">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Stay Updated</h4>
            <p className="text-sm text-slate-400 mb-4">Get robot news & early access offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm shadow-blue-600/20">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">R</span>
            </div>
            <span className="text-sm font-semibold text-white">RoboNorth</span>
            <span className="text-xs text-slate-500">— Canada&apos;s Humanoid Robot Marketplace</span>
          </div>
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} RoboNorth. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
