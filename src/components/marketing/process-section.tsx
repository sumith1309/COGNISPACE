'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Compass, PenTool, Hammer, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PhaseProps {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  duration: string;
  description: string;
  deliverables: string;
  index: number;
}

function PhaseCard({
  number,
  icon: Icon,
  title,
  duration,
  description,
  deliverables,
  index,
}: PhaseProps) {
  const colors = [
    { bg: 'from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900', icon: 'text-blue-500' },
    {
      bg: 'from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900',
      icon: 'text-violet-500',
    },
    {
      bg: 'from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900',
      icon: 'text-emerald-500',
    },
    {
      bg: 'from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900',
      icon: 'text-amber-500',
    },
  ];

  const color = colors[index] ?? colors[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{ y: -4 }}
      className="relative rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Phase Number Watermark */}
      <span className="pointer-events-none absolute top-4 right-4 text-6xl font-bold text-slate-100 select-none dark:text-slate-800">
        {number}
      </span>

      {/* Duration Pill */}
      <div className="mb-4">
        <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          {duration}
        </span>
      </div>

      {/* Icon */}
      <div
        className={cn(
          'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br',
          color?.bg
        )}
      >
        <Icon className={cn('h-6 w-6', color?.icon)} />
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {description}
      </p>

      {/* Deliverables */}
      <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
        <p className="text-xs font-medium tracking-wider text-slate-400 uppercase dark:text-slate-500">
          Key deliverables
        </p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{deliverables}</p>
      </div>
    </motion.div>
  );
}

export function ProcessSection() {
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

  const phases: Omit<PhaseProps, 'index'>[] = [
    {
      number: '01',
      icon: Compass,
      title: 'Discover',
      duration: 'Week 1\u20132',
      description:
        'Deep dive into your business, users, and goals. We map the problem space, identify AI opportunities, and define the product vision together.',
      deliverables: 'Strategy brief, Technical architecture, Project roadmap',
    },
    {
      number: '02',
      icon: PenTool,
      title: 'Design',
      duration: 'Week 2\u20134',
      description:
        'We craft the user experience and interface design. Every screen, every interaction, every micro-animation \u2014 designed to delight your users.',
      deliverables: 'Wireframes, UI/UX design system, Interactive prototype',
    },
    {
      number: '03',
      icon: Hammer,
      title: 'Build',
      duration: 'Week 4\u201312+',
      description:
        'Our engineers bring the design to life with clean, scalable code. AI models are trained, APIs are built, and the product takes shape with weekly demos.',
      deliverables: 'Working software, AI/ML models, API documentation',
    },
    {
      number: '04',
      icon: Rocket,
      title: 'Launch & Evolve',
      duration: 'Ongoing',
      description:
        'We deploy to production, monitor performance, and continuously improve. Your product evolves with your business and with advances in AI.',
      deliverables: 'Production deployment, Analytics dashboard, Ongoing support',
    },
  ];

  return (
    <section className="bg-white py-24 lg:py-32 dark:bg-slate-900">
      <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center"
        >
          <span className="text-brand-500 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase dark:bg-blue-950">
            Our Process
          </span>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            From idea to production in four phases
          </h2>
        </motion.div>

        <div className="relative mt-16">
          {/* Desktop: Horizontal connecting line */}
          <svg
            className="absolute top-24 right-0 left-0 hidden h-0.5 w-full lg:block"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              ref={lineRef}
              x1="10%"
              y1="0"
              x2="90%"
              y2="0"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="8 4"
            />
          </svg>

          {/* Phase Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {phases.map((phase, index) => (
              <PhaseCard key={index} {...phase} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
