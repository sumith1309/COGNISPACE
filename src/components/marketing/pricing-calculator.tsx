'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import {
  COMPLEXITY_STEPS,
  AI_FEATURE_STEPS,
  TIMELINE_STEPS,
  calculateProjectEstimate,
} from '@/lib/pricing-data';

/* ─── Slider Component ─── */

interface SliderProps {
  label: string;
  value: number;
  displayValue: string;
  min: number;
  max: number;
  step?: number;
  fillPercent: number;
  onChange: (value: number) => void;
}

function Slider({
  label,
  value,
  displayValue,
  min,
  max,
  step = 1,
  fillPercent,
  onChange,
}: SliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {displayValue}
        </span>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute top-1/2 h-2 w-full -translate-y-1/2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="from-brand-500 h-full rounded-full bg-gradient-to-r to-violet-500 transition-[width] duration-75"
            style={{ width: `${fillPercent}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="pricing-slider relative z-10 w-full cursor-pointer appearance-none bg-transparent"
        />
      </div>
    </div>
  );
}

/* ─── Main Calculator ─── */

export function PricingCalculator() {
  const [complexityIdx, setComplexityIdx] = useState(1);
  const [aiIdx, setAiIdx] = useState(1);
  const [timelineIdx, setTimelineIdx] = useState(1);

  const complexity = COMPLEXITY_STEPS[complexityIdx] ?? COMPLEXITY_STEPS[0]!;
  const aiFeatures = AI_FEATURE_STEPS[aiIdx] ?? AI_FEATURE_STEPS[0]!;
  const timeline = TIMELINE_STEPS[timelineIdx] ?? TIMELINE_STEPS[0]!;

  const estimate = useMemo(
    () => calculateProjectEstimate(complexity.value, aiFeatures.value, timeline.value),
    [complexity.value, aiFeatures.value, timeline.value]
  );

  const tierLabel =
    estimate.tier === 'starter'
      ? 'Starter Project'
      : estimate.tier === 'growth'
        ? 'Growth'
        : 'Enterprise';

  return (
    <section className="border-y border-slate-100 bg-[#F8FAFF] py-24 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center"
        >
          <span className="text-brand-500 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase dark:bg-blue-950">
            Estimate Your Project
          </span>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Get a rough project estimate
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
            Adjust the sliders to match your project needs and see an estimated range.
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mx-auto mt-12 max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="space-y-8">
            {/* Slider 1: Project Complexity */}
            <Slider
              label="Project Complexity"
              value={complexityIdx}
              displayValue={complexity.label}
              min={0}
              max={COMPLEXITY_STEPS.length - 1}
              step={1}
              fillPercent={(complexityIdx / (COMPLEXITY_STEPS.length - 1)) * 100}
              onChange={setComplexityIdx}
            />

            {/* Slider 2: AI Features */}
            <Slider
              label="AI Features"
              value={aiIdx}
              displayValue={aiFeatures.label}
              min={0}
              max={AI_FEATURE_STEPS.length - 1}
              step={1}
              fillPercent={(aiIdx / (AI_FEATURE_STEPS.length - 1)) * 100}
              onChange={setAiIdx}
            />

            {/* Slider 3: Timeline */}
            <Slider
              label="Timeline"
              value={timelineIdx}
              displayValue={timeline.label}
              min={0}
              max={TIMELINE_STEPS.length - 1}
              step={1}
              fillPercent={(timelineIdx / (TIMELINE_STEPS.length - 1)) * 100}
              onChange={setTimelineIdx}
            />
          </div>

          {/* Cost Display */}
          <div className="mt-8 rounded-xl bg-gradient-to-r from-blue-50 to-violet-50 p-6 dark:from-blue-950/30 dark:to-violet-950/30">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Estimated Project Range
              </span>
              <motion.span
                key={`${estimate.lowRange}-${estimate.highRange}`}
                initial={{ scale: 0.95, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="gradient-text text-3xl font-bold sm:text-4xl"
              >
                {formatCurrency(estimate.lowRange)} &ndash; {formatCurrency(estimate.highRange)}
              </motion.span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Recommended tier</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{tierLabel}</span>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400 inline-flex items-center gap-1 text-sm font-medium transition-colors"
                >
                  Get an accurate quote
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
            This is a rough estimate. Contact us for an accurate quote based on your specific
            requirements.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
