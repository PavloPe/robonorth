import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Robot Quiz — Which Humanoid Robot Is Right for You?',
  description:
    'Answer a few quick questions about your use case, budget, and environment to discover which humanoid robot is the best fit. Takes under 2 minutes.',
  alternates: { canonical: 'https://robonorth.ca/quiz' },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
