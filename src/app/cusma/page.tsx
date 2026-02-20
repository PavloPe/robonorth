import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'CUSMA Trade Benefits for Robots — Duty-Free Imports to Canada',
  description: 'How CUSMA (USMCA) reduces or eliminates customs duties on US-made humanoid robots imported to Canada. Save thousands on duties.',
  alternates: { canonical: 'https://robonorth.ca/cusma' },
};

export default function CusmaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">CUSMA Trade Benefits</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">🇨🇦 🇺🇸 🇲🇽 Trade Agreement</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">CUSMA: Duty-Free Robot Imports</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">The Canada-United States-Mexico Agreement (CUSMA/USMCA) can eliminate or significantly reduce customs duties on robots imported from the US and Mexico.</p>
      </div>

      {/* Key benefit */}
      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 mb-10 text-center">
        <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">Save up to $15,000+</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">on duties per robot imported from the United States under CUSMA</p>
      </div>

      <div className="space-y-8">
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🤖 How CUSMA Applies to Robots</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Under CUSMA, qualifying robots manufactured in the United States receive preferential tariff treatment when imported to Canada:</p>
          <div className="space-y-3">
            {[
              { hs: 'HS 8479.50', desc: 'Industrial robots for handling/assembly', duty: '0% under CUSMA (normally 6%)' },
              { hs: 'HS 8428.90', desc: 'Other handling equipment (humanoid robots)', duty: '0% under CUSMA (normally 6%)' },
              { hs: 'HS 8471.49', desc: 'Computing/AI components', duty: '0% under CUSMA' },
              { hs: 'HS 9503.00', desc: 'Consumer/companion robots', duty: '0% under CUSMA (normally 8%)' },
            ].map(item => (
              <div key={item.hs} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                <span className="text-xs font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded whitespace-nowrap">{item.hs}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.desc}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{item.duty}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📋 Qualifying Conditions</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">To qualify for CUSMA duty-free treatment, robots must:</p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span><strong>Rules of Origin:</strong> Be substantially manufactured in the US, Canada, or Mexico</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span><strong>Certificate of Origin:</strong> Exporter must provide a CUSMA Certificate of Origin</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span><strong>Direct Shipment:</strong> Robot must be shipped directly (no transshipment through non-CUSMA countries)</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span><strong>Regional Value Content:</strong> Meet minimum regional value content threshold (typically 55-75%)</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🏭 US-Made Robots That Qualify</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Many popular humanoid robots are manufactured in the US and likely qualify for CUSMA benefits:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { maker: 'Tesla', robot: 'Optimus', location: 'Texas, USA' },
              { maker: 'Figure AI', robot: 'Figure 02', location: 'California, USA' },
              { maker: 'Boston Dynamics', robot: 'Atlas', location: 'Massachusetts, USA' },
              { maker: 'Agility Robotics', robot: 'Digit', location: 'Oregon, USA' },
              { maker: 'Apptronik', robot: 'Apollo', location: 'Texas, USA' },
              { maker: '1X Technologies', robot: 'NEO', location: 'Assembly in USA' },
            ].map(r => (
              <div key={r.robot} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{r.maker} {r.robot}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">📍 {r.location}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">💡 RoboNorth Handles CUSMA Paperwork</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">When you order through RoboNorth, we:</p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span>Verify CUSMA eligibility for each robot</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span>Obtain the Certificate of Origin from the manufacturer</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span>Handle customs clearance through our licensed broker</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span>Ensure correct HS code classification for maximum duty savings</li>
          </ul>
        </section>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Questions about CUSMA and robot imports?</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Our import specialists can help you understand the duty savings for your specific order.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/contact" size="sm">Contact Our Trade Team</Button>
            <a href="tel:+15873250017" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              📞 (587) 325-0017
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
