import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'What Is a Humanoid Robot? The Complete Guide (2026) | RoboNorth',
  description: 'The definitive guide to humanoid robots: what they are, how they work, their history, types, key technologies, leading manufacturers, and where the industry is headed. Updated for 2026.',
  keywords: ['what is a humanoid robot', 'humanoid robot definition', 'humanoid robot types', 'humanoid robot history', 'bipedal robot', 'android robot'],
  openGraph: {
    title: 'What Is a Humanoid Robot? The Complete Guide (2026)',
    description: 'Everything you need to know about humanoid robots — from definition to the latest 2026 technology. The most comprehensive guide online.',
    url: 'https://robonorth.ca/what-is-humanoid-robot',
    type: 'article',
  },
  alternates: { canonical: 'https://robonorth.ca/what-is-humanoid-robot' },
};

export default function WhatIsHumanoidRobotPage() {
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: 'https://robonorth.ca' },
    { name: 'What Is a Humanoid Robot?', url: 'https://robonorth.ca/what-is-humanoid-robot' },
  ]);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Is a Humanoid Robot? The Complete Guide (2026)',
    description: 'The definitive guide to humanoid robots: definition, types, history, technology, and future.',
    author: { '@type': 'Organization', name: 'RoboNorth' },
    publisher: { '@type': 'Organization', name: 'RoboNorth', url: 'https://robonorth.ca' },
    datePublished: '2026-02-01',
    dateModified: '2026-02-18',
    mainEntityOfPage: 'https://robonorth.ca/what-is-humanoid-robot',
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is a humanoid robot?', acceptedAnswer: { '@type': 'Answer', text: 'A humanoid robot is a robot designed to resemble the human body in form. It typically has a head, torso, two arms, and two legs, and is built to operate in environments designed for humans.' } },
      { '@type': 'Question', name: 'How much does a humanoid robot cost?', acceptedAnswer: { '@type': 'Answer', text: 'In 2026, humanoid robots range from $5,900 USD (Unitree R1) to over $420,000 USD (Boston Dynamics Atlas Electric). Consumer models start around $5,900-$20,000, while enterprise models range from $25,000-$250,000.' } },
      { '@type': 'Question', name: 'Can I buy a humanoid robot for my home?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. In 2026, several humanoid robots are available for home use, including the 1X NEO ($20,000 or $499/month lease), Unitree R1 ($5,900), and Unitree G1 (from $13,500). NAO ($9,000) is popular for education.' } },
      { '@type': 'Question', name: 'What is the best humanoid robot in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'The Figure 03 is rated the #1 humanoid robot of 2026 by RoboNorth, scoring highest in technical capability and industry impact. For consumers, the 1X NEO is the best home robot, and the Unitree G1 is the best value.' } },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">What Is a Humanoid Robot?</span>
      </nav>

      <article>
        <header className="mb-12">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Definitive Guide · Updated February 2026</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">What Is a Humanoid Robot?</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
            The complete guide to humanoid robots — what they are, how they work, their 70-year history, the different types, leading manufacturers, and where this transformative industry is headed in 2026 and beyond.
          </p>
        </header>

        {/* Table of Contents */}
        <nav className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-12">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Table of Contents</h2>
          <ol className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
            {[
              ['#definition', '1. Definition & Key Characteristics'],
              ['#how-they-work', '2. How Humanoid Robots Work'],
              ['#types', '3. Types of Humanoid Robots'],
              ['#history', '4. A Brief History'],
              ['#key-tech', '5. Key Technologies'],
              ['#manufacturers', '6. Leading Manufacturers (2026)'],
              ['#applications', '7. Real-World Applications'],
              ['#cost', '8. How Much Do They Cost?'],
              ['#future', '9. The Future of Humanoid Robots'],
              ['#faq', '10. Frequently Asked Questions'],
            ].map(([href, text]) => (
              <li key={href}><a href={href} className="hover:text-blue-700 dark:hover:text-blue-300">{text}</a></li>
            ))}
          </ol>
        </nav>

        <div className="prose-custom space-y-12">
          {/* Section 1: Definition */}
          <section id="definition">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Definition & Key Characteristics</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              A <strong className="text-gray-900 dark:text-white">humanoid robot</strong> is a robot designed with a body shape and structure that resembles the human form. At minimum, a humanoid robot has a torso, a head, and two arms. Most also have two legs for bipedal locomotion, though some use wheels or other mobility platforms.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              The fundamental purpose of the human form factor is practical: the world is built for human bodies. Doorways, stairs, tools, vehicles, and workspaces are all designed around human proportions. A robot that shares those proportions can operate in these environments without modification — a massive economic advantage over traditional industrial robots that require custom-built work cells.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Key characteristics that define a humanoid robot include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Anthropomorphic form:</strong> Head, torso, and at least two arms arranged in a human-like configuration</li>
              <li><strong className="text-gray-900 dark:text-white">Bipedal locomotion</strong> (most models): Two-legged walking, enabling navigation in human environments including stairs</li>
              <li><strong className="text-gray-900 dark:text-white">Dexterous manipulation:</strong> Hands or grippers capable of grasping and manipulating objects</li>
              <li><strong className="text-gray-900 dark:text-white">Perception systems:</strong> Cameras, LiDAR, and/or other sensors for environmental awareness</li>
              <li><strong className="text-gray-900 dark:text-white">AI-driven autonomy:</strong> On-board computing for real-time decision-making and task execution</li>
            </ul>
          </section>

          {/* Section 2: How They Work */}
          <section id="how-they-work">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How Humanoid Robots Work</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Modern humanoid robots are marvels of integrated engineering, combining hardware and software across several key systems:
            </p>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-3">Actuation (Movement)</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Humanoid robots move through <strong className="text-gray-900 dark:text-white">actuators</strong> — electric motors, hydraulic cylinders, or (rarely) pneumatic systems that drive each joint. A robot's <strong className="text-gray-900 dark:text-white">degrees of freedom (DOF)</strong> count how many independent axes of motion it has. The human body has approximately 244 DOF; modern humanoid robots range from 20 to 56+ DOF. Each DOF requires an actuator, a sensor, and a controller, which is why higher DOF counts dramatically increase cost and complexity.
            </p>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-3">Perception (Senses)</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Robots perceive the world through arrays of sensors: stereo cameras for depth vision, LiDAR for precise 3D mapping, inertial measurement units (IMUs) for balance, force/torque sensors in joints for contact detection, and tactile sensors in fingertips for object manipulation. The latest robots (like Figure 03) also include palm-mounted cameras for close-up precision work.
            </p>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-3">AI & Control (Brain)</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              The 2025-2026 revolution in humanoid robots is largely driven by AI. Modern robots use neural networks trained in simulation (sim-to-real transfer) to generate whole-body motor commands in real time. Foundation models like NVIDIA's GR00T N1 and Figure AI's Helix enable robots to understand natural language commands, recognise objects, and generalise learned tasks to new situations. Most on-board computing uses NVIDIA Jetson modules (Orin, Thor) for real-time inference.
            </p>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-3">Power (Energy)</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Nearly all modern humanoid robots are battery-electric, using lithium-ion or lithium-polymer packs. Battery life ranges from 1 hour (Unitree R1) to 5+ hours (Tesla Optimus Gen 3). Some robots feature hot-swappable batteries (Unitree, Apptronik) for continuous operation, and Figure 03 pioneered wireless charging to eliminate manual intervention entirely.
            </p>
          </section>

          {/* Section 3: Types */}
          <section id="types">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Types of Humanoid Robots</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Not all humanoid robots are created equal. They can be categorised by form factor, purpose, and market segment:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { emoji: '🏭', title: 'Enterprise / Industrial', desc: 'Full-size robots (165-190 cm) for manufacturing, logistics, and warehouse tasks. Examples: Figure 03, Tesla Optimus, Agility Digit, Apptronik Apollo.' },
                { emoji: '🏠', title: 'Consumer / Home', desc: 'Designed for home use with safety-first engineering. Examples: 1X NEO, Unitree R1, NEURA 4NE1 (home variant).' },
                { emoji: '🔬', title: 'Research / Academic', desc: 'Platforms for university labs and R&D. Open SDK, ROS 2 support. Examples: Unitree G1 EDU, H1-2, Fourier GR-1.' },
                { emoji: '🎭', title: 'Social / Interactive', desc: 'Designed for human interaction — retail, hospitality, therapy. Examples: SoftBank Pepper, NAO, Engineered Arts Ameca, Promobot V.4.' },
              ].map(item => (
                <div key={item.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                  <div className="text-2xl mb-2">{item.emoji}</div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Some humanoid robots blur these categories. The Unitree G1, for instance, serves both consumer and research markets. The NEURA 4NE1 offers both home and industrial variants from the same platform.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              It's also worth noting the distinction between <strong className="text-gray-900 dark:text-white">full humanoids</strong> (bipedal, full body) and <strong className="text-gray-900 dark:text-white">partial humanoids</strong>. Robots like 1X EVE have a humanoid upper body on a wheeled base — they sacrifice bipedal locomotion for the efficiency and reliability of wheels in flat environments like warehouses and offices.
            </p>
          </section>

          {/* Section 4: History */}
          <section id="history">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. A Brief History of Humanoid Robots</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              The dream of creating human-like machines predates modern robotics by centuries. Greek myths described Talos, a bronze automaton. Leonardo da Vinci designed a mechanical knight in 1495. But the modern era of humanoid robotics began in the mid-20th century.
            </p>

            <div className="space-y-4">
              {[
                { year: '1973', event: 'WABOT-1 (Waseda University, Japan)', desc: 'The first full-scale humanoid robot. It could walk, grip objects, and communicate in Japanese — though slowly and clumsily.' },
                { year: '1986', event: 'Honda E0', desc: 'Honda began a 14-year programme that would eventually produce ASIMO. E0 was the first in a series of bipedal walking research robots.' },
                { year: '2000', event: 'Honda ASIMO', desc: 'The most famous humanoid robot of its era. ASIMO could walk, climb stairs, recognise faces, and respond to voice commands. It became a cultural icon.' },
                { year: '2006', event: 'Aldebaran NAO', desc: 'The first mass-produced small humanoid robot, designed for education and research. Over 13,000 units sold, used in RoboCup competitions worldwide.' },
                { year: '2013', event: 'Boston Dynamics Atlas (Hydraulic)', desc: 'DARPA-funded, Atlas demonstrated unprecedented dynamic locomotion — running, jumping, backflipping. Set the bar for what humanoid robots could physically achieve.' },
                { year: '2014', event: 'SoftBank Pepper', desc: 'The first social humanoid robot for consumer/commercial use. Over 15,000 units deployed in retail, hospitality, and education.' },
                { year: '2022', event: 'Tesla unveils Optimus concept', desc: 'Elon Musk announces Tesla is building a humanoid robot, sparking a wave of investment and competition in the sector.' },
                { year: '2023', event: 'The Humanoid Spring', desc: 'Figure AI, Apptronik, Sanctuary AI, and a dozen others announce humanoid robot programmes. Over $5 billion is invested in the sector in a single year.' },
                { year: '2024', event: 'Atlas goes Electric, Figure deploys at BMW', desc: 'Boston Dynamics reveals the all-electric Atlas. Figure 02 enters BMW factory pilot. Unitree ships G1 at sub-$20K.' },
                { year: '2025', event: 'Unitree R1 at $5,900, 1X NEO ships', desc: 'The price barrier shatters. TIME names R1 Best Invention 2025. 1X begins shipping NEO to early adopters for home use.' },
                { year: '2026', event: 'Figure 03, Tesla Gen 3 production, CES explosion', desc: 'Figure 03 becomes the #1 ranked humanoid. Tesla starts production. CES 2026 features Unitree H2, NEURA 4NE1, LG CLOi-D. The industry enters commercial reality.' },
              ].map(item => (
                <div key={item.year} className="flex gap-4">
                  <div className="shrink-0 w-14 text-sm font-bold text-blue-600 dark:text-blue-400 pt-0.5">{item.year}</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{item.event}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Key Technologies */}
          <section id="key-tech">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Key Technologies Enabling the 2026 Revolution</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Several converging technologies have made the current humanoid robot boom possible:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Foundation models for robotics:</strong> NVIDIA's GR00T, Figure's Helix, and Google DeepMind's RT-2 enable robots to understand and execute natural language commands, learn tasks from few demonstrations, and generalise across environments.</li>
              <li><strong className="text-gray-900 dark:text-white">Sim-to-real transfer:</strong> Robots are first trained in photorealistic simulation (NVIDIA Isaac Sim, MuJoCo) and then deployed in the real world. This dramatically reduces the time and risk of training.</li>
              <li><strong className="text-gray-900 dark:text-white">High-performance edge compute:</strong> NVIDIA Jetson Orin (275 TOPS) and Jetson Thor enable on-device AI inference — no cloud connectivity needed for real-time decisions.</li>
              <li><strong className="text-gray-900 dark:text-white">Advanced actuators:</strong> Custom electric actuators from Tesla, Unitree, and others deliver higher torque at lower weight and cost than previous generations.</li>
              <li><strong className="text-gray-900 dark:text-white">Battery technology:</strong> High-density lithium packs now provide 2-8 hours of continuous operation. Wireless charging (Figure 03) enables autonomous power management.</li>
              <li><strong className="text-gray-900 dark:text-white">Manufacturing scale:</strong> Dedicated factories like Figure's BotQ (12K/year) and Agility's RoboFab (10K/year) enable mass production, driving down unit costs.</li>
            </ul>
          </section>

          {/* Section 6: Manufacturers */}
          <section id="manufacturers">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Leading Manufacturers (2026)</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              The humanoid robot industry is dominated by companies across three major regions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">🇺🇸 United States</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">Figure AI, Tesla, Boston Dynamics, Agility Robotics, Apptronik</p>
              </div>
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">🇨🇳 China</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">Unitree, Fourier Intelligence, UBTECH, Kepler, Agibot, RobotEra, Galbot</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">🇨🇦🇪🇺🇳🇴 Other</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">Sanctuary AI (Canada), 1X Technologies (Norway), NEURA Robotics (Germany), Engineered Arts (UK)</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <Link href="/manufacturers" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">View all 26 manufacturers →</Link>
            </p>
          </section>

          {/* Section 7: Applications */}
          <section id="applications">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Real-World Applications</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              In 2026, humanoid robots are deployed across a growing range of industries:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Manufacturing:</strong> Figure 03 at BMW, Tesla Optimus in Tesla factories, Atlas at Hyundai Metaplant</li>
              <li><strong className="text-gray-900 dark:text-white">Warehouse logistics:</strong> Agility Digit at Amazon, GXO, and Toyota Canada (Woodstock, ON)</li>
              <li><strong className="text-gray-900 dark:text-white">Healthcare:</strong> Fourier GR-2 in rehabilitation, NAO in autism therapy</li>
              <li><strong className="text-gray-900 dark:text-white">Retail & hospitality:</strong> Pepper in hotels, Promobot V.4 in customer service</li>
              <li><strong className="text-gray-900 dark:text-white">Home assistance:</strong> 1X NEO for household tasks, cleaning, and companionship</li>
              <li><strong className="text-gray-900 dark:text-white">Education:</strong> NAO and Unitree G1 in STEM classrooms</li>
              <li><strong className="text-gray-900 dark:text-white">Entertainment:</strong> Ameca at trade shows and museums</li>
            </ul>
          </section>

          {/* Section 8: Cost */}
          <section id="cost">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. How Much Do Humanoid Robots Cost?</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Pricing in 2026 spans an enormous range, from consumer-accessible to enterprise-only:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 dark:text-gray-400">Price Range</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 dark:text-gray-400">Examples</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 dark:text-gray-400">Market</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr><td className="px-4 py-3 font-medium text-gray-900 dark:text-white">$5,900–$9,000</td><td className="px-4 py-3 text-gray-600 dark:text-gray-300">Unitree R1, NAO</td><td className="px-4 py-3 text-gray-600 dark:text-gray-300">Consumer / Education</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-gray-900 dark:text-white">$13,500–$30,000</td><td className="px-4 py-3 text-gray-600 dark:text-gray-300">Unitree G1, 1X NEO, Unitree H2</td><td className="px-4 py-3 text-gray-600 dark:text-gray-300">Consumer / SME</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-gray-900 dark:text-white">$25,000–$100,000</td><td className="px-4 py-3 text-gray-600 dark:text-gray-300">Tesla Optimus, Sanctuary Phoenix, Figure 03, Apptronik Apollo</td><td className="px-4 py-3 text-gray-600 dark:text-gray-300">Enterprise</td></tr>
                  <tr><td className="px-4 py-3 font-medium text-gray-900 dark:text-white">$100,000–$420,000</td><td className="px-4 py-3 text-gray-600 dark:text-gray-300">Ameca, Fourier GR-2, Agility Digit, Atlas Electric</td><td className="px-4 py-3 text-gray-600 dark:text-gray-300">Enterprise / Research</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <Link href="/pricing-guide" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Read our complete pricing guide →</Link>
            </p>
          </section>

          {/* Section 9: Future */}
          <section id="future">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. The Future of Humanoid Robots</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              The humanoid robot industry is at an inflection point. Here's what experts expect in the near and medium term:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">2026-2027:</strong> First mass consumer sales (Tesla Optimus, 1X NEO, NEURA 4NE1). Prices continue to fall. Fleet deployments of 100+ units become common in large factories.</li>
              <li><strong className="text-gray-900 dark:text-white">2028-2030:</strong> Humanoid robots become standard in new warehouse and manufacturing installations. Home robots handle 10-20 household tasks reliably. Multi-robot coordination becomes standard.</li>
              <li><strong className="text-gray-900 dark:text-white">2030-2035:</strong> Humanoid robots may become as common as smartphones. Goldman Sachs estimates the market could reach $38 billion by 2035. Robots will be available at consumer electronics retailers.</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              For Canada specifically, the Agility Digit deployment at Toyota Woodstock, Ontario, and Sanctuary AI's partnership with Magna International are early indicators of a significant domestic robotics industry.
            </p>
          </section>

          {/* Section 10: FAQ */}
          <section id="faq">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'What is a humanoid robot?', a: 'A humanoid robot is a robot designed to resemble the human body in form. It typically has a head, torso, two arms, and two legs, and is built to operate in environments designed for humans.' },
                { q: 'How much does a humanoid robot cost?', a: 'In 2026, prices range from $5,900 USD (Unitree R1) to over $420,000 USD (Boston Dynamics Atlas Electric). Consumer models start around $5,900-$20,000.' },
                { q: 'Can I buy a humanoid robot for my home?', a: 'Yes. The 1X NEO ($20,000 or $499/month lease), Unitree R1 ($5,900), and Unitree G1 (from $13,500) are available for home use.' },
                { q: 'What is the best humanoid robot in 2026?', a: 'The Figure 03 is the #1 ranked humanoid overall. For consumers, the 1X NEO is best for home use, and the Unitree G1 is the best value.' },
                { q: 'Are humanoid robots safe?', a: 'Modern humanoid robots include safety features like force-limited actuators, collision detection, and emergency stops. Robots designed for home use (like 1X NEO) have soft-body construction for extra safety. All commercial robots comply with ISO safety standards.' },
                { q: 'Can humanoid robots ship to Canada?', a: 'Yes. Many humanoid robots ship to Canada. Trade agreements (CUSMA for US robots, CETA for EU robots) eliminate or reduce import duties. Sanctuary AI Phoenix is built in Canada.' },
              ].map((faq, i) => (
                <details key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl group">
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                    {faq.q}
                    <svg className="w-4 h-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <div className="px-6 pb-4 text-sm text-gray-600 dark:text-gray-300">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Ready to explore humanoid robots?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Browse our catalog of 40+ humanoid robots with Canadian pricing and shipping details.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/robots">Browse All Robots</Button>
            <Button href="/best-humanoid-robots" variant="outline">See Rankings</Button>
            <Button href="/reviews" variant="outline">Read Reviews</Button>
          </div>
        </div>
      </article>
    </div>
  );
}
