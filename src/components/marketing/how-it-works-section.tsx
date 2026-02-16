'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plug, Wand2, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StepProps {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  index: number;
}

function ProcessStep({ number, icon: Icon, title, description, index }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="relative z-10 flex flex-col items-center text-center"
    >
      {/* Number Badge */}
      <div className="border-brand-500 text-brand-500 mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white text-sm font-bold dark:bg-slate-900">
        {number}
      </div>

      {/* Icon Card */}
      <div
        className={cn(
          'mb-4 flex h-16 w-16 items-center justify-center rounded-xl',
          index === 0 &&
            'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900',
          index === 1 &&
            'bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900',
          index === 2 &&
            'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900'
        )}
      >
        <Icon
          className={cn(
            'h-8 w-8',
            index === 0 && 'text-blue-500',
            index === 1 && 'text-violet-500',
            index === 2 && 'text-emerald-500'
          )}
        />
      </div>

      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-3 max-w-sm text-base leading-relaxed text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}

export function HowItWorksSection() {
  const lineRef = useRef<SVGLineElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !lineRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const steps: Omit<StepProps, 'index'>[] = [
    {
      number: '01',
      icon: Plug,
      title: 'Connect',
      description:
        "Install our SDK, add your API key, and you're ready to go. Works with any framework, any language.",
    },
    {
      number: '02',
      icon: Wand2,
      title: 'Build',
      description:
        'Access our model catalog, prototype in the playground, and integrate inference into your product with type-safe APIs.',
    },
    {
      number: '03',
      icon: TrendingUp,
      title: 'Scale',
      description:
        'Monitor performance in real-time, optimize costs with usage analytics, and scale automatically to meet demand.',
    },
  ];

  return (
    <section className="bg-[#F8FAFF] py-24 lg:py-32 dark:bg-slate-950">
      <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center"
        >
          <span className="text-brand-500 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase dark:bg-blue-950">
            How It Works
          </span>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            From idea to production in three steps
          </h2>
        </motion.div>

        <div className="relative mt-20">
          {/* Desktop: Horizontal connecting line */}
          <svg
            className="absolute top-6 right-0 left-0 hidden h-0.5 w-full lg:block"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              ref={lineRef}
              x1="20%"
              y1="0"
              x2="80%"
              y2="0"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="8 4"
            />
          </svg>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {steps.map((step, index) => (
              <ProcessStep key={index} {...step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
