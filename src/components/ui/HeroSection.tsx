import Button from './Button';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-3xl animate-pulse-glow animation-delay-200" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-blue-200 font-medium mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            🇨🇦 Canada&apos;s First Humanoid Robot Marketplace
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up animation-delay-100">
            The Future of Robotics,
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Delivered to Canada
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed animate-fade-in-up animation-delay-200">
            Browse, compare, and pre-order from 22+ humanoid robots. Real prices, real specs — from $5,900 research bots to enterprise systems.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-16 animate-fade-in-up animation-delay-300">
            <Button href="/robots" size="lg" className="!bg-white !text-slate-900 hover:!bg-slate-100 !font-bold !shadow-lg !shadow-white/10">
              Browse Robots →
            </Button>
            <Button href="/inquiry" variant="outline" size="lg" className="!border-white/30 !text-white hover:!bg-white/10">
              Get Early Access
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl animate-fade-in-up animation-delay-400">
          {[
            { value: '22+', label: 'Robot Models', icon: '🤖' },
            { value: '15+', label: 'Top Brands', icon: '🏭' },
            { value: '$5.9K', label: 'Starting From', icon: '💰' },
            { value: '🇨🇦', label: 'All Provinces', icon: '' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
              <div className="text-2xl font-bold text-white">{stat.icon || stat.value}</div>
              {stat.icon && <div className="text-xl font-bold text-white mt-0.5">{stat.value}</div>}
              <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
