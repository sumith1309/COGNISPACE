'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlanCard } from './plan-card';
import { EnterpriseModal } from './enterprise-modal';
import { PRICING_PLANS } from '@/lib/pricing-data';

export function PricingSections({ children }: { children?: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* ─── Section 1: Page Header ─── */}
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl dark:text-white"
          >
            Transparent project pricing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="mt-4 text-lg text-slate-500 dark:text-slate-400"
          >
            Choose the engagement model that fits your project. Every tier includes full IP
            ownership and production-ready delivery.
          </motion.p>
        </div>
      </section>

      {/* ─── Section 2: Plan Cards ─── */}
      <section className="pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:mx-auto md:max-w-md lg:max-w-none lg:grid-cols-3">
            {PRICING_PLANS.map((plan, index) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                index={index}
                onContactSales={() => setModalOpen(true)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Enterprise Modal ─── */}
      <EnterpriseModal open={modalOpen} onOpenChange={setModalOpen} />

      {/* ─── Slotted sections (calculator, comparison, FAQ) ─── */}
      {children}

      {/* ─── Bottom CTA ─── */}
      <section className="bg-white py-16 dark:bg-slate-900">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Still have questions?
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Our team is here to help you find the right engagement model for your project.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Button onClick={() => setModalOpen(true)}>Talk to Us</Button>
              <Button variant="ghost" asChild>
                <Link href="/contact">Schedule a Call</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
