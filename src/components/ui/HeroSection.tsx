import Button from './Button';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Subtle noise texture via CSS */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      
      {/* Single subtle accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr,auto] gap-12 lg:gap-20 items-center py-20 sm:py-28 lg:py-36">
          {/* Left — text content */}
          <div className="max-w-2xl">
            {/* Marker */}
            <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
              <div className="h-px w-8 bg-blue-500" />
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-[0.2em]">
                Canada&apos;s Robot Marketplace
              </span>
            </div>

            {/* Heading — oversized, editorial */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[0.95] mb-6 animate-fade-in-up animation-delay-100">
              Humanoid robots,
              <br />
              <span className="text-slate-400">finally within reach.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-400 max-w-lg mb-10 leading-relaxed animate-fade-in-up animation-delay-200">
              Compare 22+ models from 15 manufacturers. Real specs, real prices, shipping to every province.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up animation-delay-300">
              <Button href="/robots" size="lg" className="!bg-white !text-slate-900 hover:!bg-slate-100 !font-bold !rounded-lg !shadow-none">
                Browse Robots
              </Button>
              <Button href="/inquiry" variant="outline" size="lg" className="!border-slate-700 !text-slate-300 hover:!bg-slate-800 hover:!border-slate-600 !rounded-lg">
                Get Early Access
              </Button>
            </div>
          </div>

          {/* Right — stats column */}
          <div className="hidden lg:flex flex-col gap-6 animate-fade-in-up animation-delay-400">
            {[
              { value: '22+', label: 'Robot Models' },
              { value: '15', label: 'Manufacturers' },
              { value: '$5.9K', label: 'Starting Price' },
              { value: '10/13', label: 'Provinces' },
            ].map((stat) => (
              <div key={stat.label} className="border-l-2 border-slate-800 pl-5 py-1 hover:border-blue-500 transition-colors">
                <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile stats — horizontal scroll */}
        <div className="lg:hidden flex gap-4 pb-12 animate-fade-in-up animation-delay-400 overflow-x-auto -mx-4 px-4">
          {[
            { value: '22+', label: 'Models' },
            { value: '15', label: 'Brands' },
            { value: '$5.9K', label: 'From' },
            { value: '🇨🇦', label: 'All Provinces' },
          ].map((stat) => (
            <div key={stat.label} className="border border-slate-800 rounded-lg px-5 py-3 text-center shrink-0 min-w-[100px]">
              <div className="text-lg font-bold text-white">{stat.value}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
    </section>
  );
}
