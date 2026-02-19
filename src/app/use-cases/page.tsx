import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Robot Use Cases by Industry — Manufacturing, Healthcare, Education & More',
  description: 'Discover how humanoid robots are used across industries: manufacturing, healthcare, education, home, research, and more. Find the right robot for your use case.',
  alternates: { canonical: 'https://robonorth.ca/use-cases' },
};

interface UseCase {
  id: string;
  icon: string;
  industry: string;
  description: string;
  tasks: string[];
  recommendedRobots: { name: string; slug: string; why: string }[];
  canadianContext: string;
}

const useCases: UseCase[] = [
  {
    id: 'manufacturing',
    icon: '🏭',
    industry: 'Manufacturing & Assembly',
    description: 'Humanoid robots are transforming Canadian manufacturing — handling repetitive tasks, assisting with assembly, and working shifts that are hard to fill with human workers.',
    tasks: ['Assembly line assistance', 'Quality inspection', 'Material handling', 'Warehouse picking and packing', 'Machine tending', 'Palletizing'],
    recommendedRobots: [
      { name: 'Figure 02', slug: 'figure-02', why: 'Best enterprise manufacturing solution with OpenAI-powered conversational control' },
      { name: 'Tesla Optimus Gen 2', slug: 'tesla-optimus-gen-2', why: 'Human-scale worker with 10 kg payload and 5+ hour battery' },
      { name: 'Apptronik Apollo', slug: 'apptronik-apollo', why: 'Purpose-built for logistics with 25 kg payload capacity' },
    ],
    canadianContext: 'Ontario\'s automotive corridor and Quebec\'s aerospace sector have the highest demand. 80,000+ unfilled manufacturing positions make automation essential.',
  },
  {
    id: 'logistics',
    icon: '📦',
    industry: 'Logistics & Warehousing',
    description: 'E-commerce growth has created massive demand for warehouse labour, especially in the GTA and Metro Vancouver. Humanoid robots handle the physically demanding work.',
    tasks: ['Tote and box handling', 'Truck unloading', 'Order picking', 'Sorting and staging', 'Inventory management', 'Last-mile delivery assistance'],
    recommendedRobots: [
      { name: 'Agility Digit', slug: 'agility-digit', why: 'Purpose-built for warehouse logistics — proven in Amazon pilot programs' },
      { name: 'Unitree H1', slug: 'unitree-h1', why: 'Versatile, affordable option with strong carrying capacity' },
      { name: 'Tesla Optimus Gen 2', slug: 'tesla-optimus-gen-2', why: 'Full-shift battery life and familiar service network' },
    ],
    canadianContext: 'GTA and Metro Vancouver are Canada\'s e-commerce hubs. Peak season (Oct-Dec) drives 40%+ temporary hiring needs that robots can supplement.',
  },
  {
    id: 'healthcare',
    icon: '🏥',
    industry: 'Healthcare & Eldercare',
    description: 'Canada\'s healthcare worker shortage is acute, particularly in long-term care. Robots handle physical labour — transport, lifting, sanitization — reducing caregiver burnout.',
    tasks: ['Supply transport', 'Patient mobility assistance', 'Room sanitization', 'Medication delivery', 'Elderly companionship', 'Physical therapy assistance'],
    recommendedRobots: [
      { name: 'Sanctuary AI Phoenix', slug: 'sanctuary-phoenix', why: 'Canadian-made, general-purpose design ideal for healthcare environments' },
      { name: '1X NEO', slug: '1x-neo', why: 'Lightest humanoid (30 kg), safest for close human interaction' },
      { name: 'Fourier GR-2', slug: 'fourier-gr-2', why: 'Built by a rehabilitation robotics company, smooth and gentle movement' },
    ],
    canadianContext: 'Canadian healthcare faces severe staffing crises. Robots augment staff rather than replace them — handling physical tasks so caregivers focus on patient care.',
  },
  {
    id: 'education',
    icon: '🎓',
    industry: 'Education & Research',
    description: 'Canadian universities are at the forefront of robotics research. Affordable humanoid robots enable hands-on learning and cutting-edge AI research.',
    tasks: ['Robotics courses and labs', 'AI research', 'Locomotion studies', 'Human-robot interaction research', 'Student competitions', 'Public demonstrations'],
    recommendedRobots: [
      { name: 'Unitree G1', slug: 'unitree-g1', why: 'Best value at $16K, open SDK, 43 DOF — the lab workhorse' },
      { name: 'Fourier GR-1', slug: 'fourier-gr-1', why: 'Strong specs, affordable, great for rehabilitation research' },
      { name: 'Booster T1', slug: 'booster-t1', why: 'Most affordable option for basic education and demonstration' },
    ],
    canadianContext: 'Canada\'s AI corridor (Montreal-Toronto-Edmonton) produces world-class robotics researchers. NSERC and CFI grants fund lab equipment purchases.',
  },
  {
    id: 'home',
    icon: '🏠',
    industry: 'Home & Personal',
    description: 'The home robot revolution is just beginning. Early models handle basic household tasks — tidying, carrying, monitoring — with capabilities expanding rapidly.',
    tasks: ['Tidying and organizing', 'Carrying groceries and laundry', 'Door and cabinet operation', 'Home monitoring/security', 'Elderly assistance', 'Pet monitoring'],
    recommendedRobots: [
      { name: '1X NEO', slug: '1x-neo', why: 'Specifically designed for home use, lightweight and safe' },
      { name: 'Tesla Optimus Gen 2', slug: 'tesla-optimus-gen-2', why: 'Long battery life, growing capability, Tesla ecosystem integration' },
      { name: 'Agibot A2', slug: 'agibot-a2', why: 'Competitive pricing for home deployment' },
    ],
    canadianContext: 'An aging population makes home assistance increasingly valuable. Early adopters in Canadian tech hubs (Toronto, Vancouver) are leading the way.',
  },
  {
    id: 'energy',
    icon: '⚡',
    industry: 'Energy & Resources',
    description: 'Canada\'s energy sector operates in some of the harshest conditions on Earth. Robots perform dangerous inspections and maintenance, keeping human workers safe.',
    tasks: ['Equipment inspection', 'Valve operation', 'Confined space entry', 'Hazardous environment monitoring', 'Sample collection', 'Pipeline inspection'],
    recommendedRobots: [
      { name: 'Boston Dynamics Atlas', slug: 'boston-dynamics-atlas', why: 'Most physically capable — designed for challenging environments' },
      { name: 'Figure 02', slug: 'figure-02', why: 'Advanced manipulation and long battery life for extended operations' },
      { name: 'Sanctuary AI Phoenix', slug: 'sanctuary-phoenix', why: 'Canadian company with energy sector partnerships' },
    ],
    canadianContext: 'Alberta\'s oil sands and BC\'s LNG sector face extreme conditions and safety risks. H₂S exposure, extreme cold, and confined spaces make automation a safety imperative.',
  },
];

export default function UseCasesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 font-medium">Use Cases</span>
      </nav>

      <div className="mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Use Cases</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Robot Use Cases by Industry</h1>
        <p className="text-gray-500 max-w-2xl">
          Discover how humanoid robots are being deployed across Canadian industries — and find the right model for your needs.
        </p>
      </div>

      {/* Quick nav */}
      <div className="flex flex-wrap gap-2 mb-12">
        {useCases.map(uc => (
          <a
            key={uc.id}
            href={`#${uc.id}`}
            className="px-4 py-2 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-600 text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <span>{uc.icon}</span> {uc.industry}
          </a>
        ))}
      </div>

      {/* Use case cards */}
      <div className="space-y-12">
        {useCases.map(uc => (
          <section key={uc.id} id={uc.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 p-6 sm:p-8 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{uc.icon}</span>
                <h2 className="text-2xl font-bold text-gray-900">{uc.industry}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed max-w-3xl">{uc.description}</p>
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tasks */}
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Common Tasks</h3>
                <ul className="space-y-2">
                  {uc.tasks.map(task => (
                    <li key={task} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended robots */}
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Recommended Robots</h3>
                <div className="space-y-3">
                  {uc.recommendedRobots.map(robot => (
                    <Link
                      key={robot.slug}
                      href={`/robots/${robot.slug}`}
                      className="block bg-gray-50 border border-gray-200 rounded-lg p-3 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                    >
                      <div className="text-sm font-bold text-gray-900">{robot.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{robot.why}</div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Canadian context */}
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">🇨🇦 Canadian Context</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{uc.canadianContext}</p>
                <div className="mt-4">
                  <Button href="/inquiry" size="sm" variant="outline">Get Recommendations →</Button>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Not sure which robot fits your use case?</h2>
        <p className="text-gray-500 mb-6">Our team can provide personalized recommendations based on your industry and requirements.</p>
        <div className="flex gap-3 justify-center">
          <Button href="/inquiry">Get Personalized Advice</Button>
          <Button href="/compare" variant="outline">Compare Models</Button>
        </div>
      </div>
    </div>
  );
}
