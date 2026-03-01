'use client';

import React from 'react';

const capabilitiesRow = [
  'Custom AI Solutions',
  'Full-Stack Development',
  'Machine Learning',
  'Product Design',
  'Cloud Infrastructure',
  'Data Engineering',
  'NLP & Computer Vision',
];

const industriesRow = [
  'Healthcare',
  'Finance',
  'Legal',
  'E-commerce',
  'Education',
  'Logistics',
  'Real Estate',
  'Enterprise SaaS',
];

function MarqueeItem({ text }: { text: string }) {
  return (
    <div className="flex shrink-0 items-center gap-6 px-4">
      <span className="text-2xl font-semibold whitespace-nowrap text-slate-200 dark:text-slate-700">
        {text}
      </span>
      <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
        •
      </span>
    </div>
  );
}

export function SocialProofMarquee() {
  return (
    <section className="border-y border-slate-100 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-8 text-center">
        <p className="text-sm font-medium tracking-wider text-slate-500 uppercase">
          What We Bring to the Table
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Top Row - Capabilities */}
        <div className="mb-8 flex">
          <div className="animate-marquee flex shrink-0 hover:[animation-play-state:paused]">
            {capabilitiesRow.map((item, i) => (
              <MarqueeItem key={`top-1-${i}`} text={item} />
            ))}
          </div>
          <div
            className="animate-marquee flex shrink-0 hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {capabilitiesRow.map((item, i) => (
              <MarqueeItem key={`top-2-${i}`} text={item} />
            ))}
          </div>
        </div>

        {/* Bottom Row - Industries */}
        <div className="flex">
          <div className="animate-marquee-reverse flex shrink-0 hover:[animation-play-state:paused]">
            {industriesRow.map((item, i) => (
              <MarqueeItem key={`bottom-1-${i}`} text={item} />
            ))}
          </div>
          <div
            className="animate-marquee-reverse flex shrink-0 hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {industriesRow.map((item, i) => (
              <MarqueeItem key={`bottom-2-${i}`} text={item} />
            ))}
          </div>
        </div>

        {/* Gradient Overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent dark:from-slate-900" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent dark:from-slate-900" />
      </div>
    </section>
  );
}
