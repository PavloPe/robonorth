import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Build Your Fleet — Enterprise Robot Fleet Planner',
  description:
    'Plan and price a multi-robot fleet for your enterprise. Mix humanoid models, estimate total cost, and generate a quote request — all in one tool.',
  alternates: { canonical: 'https://robonorth.ca/fleet-builder' },
};

export default function FleetBuilderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
