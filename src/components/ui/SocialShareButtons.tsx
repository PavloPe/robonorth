'use client';

import { useState } from 'react';

interface Props {
  title: string;
  variant?: 'horizontal' | 'vertical';
}

export default function SocialShareButtons({ title, variant = 'horizontal' }: Props) {
  const [copied, setCopied] = useState(false);

  const share = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = `${title} — RoboNorth`;
    const urls: Record<string, string> = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const buttons = [
    { name: 'LinkedIn', icon: '💼', action: () => share('linkedin') },
    { name: 'X / Twitter', icon: '𝕏', action: () => share('twitter') },
    { name: 'Facebook', icon: '📘', action: () => share('facebook') },
    { name: 'Reddit', icon: '🤖', action: () => share('reddit') },
    { name: copied ? 'Copied!' : 'Copy Link', icon: copied ? '✅' : '🔗', action: copyLink },
  ];

  return (
    <div className={`flex ${variant === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'} gap-2`}>
      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 self-center mr-1">Share:</span>
      {buttons.map(btn => (
        <button
          key={btn.name}
          onClick={btn.action}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
          title={btn.name}
        >
          <span>{btn.icon}</span>
          {btn.name}
        </button>
      ))}
    </div>
  );
}
