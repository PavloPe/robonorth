import Button from './Button';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 font-medium mb-6 shadow-sm">
          🇨🇦 Canada&apos;s First Humanoid Robot Store
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
          Shop Humanoid Robots
          <br />
          <span className="text-blue-600">Delivered to Canada</span>
        </h1>

        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
          Browse, compare, and pre-order from 22+ humanoid robots. Real prices, real specs — from $5,900 research bots to enterprise systems. All shipping to Canada.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Button href="/robots" size="lg">Shop Robots →</Button>
          <Button href="/inquiry" variant="outline" size="lg">Get Early Access</Button>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">22+</div>
            <div className="text-xs text-gray-500 mt-0.5">Robot Models</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">15+</div>
            <div className="text-xs text-gray-500 mt-0.5">Top Brands</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">🇨🇦</div>
            <div className="text-xs text-gray-500 mt-0.5">All Provinces</div>
          </div>
        </div>
      </div>
    </section>
  );
}
