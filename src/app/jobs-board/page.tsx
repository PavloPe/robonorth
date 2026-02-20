import type { Metadata } from 'next';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Robotics Jobs in Canada — Job Board | RoboNorth',
  description: 'Find robotics jobs in Canada. Engineering, AI/ML, integration, and sales positions at Canadian robotics companies. Updated weekly.',
  keywords: ['robotics jobs Canada', 'robot engineer jobs', 'AI robotics jobs Toronto', 'robotics careers Canada'],
  openGraph: {
    title: 'Robotics Jobs in Canada — Job Board',
    description: 'Engineering, AI, and robotics careers at leading Canadian companies.',
    url: 'https://robonorth.ca/jobs-board',
  },
  alternates: { canonical: 'https://robonorth.ca/jobs-board' },
};

const jobs = [
  { title: 'Senior Robotics Engineer', company: 'Sanctuary AI', location: 'Vancouver, BC', type: 'Full-Time', salary: '$120K–$160K CAD', posted: '2026-02-15', url: '#', tags: ['C++', 'ROS 2', 'Control Systems'] },
  { title: 'AI/ML Research Scientist — Humanoid Locomotion', company: 'Sanctuary AI', location: 'Vancouver, BC', type: 'Full-Time', salary: '$140K–$180K CAD', posted: '2026-02-12', url: '#', tags: ['PyTorch', 'RL', 'Sim-to-Real'] },
  { title: 'Robot Integration Specialist', company: 'Kinova Robotics', location: 'Montreal, QC', type: 'Full-Time', salary: '$75K–$95K CAD', posted: '2026-02-10', url: '#', tags: ['ROS', 'Python', 'Integration'] },
  { title: 'Embedded Systems Developer — Actuators', company: 'Kinova Robotics', location: 'Montreal, QC', type: 'Full-Time', salary: '$85K–$110K CAD', posted: '2026-02-08', url: '#', tags: ['Embedded C', 'Motor Control', 'CAN Bus'] },
  { title: 'Fleet Management Software Engineer', company: 'Clearpath / OTTO Motors', location: 'Kitchener, ON', type: 'Full-Time', salary: '$100K–$130K CAD', posted: '2026-02-14', url: '#', tags: ['Go', 'Kubernetes', 'Fleet'] },
  { title: 'Computer Vision Engineer', company: 'Avidbots', location: 'Kitchener, ON', type: 'Full-Time', salary: '$90K–$120K CAD', posted: '2026-02-11', url: '#', tags: ['OpenCV', 'SLAM', 'LiDAR'] },
  { title: '3D Warehouse Robotics — Software Lead', company: 'Attabotics', location: 'Calgary, AB', type: 'Full-Time', salary: '$110K–$140K CAD', posted: '2026-02-09', url: '#', tags: ['Python', 'Path Planning', 'AWS'] },
  { title: 'Canadarm3 Systems Engineer', company: 'MDA', location: 'Brampton, ON', type: 'Full-Time', salary: '$95K–$125K CAD', posted: '2026-02-13', url: '#', tags: ['Space', 'Systems', 'Controls'] },
  { title: 'Cobot Applications Engineer', company: 'Robotiq', location: 'Quebec City, QC', type: 'Full-Time', salary: '$70K–$90K CAD', posted: '2026-02-07', url: '#', tags: ['UR Robots', 'Grippers', 'PLC'] },
  { title: 'Robot Simulation Engineer', company: 'NVIDIA Canada', location: 'Toronto, ON', type: 'Full-Time', salary: '$130K–$170K CAD', posted: '2026-02-16', url: '#', tags: ['Isaac Sim', 'Omniverse', 'CUDA'] },
  { title: 'Laser Weeding Robot — Field Technician', company: 'Carbon Robotics', location: 'Kelowna, BC', type: 'Full-Time', salary: '$55K–$70K CAD', posted: '2026-02-06', url: '#', tags: ['Field Work', 'Maintenance', 'AgTech'] },
  { title: 'Robot Sales — Enterprise Account Manager', company: 'ABB Canada', location: 'Montreal, QC', type: 'Full-Time', salary: '$90K–$130K + commission', posted: '2026-02-05', url: '#', tags: ['Sales', 'Manufacturing', 'B2B'] },
];

export default function JobsBoardPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Robotics Jobs</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">💼 Robotics Jobs in Canada</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl">
          The Canadian robotics industry is hiring. From humanoid robot engineering to AI research, find your next career in one of the fastest-growing sectors in the country.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{jobs.length}</p>
          <p className="text-xs text-gray-500">Open Positions</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">8</p>
          <p className="text-xs text-gray-500">Companies Hiring</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">5</p>
          <p className="text-xs text-gray-500">Provinces</p>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-3 mb-12">
        {jobs.map((job, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">{job.title}</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">{job.company} · {job.location}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{job.salary}</p>
                <p className="text-xs text-gray-400">{job.type}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {job.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 text-center">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Hiring for Robotics Positions?</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">List your robotics job openings on RoboNorth — Canada&apos;s most targeted robotics audience.</p>
        <Link href="/contact" className="text-blue-600 dark:text-blue-400 font-semibold">Submit a Job Listing →</Link>
      </div>
    </div>
  );
}
