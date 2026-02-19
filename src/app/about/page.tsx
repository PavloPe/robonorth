import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About RoboNorth — Canada\'s Robot Marketplace',
  description: 'RoboNorth is Canada\'s first dedicated humanoid robot marketplace. Based in Alberta, we connect Canadian buyers with the world\'s leading robot manufacturers.',
  openGraph: {
    title: 'About RoboNorth',
    description: 'Canada\'s first humanoid robot marketplace. Making humanoid robotics accessible to every Canadian.',
    url: 'https://robonorth.ca/about',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'About RoboNorth' }],
  },
  alternates: {
    canonical: 'https://robonorth.ca/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About RoboNorth</h1>

      <div className="space-y-5 text-gray-600 text-sm leading-relaxed">
        <p className="text-base text-gray-800">
          RoboNorth is Canada&apos;s first dedicated humanoid robot marketplace. We connect Canadian buyers — from enthusiasts to enterprises — with the world&apos;s leading robot manufacturers.
        </p>

        <h2 className="text-xl font-bold text-gray-900 pt-4">Our Mission</h2>
        <p>
          The humanoid robot revolution is here. Tesla, Unitree, Figure AI, and dozens of companies are building robots that will transform how we live and work. But for Canadians, finding and purchasing these machines is fragmented and confusing.
        </p>
        <p>
          RoboNorth provides a single platform to browse every humanoid robot on the market, compare real specs and pricing, and connect with manufacturers — all with a Canadian focus.
        </p>

        <h2 className="text-xl font-bold text-gray-900 pt-4">What We Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: 'Curate', desc: 'We catalog every humanoid robot with verified specs, real pricing, and honest assessments.' },
            { title: 'Compare', desc: 'Evaluate robots side-by-side across price, capability, and availability.' },
            { title: 'Connect', desc: 'We bridge Canadian buyers with global manufacturers and authorized dealers.' },
            { title: 'Educate', desc: 'Guides and blog content to help you make informed purchasing decisions.' },
          ].map(item => (
            <div key={item.title} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-900 pt-4">Canadian-First</h2>
        <p>
          We understand the unique challenges of buying robotics in Canada — import duties, shipping logistics, provincial regulations, and currency. RoboNorth is built by Canadians, for Canadians.
        </p>

        <h2 className="text-xl font-bold text-gray-900 pt-4">The Team</h2>
        <p>
          We&apos;re a small team of robotics enthusiasts and tech professionals based in Alberta, Canada. Passionate about making the humanoid robot future accessible to everyone.
        </p>
      </div>

      <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Have questions?</h2>
        <p className="text-gray-500 text-sm mb-4">Whether you&apos;re looking for a specific robot or just exploring — reach out.</p>
        <Button href="/inquiry">Contact Us</Button>
      </div>
    </div>
  );
}
