import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About RoboNorth',
  description: 'RoboNorth is Canada\'s first dedicated humanoid robot marketplace. Our mission: make humanoid robotics accessible to every Canadian.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">About RoboNorth</h1>

      <div className="prose prose-invert prose-gray max-w-none space-y-6 text-gray-400 leading-relaxed">
        <p className="text-lg text-gray-300">
          RoboNorth is Canada&apos;s first dedicated humanoid robot marketplace. We connect Canadian buyers — from individual enthusiasts to enterprise customers — with the world&apos;s leading humanoid robot manufacturers.
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Our Mission</h2>
        <p>
          The humanoid robot revolution is happening now. Tesla, Unitree, Figure AI, and dozens of other companies are building robots that will transform how we live and work. But for Canadians, finding, comparing, and purchasing these machines is fragmented and confusing.
        </p>
        <p>
          RoboNorth exists to solve that. We provide a single platform where you can browse every humanoid robot on the market, compare real specs and pricing, and connect directly with manufacturers or authorized dealers — all with a Canadian focus.
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">What We Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 not-prose">
          {[
            { title: 'Curate', desc: 'We research and catalog every humanoid robot available or upcoming, with verified specs, real pricing, and honest assessments.' },
            { title: 'Compare', desc: 'Our comparison tools let you evaluate robots side-by-side across price, capability, availability, and suitability for your needs.' },
            { title: 'Connect', desc: 'We bridge the gap between Canadian buyers and global manufacturers, handling inquiry routing and availability verification.' },
            { title: 'Educate', desc: 'Through our blog and guides, we help Canadians understand the humanoid robot landscape and make informed decisions.' },
          ].map(item => (
            <div key={item.title} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Canadian-First Approach</h2>
        <p>
          We understand the unique challenges of buying robotics in Canada — import duties, shipping logistics, provincial regulations, and currency considerations. RoboNorth is built by Canadians, for Canadians, with these realities in mind.
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Team</h2>
        <p>
          RoboNorth is run by a small team of robotics enthusiasts and technology professionals based in Alberta, Canada. We&apos;re passionate about making the humanoid robot future accessible to everyone.
        </p>
      </div>

      <div className="mt-16 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Have questions?</h2>
        <p className="text-gray-400 mb-6">We&apos;d love to hear from you. Whether you&apos;re looking for a specific robot or just exploring — reach out.</p>
        <Button href="/inquiry" size="lg">Contact Us</Button>
      </div>
    </div>
  );
}
