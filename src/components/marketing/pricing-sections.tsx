'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PricingToggle } from './pricing-toggle';
import { PlanCard } from './plan-card';
import { EnterpriseModal } from './enterprise-modal';
import { PRICING_PLANS } from '@/lib/pricing-data';
import type { BillingPeriod } from '@/lib/pricing-data';

/**
 * Client wrapper that holds billing toggle state shared between
 * the page header and the plan cards. Accepts children to render
 * between the plan cards and the bottom CTA.
 */
export function PricingSections({ children }: { children?: React.ReactNode }) {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
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
            className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl"
          >
            Simple, transparent pricing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="mt-4 text-lg text-slate-500"
          >
            Start free, scale as you grow. No hidden fees, no surprises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="mt-8 flex justify-center"
          >
            <PricingToggle value={billingPeriod} onChange={setBillingPeriod} />
          </motion.div>
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
                billingPeriod={billingPeriod}
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

      {/* ─── Section 7: Bottom CTA ─── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <h2 className="text-2xl font-bold text-slate-900">Still have questions?</h2>
            <p className="mt-2 text-slate-500">
              Our team is here to help you find the right plan for your needs.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Button onClick={() => setModalOpen(true)}>Talk to Sales</Button>
              <Button variant="ghost" asChild>
                <Link href={'/docs' as '/'}>Read the Docs</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
