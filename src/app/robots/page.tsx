import type { Metadata } from 'next';
import { robots } from '@/data/robots';
import RobotCatalog from '@/components/ui/RobotCatalog';

export const metadata: Metadata = {
  title: 'Humanoid Robot Catalog',
  description: 'Browse all humanoid robots available for purchase, pre-order, or coming soon. Compare specs, prices, and availability across 22+ models from top manufacturers.',
};

export default function RobotsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-3">Humanoid Robot Catalog</h1>
        <p className="text-gray-400 text-lg">
          Every humanoid robot you can buy, pre-order, or watch in 2026. Real specs, real prices.
        </p>
      </div>
      <RobotCatalog robots={robots} />
    </div>
  );
}
