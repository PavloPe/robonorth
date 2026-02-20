'use client';

// Task 32: Partner brand logos scrolling banner
const brands = [
  'Tesla', 'Boston Dynamics', 'Unitree', 'Figure AI', '1X Technologies',
  'Agility Robotics', 'Apptronik', 'Sanctuary AI', 'Kepler', 'Fourier',
  'UBTECH', 'Xiaomi (CyberOne)', 'Nvidia', 'GalBot', 'Menteebot',
];

export default function PartnerLogoBanner() {
  return (
    <section className="py-8 bg-gray-50/80 dark:bg-gray-900/50 border-y border-gray-200/60 dark:border-gray-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center mb-6">Featuring robots from leading manufacturers</p>
      </div>
      <div className="relative">
        <div className="flex animate-marquee gap-8 whitespace-nowrap">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 min-w-[150px]"
            >
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">{brand}</span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
