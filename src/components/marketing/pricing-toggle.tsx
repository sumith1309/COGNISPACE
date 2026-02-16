'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { BillingPeriod } from '@/lib/pricing-data';

interface PricingToggleProps {
  value: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
}

const options: { value: BillingPeriod; label: string }[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'annual', label: 'Annual' },
];

export function PricingToggle({ value, onChange }: PricingToggleProps) {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="relative inline-flex rounded-full bg-slate-100 p-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200',
              value === option.value ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
            )}
          >
            {option.label}
            {value === option.value && (
              <motion.div
                layoutId="pricing-toggle-indicator"
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                style={{ zIndex: -1 }}
                transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {value === 'annual' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5, x: -8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: -8 }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.5 }}
            className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600"
          >
            Save 20%
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
