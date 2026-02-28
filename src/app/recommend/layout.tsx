import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Robot Recommendation Engine — Find Your Ideal Humanoid',
  description:
    'Get personalised humanoid robot recommendations based on your industry, budget, and use case. Filter 32+ models to find the perfect match for your needs.',
  alternates: { canonical: 'https://robonorth.ca/recommend' },
};

export default function RecommendLayout({ children }: { children: React.ReactNode }) {
  return children;
}
