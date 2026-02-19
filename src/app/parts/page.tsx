import type { Metadata } from 'next';
import { partCategories } from '@/data/parts';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Robot Parts & Components',
  description: 'Browse robot parts and components: actuators, sensors, controllers, power systems, structural components, grippers, and software dev kits. Shipping to Canada.',
};

export default function PartsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Robot Parts & Components</h1>
        <p className="text-gray-500 max-w-2xl">
          Everything you need to build, repair, or upgrade humanoid robots. Sourced from top suppliers with Canadian shipping.
        </p>
      </div>

      <div className="space-y-8">
        {partCategories.map(cat => (
          <section key={cat.id} id={cat.id} className="scroll-mt-20">
            <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">{cat.name}</h2>
                  <p className="text-sm text-gray-500">{cat.description}</p>
                </div>
                <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100 shrink-0">
                  {cat.itemCount} items
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.popularItems.map(item => (
                  <div key={item.name} className="bg-gray-50 border border-gray-100 rounded-lg p-3.5">
                    <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{item.name}</h3>
                    <p className="text-xs text-gray-400 mb-1.5">{item.description}</p>
                    <p className="text-sm font-semibold text-blue-600">{item.priceRange}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-500 text-sm mb-3">Need help finding specific parts? We can source them for you.</p>
        <Button href="/inquiry">Contact Us About Parts</Button>
      </div>
    </div>
  );
}
