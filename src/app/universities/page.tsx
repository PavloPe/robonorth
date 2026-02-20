import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'University Partnerships — Academic Robot Purchasing | RoboNorth',
  description: 'RoboNorth partners with Canadian universities for research robots. Special academic pricing for UofT, Waterloo, UBC, McGill, Alberta, and Calgary.',
  alternates: { canonical: 'https://robonorth.ca/universities' },
};

const universities = [
  { name: 'University of Toronto', program: 'Robotics Institute', city: 'Toronto, ON', focus: 'Manipulation, computer vision, autonomous systems', labs: 'PAIR Lab, Dynamic Systems Lab, Robot Vision Group' },
  { name: 'University of Waterloo', program: 'Mechanical & Mechatronics Engineering', city: 'Waterloo, ON', focus: 'Mobile robotics, human-robot interaction, medical robotics', labs: 'Adaptive Systems Lab, People and Robots Lab' },
  { name: 'University of British Columbia', program: 'Electrical & Computer Engineering', city: 'Vancouver, BC', focus: 'Soft robotics, teleoperation, surgical robots', labs: 'SPIN Lab, Collaborative Advanced Robotics Lab' },
  { name: 'McGill University', program: 'Centre for Intelligent Machines', city: 'Montréal, QC', focus: 'AI, computer vision, mobile robots, haptics', labs: 'Mobile Robotics Lab, Shared Reality Lab' },
  { name: 'University of Alberta', program: 'Computing Science', city: 'Edmonton, AB', focus: 'Reinforcement learning, robot decision-making', labs: 'Amii, RLAI Lab' },
  { name: 'University of Calgary', program: 'Schulich School of Engineering', city: 'Calgary, AB', focus: 'Medical robotics, rehabilitation, autonomous vehicles', labs: 'Biomedical Engineering, Robotic Manipulation Lab' },
];

export default function UniversitiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">University Partnerships</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">🎓 Academic Partners</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">University Robotics Partnerships</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">We work with Canada&apos;s top universities to provide research-grade humanoid robots at academic pricing.</p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div><p className="text-2xl font-bold text-blue-600">15%</p><p className="text-xs text-gray-600 dark:text-gray-300">Academic discount</p></div>
          <div><p className="text-2xl font-bold text-blue-600">20+</p><p className="text-xs text-gray-600 dark:text-gray-300">University partners</p></div>
          <div><p className="text-2xl font-bold text-blue-600">24h</p><p className="text-xs text-gray-600 dark:text-gray-300">Dedicated academic support</p></div>
        </div>
      </div>

      <div className="space-y-4 mb-12">
        {universities.map(uni => (
          <div key={uni.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-xl shrink-0">🎓</div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">{uni.name}</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">{uni.program} — 📍 {uni.city}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{uni.focus}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400"><strong>Key Labs:</strong> {uni.labs}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-10">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">How Academic Purchasing Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { step: '1', title: 'Verify', desc: 'Provide your university email and department. We verify within 24h.' },
            { step: '2', title: 'Quote', desc: 'Receive academic pricing with 15% discount. PO and grant funding accepted.' },
            { step: '3', title: 'Deploy', desc: 'Free on-campus delivery, setup assistance, and research support documentation.' },
          ].map(s => (
            <div key={s.step} className="text-center">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 mx-auto mb-2">{s.step}</div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{s.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Ready to equip your lab?</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/education-pricing" size="sm">Apply for Academic Pricing</Button>
          <a href="tel:+15873250017" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">📞 (587) 325-0017</a>
        </div>
      </div>
    </div>
  );
}
