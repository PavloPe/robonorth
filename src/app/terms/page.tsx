import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'RoboNorth terms of service. Terms and conditions for using Canada\'s humanoid robot marketplace.',
  alternates: { canonical: 'https://robonorth.ca/terms' },
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Terms of Service</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: July 2025</p>

      <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-300 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using the RoboNorth website at robonorth.ca (the &ldquo;Site&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please do not use the Site.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">2. About RoboNorth</h2>
          <p>RoboNorth is an information and marketplace platform that helps Canadians discover, compare, and connect with humanoid robot manufacturers and authorized dealers. RoboNorth is based in Alberta, Canada and operates under Canadian law.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">3. Use of the Site</h2>
          <p>You may use the Site for lawful purposes only. You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use the Site in any way that violates applicable Canadian or international laws</li>
            <li>Attempt to interfere with the proper functioning of the Site</li>
            <li>Use automated systems (bots, scrapers) to access the Site without permission</li>
            <li>Submit false or misleading information through inquiry forms</li>
            <li>Impersonate any person or entity</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">4. Product Information & Pricing</h2>
          <p>RoboNorth provides product information for informational purposes. While we strive for accuracy:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Prices listed are approximate and sourced from manufacturers; actual prices may vary</li>
            <li>Specifications are based on manufacturer-published data and may change</li>
            <li>Availability status is our best estimate and subject to change</li>
            <li>RoboNorth does not directly sell robots — we connect buyers with manufacturers and dealers</li>
          </ul>
          <p className="mt-2"><strong>RoboNorth makes no warranties regarding the accuracy, completeness, or timeliness of product information.</strong></p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">5. Inquiries & Communication</h2>
          <p>When you submit an inquiry through the Site:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your information may be shared with relevant manufacturers or dealers (per our <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>)</li>
            <li>Submitting an inquiry does not constitute a purchase agreement or binding commitment</li>
            <li>Response times depend on manufacturer availability and are not guaranteed by RoboNorth</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">6. Intellectual Property</h2>
          <p>All content on the Site — including text, graphics, logos, icons, and software — is the property of RoboNorth or its content suppliers and is protected by Canadian and international intellectual property laws. Robot names, logos, and images are trademarks of their respective manufacturers.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">7. Third-Party Links</h2>
          <p>The Site may contain links to third-party websites, including manufacturer websites. RoboNorth is not responsible for the content, accuracy, or practices of these external sites.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">8. Limitation of Liability</h2>
          <p>To the fullest extent permitted by Canadian law:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>RoboNorth provides the Site &ldquo;as is&rdquo; without warranties of any kind</li>
            <li>RoboNorth is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the Site</li>
            <li>RoboNorth is not responsible for any transactions between you and third-party manufacturers or dealers</li>
            <li>Our total liability shall not exceed $100 CAD</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">9. Indemnification</h2>
          <p>You agree to indemnify and hold RoboNorth harmless from any claims, damages, or expenses arising from your use of the Site or violation of these Terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">10. Governing Law</h2>
          <p>These Terms are governed by and construed in accordance with the laws of the Province of Alberta and the federal laws of Canada applicable therein. Any disputes shall be resolved in the courts of Alberta, Canada.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">11. Modifications</h2>
          <p>RoboNorth reserves the right to modify these Terms at any time. Changes take effect immediately upon posting. Continued use of the Site constitutes acceptance of updated Terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">12. Contact</h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mt-3">
            <p className="font-semibold text-gray-900 dark:text-white">RoboNorth Legal</p>
            <p>Email: legal@robonorth.ca</p>
            <p>Location: Alberta, Canada</p>
            <p className="mt-2">
              <Link href="/inquiry" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Form →</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
