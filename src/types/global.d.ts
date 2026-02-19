/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    dataLayer: Array<Record<string, any>>;
    gtag: (...args: any[]) => void;
  }
}

export {};
