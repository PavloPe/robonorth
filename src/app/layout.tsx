import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { websiteJsonLd, organizationJsonLd } from '@/lib/jsonld';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-white text-gray-900 min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <Header />
        <main className="flex-1 animate-fade-in-up" style={{ animationDuration: '300ms' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
