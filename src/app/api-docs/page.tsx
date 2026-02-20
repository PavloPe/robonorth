import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'API Documentation — RoboNorth Public API',
  description: 'Access the RoboNorth public API for humanoid robot data — specs, pricing, availability, and manufacturers. Free for non-commercial use.',
  alternates: { canonical: 'https://robonorth.ca/api-docs' },
};

const endpoints = [
  {
    method: 'GET',
    path: '/api/robots',
    description: 'Returns all robots in the catalog with full specs, pricing, and availability.',
    response: `[
  {
    "id": "unitree-g1",
    "name": "Unitree G1",
    "manufacturer": "Unitree Robotics",
    "manufacturerSlug": "unitree-robotics",
    "price": "$16,000–$27,000 USD",
    "priceMin": 16000,
    "availability": "shipping",
    "category": "consumer",
    "useCase": ["education", "R&D", "light commercial"],
    "description": "A compact humanoid built for...",
    "specs": {
      "height": 132,
      "weight": 35,
      "dof": 43,
      "battery": "9,000 mAh, ~2 hr runtime",
      "payload": 3,
      "speed": 7.5
    },
    "country": "China",
    "imageUrl": "/images/robots/unitree-g1.jpg",
    "featured": true,
    "canadaAvailable": true
  }
]`,
    params: [],
  },
  {
    method: 'GET',
    path: '/api/health',
    description: 'Health check endpoint. Returns 200 OK if the service is running.',
    response: `{ "status": "ok", "timestamp": "2026-06-15T12:00:00.000Z" }`,
    params: [],
  },
  {
    method: 'POST',
    path: '/api/inquiry',
    description: 'Submit an early access or product inquiry. Saves to the database.',
    response: `{ "success": true, "id": "clx1234..." }`,
    params: [
      { name: 'name', type: 'string', required: true, desc: 'Full name' },
      { name: 'email', type: 'string', required: true, desc: 'Email address' },
      { name: 'phone', type: 'string', required: false, desc: 'Phone number' },
      { name: 'city', type: 'string', required: true, desc: 'City in Canada' },
      { name: 'robot', type: 'string', required: false, desc: 'Robot ID (slug)' },
      { name: 'message', type: 'string', required: false, desc: 'Additional message' },
    ],
  },
];

export default function APIDocsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">API Docs</span>
      </nav>

      <div className="mb-10">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Developer</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">API Documentation</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
          Access RoboNorth&apos;s public API for humanoid robot data. Free for non-commercial use.
          All endpoints return JSON.
        </p>
      </div>

      {/* Base URL */}
      <div className="bg-slate-900 dark:bg-gray-800 rounded-xl p-4 mb-8">
        <div className="text-xs text-slate-400 mb-1">Base URL</div>
        <code className="text-sm text-emerald-400 font-mono">https://robonorth.ca</code>
      </div>

      {/* Rate limits */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8">
        <h2 className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">⚠️ Rate Limits</h2>
        <p className="text-xs text-amber-700 dark:text-amber-400">
          API requests are limited to <strong>60 requests per minute</strong> per IP address. Exceeding this limit returns HTTP 429. For higher limits, <Link href="/contact" className="underline">contact us</Link>.
        </p>
      </div>

      {/* Endpoints */}
      <div className="space-y-8">
        {endpoints.map(ep => (
          <section key={ep.path} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  ep.method === 'GET' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                }`}>{ep.method}</span>
                <code className="text-sm font-mono text-gray-900 dark:text-white">{ep.path}</code>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{ep.description}</p>
            </div>

            {/* Parameters */}
            {ep.params.length > 0 && (
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Parameters</h3>
                <div className="space-y-2">
                  {ep.params.map(p => (
                    <div key={p.name} className="flex items-start gap-4 text-sm">
                      <code className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300 shrink-0">{p.name}</code>
                      <span className="text-xs text-gray-400">{p.type}</span>
                      {p.required && <span className="text-xs text-red-500 font-medium">required</span>}
                      <span className="text-xs text-gray-500 dark:text-gray-400">{p.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Response */}
            <div className="px-6 py-4">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Example Response</h3>
              <pre className="bg-slate-900 dark:bg-gray-800 text-emerald-400 text-xs rounded-xl p-4 overflow-x-auto font-mono">
                {ep.response}
              </pre>
            </div>
          </section>
        ))}
      </div>

      {/* SDK / Integration */}
      <section className="mt-12 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-950/20 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Need More?</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          We&apos;re developing official SDKs for Python and JavaScript. Want early access or have integration questions?
        </p>
        <Link href="/contact?subject=support" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
          Contact Developer Support →
        </Link>
      </section>
    </div>
  );
}
