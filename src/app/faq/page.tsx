import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions About Buying Robots in Canada',
  description: 'Answers to 20+ common questions about buying, importing, and operating humanoid robots in Canada. Shipping, customs, warranties, and more.',
  alternates: { canonical: 'https://robonorth.ca/faq' },
};

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // Buying
  { category: 'Buying', question: 'Can I buy a humanoid robot in Canada?', answer: 'Yes! Several humanoid robots are available for purchase or pre-order and can be shipped to Canada. Models like the Unitree G1 ship directly from manufacturers, while others like Tesla Optimus are in pre-order stages. RoboNorth helps Canadian buyers navigate the process.' },
  { category: 'Buying', question: 'What is the cheapest humanoid robot available?', answer: 'The most affordable humanoid robot is the Unitree G1 EDU at approximately $16,000 USD (~$23,000 CAD before import fees). For quadruped robots, the Unitree Go2 starts around $5,900 USD. See our full catalog for all pricing.' },
  { category: 'Buying', question: 'Do I need a business to buy a humanoid robot?', answer: 'No. Individuals can purchase humanoid robots for personal, educational, or research use. However, some enterprise-grade robots (like Figure 02 and Sanctuary AI Phoenix) are only available through commercial pilot programs.' },
  { category: 'Buying', question: 'Can I finance a robot purchase?', answer: 'Direct financing from manufacturers is rare. However, Canadian business buyers can use equipment financing through banks or BDC (Business Development Bank of Canada). SR&ED tax credits may also offset costs for R&D use cases.' },
  { category: 'Buying', question: 'Does RoboNorth sell robots directly?', answer: 'RoboNorth is a marketplace and information platform. We connect Canadian buyers with manufacturers, provide pricing guidance, and help navigate import logistics. We do not hold inventory or sell robots directly — yet.' },
  // Shipping
  { category: 'Shipping', question: 'How long does shipping take to Canada?', answer: 'Shipping times vary by origin: China (Unitree, UBTECH) takes 3-5 weeks by ocean freight; USA (Tesla, Figure) takes 1-2 weeks by ground; Europe (1X Technologies) takes 2-4 weeks. Air freight is faster but costs 2-3x more.' },
  { category: 'Shipping', question: 'Which provinces can robots ship to?', answer: 'Robots can ship to all Canadian provinces and territories. Major ports of entry include Vancouver (fastest for Asian manufacturers), Toronto/Montreal (for European/US shipments), and Halifax. Remote northern locations may require additional logistics.' },
  { category: 'Shipping', question: 'How much does shipping cost?', answer: 'International shipping ranges from $500-5,000 CAD depending on origin, shipping method, and robot size. Ocean freight from China: $1,500-3,000. Air freight: $3,000-8,000. Ground from USA: $500-2,000.' },
  // Customs & Duties
  { category: 'Customs & Duties', question: 'What are the import duties on robots?', answer: 'Import duties range from 0-8% depending on the HS (Harmonized System) classification. Industrial robots often qualify for 0% duty. Consumer-classified robots may face up to 8%. Plus 5% GST and provincial sales tax. We recommend using a customs broker.' },
  { category: 'Customs & Duties', question: 'Do US-made robots qualify for duty-free import under USMCA?', answer: 'Yes, robots manufactured in the US may qualify for 0% duty under USMCA (United States-Mexico-Canada Agreement), provided they meet Rules of Origin requirements. This applies to Tesla Optimus, Figure 02, and Agility Digit. A Certificate of Origin is required.' },
  { category: 'Customs & Duties', question: 'Do I need a customs broker?', answer: 'Strongly recommended for any robot over $2,500 CAD. A licensed customs broker handles CBSA documentation, ensures correct HS classification, manages duty payments, and deals with any inspections. Cost: $150-500 per shipment — well worth it.' },
  { category: 'Customs & Duties', question: 'What is the total landed cost in Canada?', answer: 'A good rule of thumb: add 30-45% to the USD purchase price for total Canadian landed cost. This includes exchange rate, shipping, customs duty, GST/PST, brokerage, and insurance. Use our price calculator for specific estimates.' },
  // Warranties & Support
  { category: 'Warranty & Support', question: 'What warranty comes with a humanoid robot?', answer: 'Warranties vary by manufacturer. Most offer 1-year limited warranty covering manufacturing defects. Unitree offers 1 year, Tesla is expected to offer standard vehicle-style warranty. Extended warranties are available for enterprise models at 5-15% of purchase price annually.' },
  { category: 'Warranty & Support', question: 'Is there robot repair service in Canada?', answer: 'Currently limited. Sanctuary AI (Vancouver) offers domestic support. For other manufacturers, repairs typically involve shipping components back or remote diagnostics. As the market grows, Canadian service centres will emerge. Some universities and makerspaces offer informal repair help.' },
  { category: 'Warranty & Support', question: 'What if my robot breaks down?', answer: 'Most issues can be diagnosed remotely by the manufacturer. Common fixes include software updates, actuator replacement (DIY-friendly on some models), and calibration. For major repairs, you may need to ship the robot or affected component to the manufacturer.' },
  // Safety & Regulations
  { category: 'Safety & Regulations', question: 'Are humanoid robots safe to use at home?', answer: 'Home-focused models like 1X NEO are designed with safety as a priority — lightweight (30 kg), force-limited joints, and soft materials. However, home robot safety standards are still being developed. Supervision is recommended, especially around children and pets.' },
  { category: 'Safety & Regulations', question: 'What safety certifications do I need for workplace use?', answer: 'Workplace deployment requires compliance with CSA Z434 (Industrial Robot Safety) and provincial OHS regulations. You need a risk assessment, emergency stop systems, worker training, and documentation. Consult your provincial workplace safety authority.' },
  { category: 'Safety & Regulations', question: 'Do robots need ISED certification in Canada?', answer: 'Yes. Any device with wireless capabilities (WiFi, Bluetooth, LTE) must have ISED certification to be legally imported and operated in Canada. Most major manufacturers have or are pursuing this certification. Check before purchasing.' },
  // Technical
  { category: 'Technical', question: 'How long do robot batteries last?', answer: 'Most humanoid robots have 2-5 hour battery life depending on activity level. Unitree G1: ~2 hours. Tesla Optimus: ~5+ hours. Charging takes 1-3 hours. Battery capacity degrades over time — expect 80% capacity after ~500 charge cycles (roughly 2 years of daily use).' },
  { category: 'Technical', question: 'Can humanoid robots work in Canadian winters?', answer: 'Most humanoid robots are rated for 0-40°C and should be used indoors only during Canadian winters. Cold temperatures dramatically reduce battery life and can damage actuators and electronics. Some manufacturers are developing cold-weather variants for 2027.' },
  { category: 'Technical', question: 'Do I need programming skills to operate a robot?', answer: 'For basic operation, no — most robots come with apps or voice interfaces. For customization, basic Python knowledge is helpful. For advanced use (custom behaviours, integration), programming skills in Python/C++ and familiarity with ROS 2 are valuable.' },
  { category: 'Technical', question: 'Can robots understand French?', answer: 'Most robots use AI language models that support French. However, manufacturer interfaces and documentation are primarily in English. For Quebec deployments, verify French language support with the manufacturer before purchasing.' },
  // Business
  { category: 'Business', question: 'Can I claim SR&ED credits for a robot purchase?', answer: 'If you use the robot for systematic investigation or research to advance technology, the costs may qualify for SR&ED tax credits (35% refundable for CCPCs, 15% for others). The robot itself, plus integration and testing work, could qualify. Consult an SR&ED specialist.' },
  { category: 'Business', question: 'Is Robot-as-a-Service (RaaS) available in Canada?', answer: 'Yes, some manufacturers offer RaaS models: Sanctuary AI (monthly lease), Agility Robotics (enterprise rental). Monthly costs range from $5,000-15,000 depending on the model. RaaS includes maintenance, updates, and sometimes support — ideal for pilot programs.' },
];

const categories = [...new Set(faqs.map(f => f.category))];

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 font-medium">FAQ</span>
      </nav>

      <div className="mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">FAQ</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-500 max-w-2xl">
          Everything you need to know about buying, importing, and operating humanoid robots in Canada.
        </p>
      </div>

      {/* Quick nav */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(cat => (
          <a
            key={cat}
            href={`#${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            className="px-3 py-1.5 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-600 text-sm font-medium rounded-lg transition-colors"
          >
            {cat}
          </a>
        ))}
      </div>

      {/* FAQ sections */}
      {categories.map(category => (
        <section key={category} id={category.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            {category}
          </h2>
          <div className="space-y-6">
            {faqs.filter(f => f.category === category).map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-200 transition-colors">
                <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-start gap-3">
                  <span className="text-blue-600 shrink-0 mt-0.5">Q:</span>
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed ml-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center mt-16">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h2>
        <p className="text-gray-600 text-sm mb-6">Our team is happy to help with any robotics questions.</p>
        <div className="flex gap-3 justify-center">
          <Button href="/inquiry" size="sm">Contact Us</Button>
          <Button href="/robots" variant="outline" size="sm">Browse Robots</Button>
        </div>
      </div>
    </div>
  );
}
