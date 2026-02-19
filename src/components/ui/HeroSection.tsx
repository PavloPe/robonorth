import Button from './Button';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-gradient" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-gradient" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-8">
          🇨🇦 Canada&apos;s First Humanoid Robot Marketplace
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          The Future of Robotics.
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Available in Canada.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
          Browse, compare, and pre-order humanoid robots from the world&apos;s leading manufacturers.
          From $5,900 research platforms to enterprise-grade systems — all shipping to Canada.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button href="/robots" size="lg">Browse Robots →</Button>
          <Button href="/inquiry" variant="outline" size="lg">Get Early Access</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <div className="text-2xl font-bold text-cyan-400">22+</div>
            <div className="text-sm text-gray-400">Humanoid Robots</div>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <div className="text-2xl font-bold text-cyan-400">15+</div>
            <div className="text-sm text-gray-400">Manufacturers</div>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <div className="text-2xl font-bold text-cyan-400">🇨🇦</div>
            <div className="text-sm text-gray-400">All Provinces</div>
          </div>
        </div>
      </div>
    </section>
  );
}
