'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedHeadline } from './animated-headline';
import { cn } from '@/lib/utils';

export function HeroContent() {
  const companies = ['TechCorp', 'DataFlow', 'NeuralEdge', 'CloudMind', 'ScaleAI', 'DeepLogic'];

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
            Introducing Cognispace AI Platform
          </span>
        </motion.div>

        {/* Animated Headline */}
        <AnimatedHeadline
          text="Build intelligent products that think, adapt, and scale"
          highlightWords={['intelligent', 'products']}
        />

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300"
        >
          Cognispace partners with modern teams to design, ship, and evolve AI-native tools and
          infrastructure — from prototype to production.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button asChild size="lg" className="group">
            <Link href="/auth/signup">
              Start Building
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="#demo">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Link>
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
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {companies.map((company, index) => (
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
