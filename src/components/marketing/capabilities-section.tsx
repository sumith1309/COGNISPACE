'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lightbulb, Code, Brain, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CapabilityCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
  index: number;
}

function CapabilityCard({ icon: Icon, title, description, href, index }: CapabilityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group relative rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg lg:p-10 dark:border-slate-800 dark:bg-slate-900"
    >
      <div
        className={cn(
          'inline-flex h-14 w-14 items-center justify-center rounded-xl',
          index === 0 &&
            'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900',
          index === 1 &&
            'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900',
          index === 2 &&
            'bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900'
        )}
      >
        <Icon
          className={cn(
            'h-7 w-7',
            index === 0 && 'text-amber-500',
            index === 1 && 'text-blue-500',
            index === 2 && 'text-violet-500'
          )}
        />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-slate-500 dark:text-slate-400">
        {description}
      </p>

      <Link
        href={href as '/'}
        className="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 mt-6 inline-flex items-center text-sm font-medium transition-colors"
      >
        Learn more
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}

export function CapabilitiesSection() {
  const capabilities: Omit<CapabilityCardProps, 'index'>[] = [
    {
      icon: Lightbulb,
      title: 'AI Strategy & Consulting',
      description:
        'We help you identify where AI creates real business value. Our team evaluates your workflows, data, and goals to design an AI strategy that delivers measurable ROI \u2014 not just hype.',
      href: '/solutions#strategy',
    },
    {
      icon: Code,
      title: 'Custom Software Development',
      description:
        'We design and build production-grade software products from scratch. Modern tech stacks, clean architecture, beautiful interfaces, and AI capabilities baked in from day one.',
      href: '/solutions#development',
    },
    {
      icon: Brain,
      title: 'AI/ML Engineering',
      description:
        'From fine-tuning language models to building computer vision pipelines, our ML engineers turn cutting-edge research into reliable production systems that scale.',
      href: '/solutions#engineering',
    },
  ];

  return (
    <section className="bg-white py-24 lg:py-32 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center"
        >
          <span className="text-brand-500 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase dark:bg-blue-950">
            What We Do
          </span>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            End-to-end AI software development
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
            From strategy to deployment, we handle every aspect of building intelligent software
            products.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {capabilities.map((capability, index) => (
            <CapabilityCard key={index} {...capability} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
