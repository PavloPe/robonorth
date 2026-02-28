import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare Humanoid Robots Side by Side',
  description:
    'Compare specs, prices, and features of humanoid robots side by side. Find the perfect robot for your needs at RoboNorth.',
  alternates: { canonical: 'https://robonorth.ca/compare' },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
