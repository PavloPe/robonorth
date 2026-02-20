import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// Improvement #28: Government grants page

export const metadata: Metadata = {
  title: 'Government Grants for Robotics — SR&ED, IRAP & Provincial Programs',
  description: 'Comprehensive guide to Canadian government grants and tax incentives for robotics adoption. SR&ED, IRAP, and provincial programs explained.',
  alternates: { canonical: 'https://robonorth.ca/grants' },
};

const grants = [
  { name: 'SR&ED Tax Credit', agency: 'CRA (Federal)', amount: 'Up to 35%', type: 'Tax Credit', desc: 'Scientific Research and Experimental Development tax incentive. Covers robotics R&D, custom integration development, and novel applications research.', eligible: ['Robotics system custom development', 'Novel robot application research', 'AI/ML integration for robots', 'Safety system innovation'], color: 'blue' },
  { name: 'IRAP — Industrial Research Assistance Program', agency: 'NRC (Federal)', amount: '$50K–$500K', type: 'Non-Repayable Grant', desc: 'Contributions for SMEs conducting robotics R&D or adopting new technologies. Covers salaries, prototyping, and pilot programs.', eligible: ['Robot pilot programs', 'Custom software development', 'Integration engineering', 'Market research for robotics products'], color: 'emerald' },
  { name: 'Strategic Innovation Fund', agency: 'ISED (Federal)', amount: '$10M+', type: 'Repayable Contribution', desc: 'Large-scale funding for transformative robotics projects. Suitable for manufacturers scaling humanoid robot production or large-scale deployments.', eligible: ['Manufacturing scale-up', 'Large-scale robot deployment', 'Robotics R&D facilities', 'Industry consortium projects'], color: 'purple' },
  { name: 'Ontario Made Manufacturing Investment Tax Credit', agency: 'Ontario', amount: '10% of investment', type: 'Tax Credit', desc: 'Ontario manufacturers get a 10% tax credit on qualifying capital investments including robotics equipment.', eligible: ['Robot hardware purchase', 'Integration equipment', 'Safety system installation', 'Manufacturing automation'], color: 'amber' },
  { name: 'Investissement Québec', agency: 'Quebec', amount: 'Varies', type: 'Loan/Equity', desc: 'Financial support for Quebec-based companies investing in robotics and automation. Includes loans, equity investments, and guarantees.', eligible: ['Robot acquisition', 'Integration projects', 'R&D activities', 'Training programs'], color: 'blue' },
  { name: 'BC Tech Fund / Innovate BC', agency: 'British Columbia', amount: '$50K–$300K', type: 'Grant', desc: 'Support for BC-based robotics companies and adopters. Focus on innovation and technology commercialization.', eligible: ['Robotics startups', 'Technology commercialization', 'Pilot deployments', 'R&D projects'], color: 'emerald' },
  { name: 'Alberta Innovates', agency: 'Alberta', amount: '$50K–$2M', type: 'Grant', desc: 'Grants for Alberta companies applying robotics to energy, agriculture, and environmental monitoring.', eligible: ['Energy sector automation', 'Agricultural robotics', 'Environmental monitoring', 'Industrial inspection robots'], color: 'amber' },
  { name: 'Canada Digital Adoption Program (CDAP)', agency: 'ISED (Federal)', amount: 'Up to $15K', type: 'Grant + Loan', desc: 'Helps SMEs adopt new digital technologies including robotics. Includes grant for digital adoption plan and interest-free loans.', eligible: ['Digital adoption planning', 'Technology acquisition', 'Staff training', 'Process automation'], color: 'purple' },
];

export default function GrantsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Government Grants</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">💰 Funding</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Government Grants for Robotics</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Canadian federal and provincial programs that can significantly reduce the cost of adopting humanoid robots.</p>
      </div>

      <div className="space-y-6">
        {grants.map(grant => (
          <div key={grant.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 bg-${grant.color}-50 dark:bg-${grant.color}-900/20 rounded-xl flex items-center justify-center text-xl shrink-0`}>
                💰
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">{grant.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{grant.agency}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{grant.amount}</span>
                    <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">{grant.type}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-3">{grant.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {grant.eligible.map(item => (
                    <span key={item} className="text-[10px] bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Need Help Applying for Grants?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">We work with grant consultants who specialize in robotics and can help maximize your funding.</p>
        <Button href="/inquiry?type=grants" size="lg">Get Grant Assistance →</Button>
      </div>
    </div>
  );
}
