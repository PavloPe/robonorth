import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

// Improvement #36: Image optimization pipeline
// Improvement #37: Optimize chunk splitting

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Image optimization settings
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  turbopack: {
    root: process.cwd(),
  },
  // Improvement #37: Experimental optimizations
  experimental: {
    optimizeCss: false, // Disable for now — requires critters
  },
  // Compression
  compress: true,
  // PoweredBy header removal for security
  poweredByHeader: false,
  // Generate ETags for caching
  generateEtags: true,
  // Static asset caching headers
  headers: async () => [
    {
      source: '/_next/static/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/images/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
      ],
    },
    {
      source: '/icons/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=2592000, immutable' },
      ],
    },
  ],
};

// Sentry build-time wrapper. Source-map upload only runs when
// SENTRY_AUTH_TOKEN (+ org/project) are set — none are configured here, so the
// build stays a no-op until an auth token is provisioned. Runtime error
// reporting is gated separately on SENTRY_DSN / NEXT_PUBLIC_SENTRY_DSN via the
// instrumentation files.
export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  // Tree-shake Sentry's debug logging out of production bundles.
  webpack: { treeshake: { removeDebugLogging: true } },
  telemetry: false,
});
