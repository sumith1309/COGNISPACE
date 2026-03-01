'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedHeadline } from './animated-headline';

export function HeroContent() {
  const companies = [
    'MedTech Solutions',
    'FinanceFlow',
    'LegalMind AI',
    'RetailGenius',
    'EduSpark',
    'LogiChain',
  ];

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-slate-900/80"
        >
          <div className="bg-brand-500 h-2 w-2 animate-pulse rounded-full" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            AI-Powered Software, Built for You
          </span>
        </motion.div>

        {/* Animated Headline */}
        <AnimatedHeadline
          text="We build intelligent software that transforms your business"
          highlightWords={['intelligent', 'software']}
        />

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300"
        >
          Cognispace is a technology studio that partners with forward-thinking companies to design,
          build, and ship AI-native software products — from concept to production.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button asChild size="lg" className="group">
            <Link href="/contact">
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/work">See Our Work</Link>
          </Button>
        </motion.div>

        {/* Trusted By Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-16"
        >
          <p className="mb-6 text-sm font-medium text-slate-500 dark:text-slate-400">
            Trusted by teams across healthcare, finance, legal, and technology
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {companies.map((company) => (
              <div
                key={company}
                className="flex h-12 items-center justify-center rounded-lg bg-slate-100 px-6 opacity-40 transition-opacity hover:opacity-60 dark:bg-slate-800"
              >
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-400">Scroll to explore</span>
          <ChevronDown className="h-5 w-5 text-slate-400" />
        </motion.div>
      </motion.div>
    </div>
  );
}
