'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Stethoscope, Landmark, ShoppingBag, GraduationCap, Truck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IndustryCardProps {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  description: string;
  href: string;
  colorClasses: {
    bg: string;
    icon: string;
  };
  index: number;
}

function IndustryCard({
  icon: Icon,
  name,
  description,
  href,
  colorClasses,
  index,
}: IndustryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <div
        className={cn(
          'inline-flex h-12 w-12 items-center justify-center rounded-xl',
          colorClasses.bg
        )}
      >
        <Icon className={cn('h-6 w-6', colorClasses.icon)} />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {description}
      </p>

      <Link
        href={href as '/'}
        className="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 mt-4 inline-flex items-center text-sm font-medium transition-colors"
      >
        Learn more
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}

const industries: Omit<IndustryCardProps, 'index'>[] = [
  {
    icon: Stethoscope,
    name: 'Healthcare',
    description:
      'AI-powered diagnostics, patient engagement platforms, clinical workflow automation, and HIPAA-compliant data systems.',
    href: '/work?category=healthcare',
    colorClasses: {
      bg: 'bg-emerald-50 dark:bg-emerald-950',
      icon: 'text-emerald-500',
    },
  },
  {
    icon: Landmark,
    name: 'Finance',
    description:
      'Fraud detection, risk assessment, algorithmic trading tools, and intelligent financial advisory platforms.',
    href: '/work?category=finance',
    colorClasses: {
      bg: 'bg-blue-50 dark:bg-blue-950',
      icon: 'text-blue-500',
    },
  },
  {
    icon: ShoppingBag,
    name: 'E-commerce',
    description:
      'Personalized recommendation engines, dynamic pricing, inventory forecasting, and conversational commerce.',
    href: '/work?category=retail',
    colorClasses: {
      bg: 'bg-amber-50 dark:bg-amber-950',
      icon: 'text-amber-500',
    },
  },
  {
    icon: GraduationCap,
    name: 'Education',
    description:
      'Adaptive learning platforms, AI tutoring systems, automated grading, and student performance analytics.',
    href: '/work?category=education',
    colorClasses: {
      bg: 'bg-cyan-50 dark:bg-cyan-950',
      icon: 'text-cyan-500',
    },
  },
  {
    icon: Truck,
    name: 'Logistics',
    description:
      'Route optimization, demand forecasting, warehouse automation, and supply chain intelligence.',
    href: '/work?category=logistics',
    colorClasses: {
      bg: 'bg-orange-50 dark:bg-orange-950',
      icon: 'text-orange-500',
    },
  },
];

export function IndustriesSection() {
  return (
    <section className="bg-[#F8FAFF] py-24 lg:py-32 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center"
        >
          <span className="text-brand-500 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase dark:bg-blue-950">
            Industries
          </span>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            AI solutions for every industry
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
            We&apos;ve built intelligent software across diverse sectors. Here&apos;s where we
            create the most impact.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <IndustryCard key={index} {...industry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
