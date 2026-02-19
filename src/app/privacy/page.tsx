import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'RoboNorth privacy policy. How we collect, use, and protect your personal information in accordance with Canadian privacy law (PIPEDA).',
  alternates: { canonical: 'https://robonorth.ca/privacy' },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Privacy Policy</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: July 2025</p>

      <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-300 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">1. Introduction</h2>
          <p>RoboNorth (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website robonorth.ca (the &ldquo;Site&rdquo;).</p>
          <p>We comply with the <strong>Personal Information Protection and Electronic Documents Act (PIPEDA)</strong> and applicable provincial privacy legislation, including Alberta&rsquo;s Personal Information Protection Act (PIPA).</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">2. Information We Collect</h2>
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">Personal Information You Provide</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Name, email address, phone number, and city (when you submit an inquiry)</li>
            <li>Email address (when you subscribe to our newsletter)</li>
            <li>Any additional information you include in messages to us</li>
          </ul>

          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">Information Automatically Collected</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Browser type, operating system, and device information</li>
            <li>IP address and approximate geolocation</li>
            <li>Pages visited, time spent, and referring URLs</li>
            <li>Cookies and similar tracking technologies (see Section 6)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To respond to your inquiries and connect you with robot manufacturers</li>
            <li>To send you newsletter updates you have opted into</li>
            <li>To improve our website and user experience</li>
            <li>To analyze usage patterns and website performance</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">4. Information Sharing</h2>
          <p>We do <strong>not</strong> sell your personal information. We may share information with:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Robot manufacturers:</strong> When you submit an inquiry about a specific robot, we may share your contact information with the relevant manufacturer or authorized dealer to facilitate your request.</li>
            <li><strong>Service providers:</strong> Trusted third parties who assist with analytics, email delivery, and website hosting.</li>
            <li><strong>Legal requirements:</strong> When required by law, court order, or to protect our rights.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">5. Data Retention</h2>
          <p>We retain your personal information only as long as necessary to fulfill the purposes for which it was collected, or as required by law. Inquiry data is retained for up to 24 months. Newsletter subscriptions remain active until you unsubscribe.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">6. Cookies</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Remember your preferences (e.g., dark mode, cookie consent)</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Provide a personalized browsing experience</li>
          </ul>
          <p>You can control cookie preferences through your browser settings or our cookie consent banner. Declining cookies may limit some site functionality.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">7. Your Rights Under PIPEDA</h2>
          <p>As a Canadian resident, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access your personal information held by us</li>
            <li>Request correction of inaccurate information</li>
            <li>Withdraw consent for data processing</li>
            <li>Request deletion of your personal information</li>
            <li>File a complaint with the Office of the Privacy Commissioner of Canada</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">8. Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information, including encryption of data in transit (TLS/SSL), secure storage, and access controls. However, no method of electronic transmission or storage is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">9. Children&rsquo;s Privacy</h2>
          <p>Our Site is not directed at individuals under 16. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">10. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. We encourage you to review this policy periodically.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">11. Contact Us</h2>
          <p>If you have questions about this Privacy Policy or wish to exercise your privacy rights:</p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mt-3">
            <p className="font-semibold text-gray-900 dark:text-white">RoboNorth Privacy Officer</p>
            <p>Email: privacy@robonorth.ca</p>
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
