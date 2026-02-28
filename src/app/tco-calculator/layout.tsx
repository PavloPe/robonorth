import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Total Cost of Ownership Calculator — Humanoid Robots',
  description:
    'Calculate the true 5-year cost of owning a humanoid robot in Canada. Includes purchase price, maintenance, energy, insurance, import duties, and software licences.',
  alternates: { canonical: 'https://robonorth.ca/tco-calculator' },
};

export default function TCOCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
