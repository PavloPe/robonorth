import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Canadian Robotics Companies — Directory of 25+ Companies | RoboNorth',
  description: 'Comprehensive directory of Canadian robotics companies — from humanoid robot makers to AI labs, cobot manufacturers, and drone companies. Sanctuary AI, Kinova, Clearpath, MDA, and 20+ more.',
  keywords: ['Canadian robotics companies', 'robotics companies Canada', 'Sanctuary AI', 'Kinova', 'Clearpath Robotics', 'Canadian robots'],
  openGraph: {
    title: 'Canadian Robotics Companies — Directory of 25+ Companies',
    description: 'The definitive directory of Canadian robotics companies. From humanoid robots to drones, cobots, and space robotics.',
    url: 'https://robonorth.ca/canadian-robotics',
    type: 'website',
  },
  alternates: { canonical: 'https://robonorth.ca/canadian-robotics' },
};

const companies = [
  { name: 'Sanctuary AI', city: 'Vancouver, BC', focus: 'Humanoid Robots', description: 'Canada\'s leading humanoid robotics company. Builds the Phoenix general-purpose humanoid powered by the Carbon AI cognitive architecture. Partnered with Magna International for automotive deployment.', website: 'sanctuary.ai', founded: '2018', employees: '200+', funding: '$100M+', highlight: true },
  { name: 'Kinova Robotics', city: 'Montreal, QC', focus: 'Collaborative Robot Arms', description: 'World-renowned for lightweight, assistive robotic arms. Their Gen3 and Link 6 cobots are used in research, healthcare, and industry globally. A Canadian robotics success story.', website: 'kinova.com', founded: '2006', employees: '300+', funding: '$100M+', highlight: true },
  { name: 'Clearpath Robotics / OTTO Motors', city: 'Kitchener, ON', focus: 'Autonomous Mobile Robots', description: 'Builds autonomous mobile robots (AMRs) for material handling and logistics. OTTO Motors is their industrial division. Acquired by Rockwell Automation in 2023 for $1.4B — Canada\'s largest robotics exit.', website: 'clearpathrobotics.com', founded: '2009', employees: '500+', funding: 'Acquired ($1.4B)', highlight: true },
  { name: 'MDA (MacDonald Dettwiler)', city: 'Brampton, ON', focus: 'Space Robotics', description: 'Built the Canadarm, Canadarm2, and Dextre for the International Space Station. Currently developing the Canadarm3 for the Lunar Gateway. Canada\'s most iconic robotics achievement.', website: 'mda.space', founded: '1969', employees: '3,000+', funding: 'Public (TSX: MDA)', highlight: true },
  { name: 'Avidbots', city: 'Kitchener, ON', focus: 'Autonomous Floor Cleaning', description: 'Makes Neo, an autonomous floor-scrubbing robot deployed in commercial buildings, airports, and malls across North America. AI-powered navigation and fleet management.', website: 'avidbots.com', founded: '2014', employees: '200+', funding: '$150M+', highlight: false },
  { name: 'Attabotics', city: 'Calgary, AB', focus: 'Robotic Warehouse Systems', description: 'Reimagines supply chain with 3D robotic storage and retrieval systems. Vertical goods-to-person fulfilment reduces warehouse footprint by 85%. Backed by significant funding.', website: 'attabotics.com', founded: '2016', employees: '300+', funding: '$200M+', highlight: false },
  { name: 'Kepler Communications', city: 'Toronto, ON', focus: 'Satellite & Space Tech', description: 'While primarily a communications company, Kepler is developing autonomous satellite servicing capabilities and contributes to Canada\'s space robotics ecosystem.', website: 'kepler.space', founded: '2015', employees: '100+', funding: '$100M+', highlight: false },
  { name: 'Titan Medical', city: 'Toronto, ON', focus: 'Surgical Robotics', description: 'Developing the Enos surgical robotic system for minimally invasive surgery. Aims to bring robotic surgery capabilities to more hospitals through a more compact, cost-effective design.', website: 'titanmedicalinc.com', founded: '2008', employees: '50+', funding: 'Public (TSX: TMD)', highlight: false },
  { name: 'Carbon Robotics', city: 'Kelowna, BC', focus: 'Agricultural Robotics', description: 'Builds the LaserWeeder — an autonomous robot that uses precision lasers to eliminate weeds without chemicals. Deployed on farms across North America.', website: 'carbonrobotics.com', founded: '2018', employees: '100+', funding: '$80M+', highlight: false },
  { name: 'Robotiq', city: 'Quebec City, QC', focus: 'Cobot Grippers & Accessories', description: 'World leader in collaborative robot accessories — grippers, force sensors, and vision systems. Their products are used with Universal Robots, FANUC, and others worldwide.', website: 'robotiq.com', founded: '2008', employees: '200+', funding: 'Profitable (private)', highlight: true },
  { name: 'AES Armada', city: 'Calgary, AB', focus: 'Oilfield Robotics', description: 'Develops autonomous robots for oil and gas operations — pipeline inspection, wellsite monitoring, and hazardous environment operations in Canadian energy facilities.', website: 'aesarmada.com', founded: '2017', employees: '50+', funding: '$20M+', highlight: false },
  { name: 'InDro Robotics', city: 'Salt Spring Island, BC', focus: 'Drone & UAS Services', description: 'Canada\'s first company approved for beyond-visual-line-of-sight (BVLOS) drone operations. Provides emergency response, infrastructure inspection, and delivery drone services.', website: 'indrorobotics.com', founded: '2014', employees: '50+', funding: 'Private', highlight: false },
  { name: 'Myant', city: 'Toronto, ON', focus: 'Textile Robotics / Smart Clothing', description: 'Develops SKIIN — connected textiles with embedded sensors. While not traditional robotics, their bio-sensing wearables represent the intersection of robotics and healthcare.', website: 'myant.ca', founded: '2010', employees: '100+', funding: '$80M+', highlight: false },
  { name: 'Halodi Robotics (Canadian ops)', city: 'Montreal, QC', focus: 'Humanoid Robots', description: 'Norwegian humanoid company with Canadian operations. Building the EVE humanoid for security, reception, and commercial applications. Canadian AI talent contributes to their autonomy stack.', website: 'halodi.com', founded: '2015', employees: '50+ (Canada)', funding: '$50M+', highlight: false },
  { name: 'Open Robotics', city: 'Multiple (CA contributors)', focus: 'ROS / Open Source', description: 'While US-headquartered, many ROS (Robot Operating System) core contributors are Canadian. Canada\'s universities are among the largest contributors to the ROS ecosystem that powers most humanoid robots.', website: 'openrobotics.org', founded: '2012', employees: '50+', funding: 'Foundation + corporate sponsors', highlight: false },
  { name: 'Microchip Technology (Microsemi)', city: 'Ottawa, ON', focus: 'Robotics Semiconductors', description: 'Ottawa operations develop FPGAs and processors used in robotics control systems. Their radiation-hardened chips are used in space robotics.', website: 'microchip.com', founded: '1989', employees: '500+ (Ottawa)', funding: 'Public (NASDAQ: MCHP)', highlight: false },
  { name: 'Novarc Technologies', city: 'North Vancouver, BC', focus: 'Welding Robotics', description: 'Makes the Spool Welding Robot (SWR) — the world\'s first collaborative welding robot for pipe fabrication. Used in oil & gas, shipbuilding, and construction.', website: 'novarctech.com', founded: '2013', employees: '80+', funding: '$30M+', highlight: false },
  { name: 'Drone Delivery Canada', city: 'Vaughan, ON', focus: 'Delivery Drones', description: 'Designs, develops, and tests drone delivery solutions for commercial applications across Canada. Partners with Canada Post and various Indigenous communities for remote delivery.', website: 'dronedeliverycanada.com', founded: '2013', employees: '50+', funding: 'Public (TSX-V: FLT)', highlight: false },
  { name: 'General Dynamics Mission Systems Canada', city: 'Ottawa, ON', focus: 'Defence Robotics', description: 'Develops unmanned systems, autonomous vehicles, and robotic platforms for the Canadian Armed Forces and allied militaries.', website: 'gdmissionsystems.ca', founded: '1948', employees: '2,000+', funding: 'Subsidiary of GD', highlight: false },
  { name: 'Bluewrist', city: 'Markham, ON', focus: 'Robot Vision Systems', description: 'AI-powered 3D vision systems for industrial robots. Their software guides robot arms for precision tasks in automotive, electronics, and consumer goods manufacturing.', website: 'bluewrist.com', founded: '2009', employees: '50+', funding: 'Private', highlight: false },
  { name: 'Point Grey Research (FLIR / Teledyne)', city: 'Richmond, BC', focus: 'Robot Vision Cameras', description: 'Leading manufacturer of machine vision cameras used in robotics. Their cameras are in thousands of robots worldwide. Acquired by FLIR (now Teledyne) but maintains BC operations.', website: 'teledynevisionsolutions.com', founded: '1997', employees: '200+ (BC)', funding: 'Acquired', highlight: false },
  { name: 'ABB Canada', city: 'Montreal, QC', focus: 'Industrial & Collaborative Robots', description: 'ABB\'s Canadian division manufactures and deploys industrial and collaborative robots (GoFa, YuMi). Major presence in automotive, mining, and pulp & paper automation.', website: 'abb.com/ca', founded: '1988 (Canada)', employees: '1,000+', funding: 'Public (NYSE: ABB)', highlight: false },
  { name: 'FANUC Canada', city: 'Mississauga, ON', focus: 'Industrial Robots', description: 'Canadian subsidiary of the world\'s largest industrial robot manufacturer. Provides robots, CNCs, and factory automation for Canadian manufacturing.', website: 'fanucamerica.com', founded: 'Canada HQ', employees: '200+', funding: 'Public', highlight: false },
  { name: 'Applanix (Trimble)', city: 'Richmond Hill, ON', focus: 'Navigation for Autonomous Systems', description: 'Develops POS (Position and Orientation Systems) used in autonomous vehicles, drones, and mobile robots for precise navigation. Critical infrastructure for autonomous robotics.', website: 'applanix.com', founded: '1991', employees: '100+', funding: 'Acquired by Trimble', highlight: false },
];

export default function CanadianRoboticsPage() {
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: 'https://robonorth.ca' },
    { name: 'Canadian Robotics Companies', url: 'https://robonorth.ca/canadian-robotics' },
  ]);

  const highlighted = companies.filter(c => c.highlight);
  const others = companies.filter(c => !c.highlight);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Canadian Robotics Companies</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">🇨🇦 Canadian Robotics Companies</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl">
          Canada is a global robotics powerhouse — from humanoid robots and cobots to space arms and autonomous vehicles. Here are {companies.length}+ companies shaping the industry.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{companies.length}+</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Companies Listed</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">$5B+</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Combined Funding/Valuation</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">10K+</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Jobs in Canadian Robotics</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">6</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Provinces Represented</p>
        </div>
      </div>

      {/* Featured Companies */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">⭐ Industry Leaders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {highlighted.map(company => (
            <div key={company.name} className="bg-white dark:bg-gray-900 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{company.name}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{company.city}</p>
                </div>
                <span className="text-xs bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-lg font-semibold">{company.focus}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{company.description}</p>
              <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span>Founded: {company.founded}</span>
                <span>Employees: {company.employees}</span>
                <span>Funding: {company.funding}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Companies */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📋 Full Directory</h2>
        <div className="space-y-3">
          {others.map(company => (
            <div key={company.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{company.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{company.city} · {company.focus}</p>
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500">
                  Est. {company.founded} · {company.employees} employees
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{company.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Know a Canadian Robotics Company We&apos;re Missing?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Help us build the most comprehensive directory of Canadian robotics companies.</p>
        <Link href="/contact" className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700">
          Submit a Company →
        </Link>
      </div>
    </div>
  );
}
