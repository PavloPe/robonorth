import Link from 'next/link';

// Improvement #44: "Robot of the Month" featured section on homepage

export default function RobotOfMonth() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-yellow-950/20 border border-amber-200/60 dark:border-amber-800/40 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
        
        <div className="relative flex flex-col lg:flex-row items-center gap-8">
          {/* Robot visual */}
          <div className="w-48 h-48 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-3xl flex items-center justify-center shrink-0 border border-amber-200/60 dark:border-amber-700/60">
            <div className="text-center">
              <span className="text-6xl">🏆</span>
              <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold mt-2 uppercase tracking-wider">Robot of the Month</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full mb-3">
              ⭐ June 2026 Pick
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Unitree G1</h2>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-3">By Unitree Robotics · From $16,000 USD</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 max-w-xl">
              The Unitree G1 continues to dominate as the most accessible humanoid robot on the market. At $16,000 for the EDU version, it offers 43 degrees of freedom, stair climbing, and an open SDK — making it the perfect entry point for Canadian researchers, educators, and forward-thinking businesses.
            </p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
              {['43 DOF', '127 cm', '35 kg', '$16K+', 'Open SDK', 'Ships Now'].map(spec => (
                <span key={spec} className="text-xs bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 font-medium">
                  {spec}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="/robots/unitree-g1" className="inline-flex items-center justify-center px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
                View Full Details →
              </Link>
              <Link href="/compare?robots=unitree-g1" className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium rounded-xl transition-colors">
                Compare
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
