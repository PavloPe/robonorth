import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'RoboNorth — Canada\'s Humanoid Robot Marketplace',
    template: '%s | RoboNorth',
  },
  description: 'Browse, compare, and pre-order humanoid robots from the world\'s leading manufacturers. Canada\'s first dedicated humanoid robot marketplace. From $5,900 to enterprise-grade systems.',
  keywords: ['humanoid robot', 'buy robot Canada', 'humanoid robot for sale', 'robot marketplace', 'Tesla Optimus', 'Unitree', '1X NEO', 'robot parts Canada'],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'RoboNorth',
    title: 'RoboNorth — Canada\'s Humanoid Robot Marketplace',
    description: 'Browse, compare, and pre-order humanoid robots from the world\'s leading manufacturers.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-white text-gray-900 min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
