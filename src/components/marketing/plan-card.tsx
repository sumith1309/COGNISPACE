'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { PricingPlan, BillingPeriod } from '@/lib/pricing-data';

interface PlanCardProps {
  plan: PricingPlan;
  billingPeriod: BillingPeriod;
  index: number;
  onContactSales?: () => void;
}

export function PlanCard({ plan, billingPeriod, index, onContactSales }: PlanCardProps) {
  const isPro = plan.id === 'pro';
  const isEnterprise = plan.id === 'enterprise';
  const isStarter = plan.id === 'starter';

  const checkColor = isPro ? 'text-brand-500' : isEnterprise ? 'text-violet-500' : 'text-slate-400';

  const price =
    plan.monthlyPrice !== null
      ? billingPeriod === 'monthly'
        ? plan.monthlyPrice
        : plan.annualPrice
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{ y: -2 }}
      className={cn('relative flex flex-col', isPro && 'lg:-mt-4')}
    >
      {/* Most Popular Badge */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2">
          <span className="bg-brand-500 inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold text-white shadow-sm">
            {plan.badge}
          </span>
        </div>
      )}

      <div
        className={cn(
          'flex flex-1 flex-col rounded-2xl border bg-white p-8 transition-shadow duration-200',
          isPro && 'border-brand-200 border-2 shadow-[0_0_40px_rgba(59,130,246,0.08)] lg:pt-10',
          isEnterprise && 'bg-gradient-to-b from-white to-slate-50',
          isStarter && 'border-slate-200',
          !isPro && !isEnterprise && 'border-slate-200',
          'hover:shadow-lg'
        )}
      >
        {/* Plan Name */}
        <p className="text-lg font-semibold text-slate-900">{plan.name}</p>

        {/* Price */}
        <div className="mt-4 flex items-baseline">
          {price !== null ? (
            <>
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${plan.id}-${billingPeriod}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="text-5xl font-bold text-slate-900"
                >
                  {billingPeriod === 'annual' && plan.monthlyPrice !== plan.annualPrice && (
                    <span className="mr-2 text-2xl font-medium text-slate-300 line-through">
                      ${plan.monthlyPrice}
                    </span>
                  )}
                  ${price}
                </motion.span>
              </AnimatePresence>
              <span className="ml-1 text-base text-slate-400">/month</span>
            </>
          ) : (
            <span className="text-5xl font-bold text-slate-900">Custom</span>
          )}
        </div>

        {/* Description */}
        <p className="mt-2 text-sm text-slate-500">{plan.description}</p>

        {/* CTA Button */}
        <div className="mt-6">
          {isEnterprise ? (
            <Button
              variant="outline"
              className="w-full border-violet-200 text-violet-600 hover:bg-violet-50 hover:text-violet-700"
              onClick={onContactSales}
            >
              {plan.cta.text}
            </Button>
          ) : isPro ? (
            <Button asChild className="w-full" variant="primary">
              <Link href={(plan.cta.href || '/auth/signup') as '/'}>{plan.cta.text}</Link>
            </Button>
          ) : (
            <Button asChild variant="outline" className="w-full">
              <Link href={(plan.cta.href || '/auth/signup') as '/'}>{plan.cta.text}</Link>
            </Button>
          )}
        </div>

        {/* Features */}
        <ul className="mt-8 flex-1 space-y-3">
          {plan.features.map((feature, i) =>
            feature.highlighted ? (
              <li key={i} className="mb-3 text-sm font-semibold text-slate-700">
                {feature.name}
              </li>
            ) : (
              <li key={i} className="flex items-start gap-3">
                <Check className={cn('mt-0.5 h-4 w-4 shrink-0', checkColor)} />
                <span className="text-sm text-slate-600">{feature.name}</span>
              </li>
            )
          )}
        </ul>
      </div>
    </motion.div>
  );
}
