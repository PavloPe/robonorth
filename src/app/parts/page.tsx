import type { Metadata } from 'next';
import { partCategories } from '@/data/parts';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Robot Parts & Components',
  description: 'Browse robot parts and components: actuators, sensors, controllers, power systems, structural components, grippers, and software dev kits. Shipping to Canada.',
};

export default function PartsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-3">Robot Parts & Components</h1>
        <p className="text-gray-400 text-lg max-w-3xl">
          Everything you need to build, repair, or upgrade humanoid robots. Sourced from top suppliers with Canadian shipping options.
        </p>
      </div>

      <div className="space-y-12">
        {partCategories.map(cat => (
          <section key={cat.id} id={cat.id} className="scroll-mt-20">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{cat.name}</h2>
                  <p className="text-gray-400">{cat.description}</p>
                </div>
                <span className="text-sm text-gray-500 bg-gray-800 px-3 py-1 rounded-full shrink-0">
                  {cat.itemCount} items
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.popularItems.map(item => (
                  <div key={item.name} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-white mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                    <p className="text-sm font-medium text-cyan-400">{item.priceRange}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-400 mb-4">Need help finding specific parts? We can source them for you.</p>
        <Button href="/inquiry">Contact Us About Parts</Button>
      </div>
    </div>
  );
}
