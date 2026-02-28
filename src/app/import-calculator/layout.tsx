import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Import Cost Calculator by Country — Robot Shipping to Canada',
  description:
    'Estimate robot import costs from 10+ countries to Canada. See duty rates under CUSMA, CETA, CPTPP, and MFN, plus GST and shipping estimates.',
  alternates: { canonical: 'https://robonorth.ca/import-calculator' },
};

export default function ImportCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
