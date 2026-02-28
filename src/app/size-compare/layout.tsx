import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visual Size Comparison — Humanoid Robots vs Humans',
  description:
    'See how humanoid robots compare in size to a 5\'10" human. Visual height chart for 32+ models — from compact research bots to full-size industrial humanoids.',
  alternates: { canonical: 'https://robonorth.ca/size-compare' },
};

export default function SizeCompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
