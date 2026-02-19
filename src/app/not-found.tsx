import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 visual */}
        <div className="relative mb-8">
          <div className="text-[120px] sm:text-[160px] font-bold text-gray-100 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-float">🤖</div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Page not found
        </h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist, has been moved, or might be hiding with the robots.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Button href="/" size="lg">Go Home</Button>
          <Button href="/robots" variant="outline" size="lg">Browse Robots</Button>
        </div>

        {/* Quick links */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-4">Popular pages</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { href: '/robots', label: 'Robot Catalog' },
              { href: '/manufacturers', label: 'Brands' },
              { href: '/compare', label: 'Compare' },
              { href: '/parts', label: 'Parts' },
              { href: '/inquiry', label: 'Contact' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
