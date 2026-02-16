'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTABannerSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-50 py-24 lg:py-32 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Ready to build the future?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Start building with Cognispace for free. No credit card required. Join thousands of
            developers shipping AI-powered products.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="group">
              <Link href="/auth/signup">
                Start Building Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Free tier includes 1,000 API calls per month
          </p>
        </motion.div>
      </div>

      {/* Decorative blur elements */}
      <div
        className="pointer-events-none absolute top-1/2 -left-48 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-200/20 blur-3xl dark:bg-blue-500/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-48 h-96 w-96 -translate-y-1/2 rounded-full bg-violet-200/20 blur-3xl dark:bg-violet-500/10"
        aria-hidden="true"
      />
    </section>
  );
}
