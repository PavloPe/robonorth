import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Request a Humanoid Robot Demo — In-Person or Virtual | RoboNorth',
  description: 'Schedule a humanoid robot demonstration for your enterprise. In-person demos in major Canadian cities or virtual sessions. See robots in action before you buy.',
  keywords: ['robot demo', 'humanoid robot demonstration', 'robot demo Canada', 'see robots in person'],
  openGraph: {
    title: 'Request a Humanoid Robot Demo — In-Person or Virtual',
    description: 'Schedule a demo to see humanoid robots in action. Available across Canada.',
    url: 'https://robonorth.ca/demo',
  },
  alternates: { canonical: 'https://robonorth.ca/demo' },
};

export default function DemoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Request a Demo</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Request a Demo</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            See humanoid robots in action before you invest. We offer in-person demonstrations in major Canadian cities and virtual sessions for remote teams.
          </p>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">🏢 In-Person Demo</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Available in Toronto, Vancouver, Montreal, and Calgary. Our team brings select robot models to your facility or a nearby demo centre.</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>✓ Hands-on interaction with actual robots</li>
                <li>✓ Test with your specific use cases</li>
                <li>✓ Meet with a robotics advisor</li>
                <li>✓ No obligation — completely free</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">💻 Virtual Demo</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">45-minute video session with live robot operation, Q&A with our team, and personalised recommendations.</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>✓ Available anywhere in Canada</li>
                <li>✓ Live robot feed — not recorded</li>
                <li>✓ Customised to your industry</li>
                <li>✓ Record the session for your team</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Enterprise teams:</strong> We can arrange multi-day evaluations with loaner robots for qualified enterprise customers. <Link href="/inquiry" className="text-blue-600 dark:text-blue-400 font-semibold">Contact us</Link> to discuss.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 lg:p-8 h-fit">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Schedule Your Demo</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name *</label>
                <input type="text" required className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name *</label>
                <input type="text" required className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company *</label>
              <input type="text" required className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
              <input type="email" required className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Industry</label>
              <select className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">Select industry...</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="logistics">Warehouse & Logistics</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education & Research</option>
                <option value="agriculture">Agriculture</option>
                <option value="hospitality">Hospitality</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Robots Interested In</label>
              <input type="text" placeholder="e.g., Unitree G1, Sanctuary AI Phoenix" className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Demo Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <input type="radio" name="demoType" value="in-person" className="text-blue-600" /> In-Person
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <input type="radio" name="demoType" value="virtual" className="text-blue-600" /> Virtual
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <input type="radio" name="demoType" value="either" className="text-blue-600" defaultChecked /> Either
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Notes</label>
              <textarea rows={3} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none" placeholder="Tell us about your use case, timeline, or specific questions..." />
            </div>
            <Button href="/inquiry?type=demo" size="lg" className="w-full">Submit Demo Request</Button>
            <p className="text-xs text-gray-400 text-center">We&apos;ll respond within 1 business day</p>
          </form>
        </div>
      </div>
    </div>
  );
}
