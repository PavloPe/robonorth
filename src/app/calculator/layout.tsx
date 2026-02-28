import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Robot Import Cost Calculator — Duties, GST & Provincial Tax',
  description:
    'Estimate the landed cost of importing a humanoid robot to any Canadian province. Covers customs duty, GST, PST/HST, and currency conversion from USD to CAD.',
  alternates: { canonical: 'https://robonorth.ca/calculator' },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
