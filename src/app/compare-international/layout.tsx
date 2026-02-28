import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Canada vs International Robot Pricing — Side-by-Side Comparison',
  description:
    'Compare humanoid robot prices in Canada, the US, and Europe. See duty-inclusive landed costs, shipping differences, and trade-agreement savings for 15+ models.',
  alternates: { canonical: 'https://robonorth.ca/compare-international' },
};

export default function CompareInternationalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
