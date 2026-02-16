'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const companies = [
  'TechCorp',
  'DataFlow',
  'NeuralEdge',
  'CloudMind',
  'ScaleAI',
  'DeepLogic',
  'VisionAI',
  'SynthLabs',
  'QuantumByte',
  'IntelliCore',
  'NexusML',
  'CoreData',
];

interface CompanyLogoProps {
  name: string;
}

function CompanyLogo({ name }: CompanyLogoProps) {
  return (
    <div className="flex shrink-0 items-center justify-center px-8">
      <span className="text-2xl font-semibold whitespace-nowrap text-slate-200 dark:text-slate-700">
        {name}
      </span>
    </div>
  );
}

export function SocialProofMarquee() {
  return (
    <section className="border-y border-slate-100 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-8 text-center">
        <p className="text-sm font-medium tracking-wider text-slate-500 uppercase">
          Trusted by Industry Leaders
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Top Row - Scroll Left */}
        <div className="mb-8 flex">
          <div className="animate-marquee flex shrink-0 hover:[animation-play-state:paused]">
            {companies.map((company, i) => (
              <CompanyLogo key={`top-1-${i}`} name={company} />
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div
            className="animate-marquee flex shrink-0 hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {companies.map((company, i) => (
              <CompanyLogo key={`top-2-${i}`} name={company} />
            ))}
          </div>
        </div>

        {/* Bottom Row - Scroll Right */}
        <div className="flex">
          <div className="animate-marquee-reverse flex shrink-0 hover:[animation-play-state:paused]">
            {companies
              .slice()
              .reverse()
              .map((company, i) => (
                <CompanyLogo key={`bottom-1-${i}`} name={company} />
              ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div
            className="animate-marquee-reverse flex shrink-0 hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {companies
              .slice()
              .reverse()
              .map((company, i) => (
                <CompanyLogo key={`bottom-2-${i}`} name={company} />
              ))}
          </div>
        </div>

        {/* Gradient Overlays for smooth fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent dark:from-slate-900" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent dark:from-slate-900" />
      </div>
    </section>
  );
}
