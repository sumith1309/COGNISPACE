'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { HeroContent } from './hero-content';

// CRITICAL: Dynamic import with SSR disabled for Three.js
const HeroScene = dynamic(
  () => import('./hero-scene').then((mod) => ({ default: mod.HeroScene })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#F8FAFF] to-white dark:from-slate-900 dark:to-slate-950" />
    ),
  }
);

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8FAFF] to-white dark:from-slate-900 dark:to-slate-950">
      {/* 3D Scene Background */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Content Overlay */}
      <HeroContent />
    </section>
  );
}
