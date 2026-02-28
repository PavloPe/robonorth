'use client';

import dynamic from 'next/dynamic';

// Lazy-load non-critical UI widgets to reduce initial JS bundle size.
// These components are interactive but not needed for first paint or SEO.
const BackToTop = dynamic(() => import('@/components/ui/BackToTop'));
const CookieConsent = dynamic(() => import('@/components/ui/CookieConsent'));
const ExitIntentPopup = dynamic(() => import('@/components/ui/ExitIntentPopup'));
const ServiceWorkerRegistration = dynamic(() => import('@/components/ui/ServiceWorkerRegistration'));
const InquiryBasketDrawer = dynamic(() => import('@/components/ui/InquiryBasketDrawer'));
const LiveChatWidget = dynamic(() => import('@/components/ui/LiveChatWidget'));
const WebVitals = dynamic(() => import('@/components/ui/WebVitals'));

export default function ClientShell() {
  return (
    <>
      <BackToTop />
      <CookieConsent />
      <ExitIntentPopup />
      <LiveChatWidget />
      <InquiryBasketDrawer />
      <WebVitals />
      <ServiceWorkerRegistration />
    </>
  );
}
