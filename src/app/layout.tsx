import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';
import CookieConsent from '@/components/ui/CookieConsent';
import ExitIntentPopup from '@/components/ui/ExitIntentPopup';
import ServiceWorkerRegistration from '@/components/ui/ServiceWorkerRegistration';
import { websiteJsonLd, organizationJsonLd } from '@/lib/jsonld';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://robonorth.ca'),
  title: {
    default: 'RoboNorth — Canada\'s Humanoid Robot Marketplace',
    template: '%s | RoboNorth',
  },
  description: 'Browse, compare, and pre-order humanoid robots from the world\'s leading manufacturers. Canada\'s first dedicated humanoid robot marketplace. 22+ models from $5,900 to enterprise-grade systems.',
  keywords: ['humanoid robot', 'buy robot Canada', 'humanoid robot for sale', 'robot marketplace', 'Tesla Optimus Canada', 'Unitree G1', '1X NEO', 'robot parts Canada', 'compare robots', 'Sanctuary AI'],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'RoboNorth',
    title: 'RoboNorth — Canada\'s Humanoid Robot Marketplace',
    description: 'Browse, compare, and pre-order humanoid robots from the world\'s leading manufacturers. 22+ models available.',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'RoboNorth — Canada\'s Humanoid Robot Marketplace' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RoboNorth — Canada\'s Humanoid Robot Marketplace',
    description: 'Browse, compare, and pre-order humanoid robots. Canada\'s first dedicated robot marketplace.',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://robonorth.ca',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        {/* Dark mode anti-flash script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('robonorth-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <meta name="theme-color" content="#2563EB" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        {/* GA4 Placeholder — replace G-XXXXXXXXXX with real measurement ID */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', { send_page_view: true });

              // UTM parameter handling
              (function() {
                try {
                  var params = new URLSearchParams(window.location.search);
                  var utmKeys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
                  var utmData = {};
                  var hasUtm = false;
                  utmKeys.forEach(function(key) {
                    var val = params.get(key);
                    if (val) { utmData[key] = val; hasUtm = true; }
                  });
                  if (hasUtm) {
                    sessionStorage.setItem('robonorth-utm', JSON.stringify(utmData));
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <Header />
        <main className="flex-1" style={{ animationDuration: '300ms' }}>
          {children}
        </main>
        <Footer />
        <BackToTop />
        <CookieConsent />
        <ExitIntentPopup />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
