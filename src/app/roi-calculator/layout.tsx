import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ROI Calculator — Humanoid Robot Return on Investment',
  description:
    'Calculate the return on investment for deploying a humanoid robot. Compare robot costs against labour expenses and see your break-even timeline in months.',
  alternates: { canonical: 'https://robonorth.ca/roi-calculator' },
};

export default function ROICalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
