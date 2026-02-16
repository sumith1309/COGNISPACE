'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { API_CALL_STEPS, TOKEN_STEPS, calculateEstimate } from '@/lib/pricing-data';

/* ─── Helpers ─── */

function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}K`;
  return n.toString();
}

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
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 font-mono text-sm font-semibold text-slate-700">
          {displayValue}
        </span>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute top-1/2 h-2 w-full -translate-y-1/2 overflow-hidden rounded-full bg-slate-200">
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
  const [apiCallsIdx, setApiCallsIdx] = useState(3); // 25K default
  const [tokensIdx, setTokensIdx] = useState(3); // 1000 default
  const [teamMembers, setTeamMembers] = useState(3);

  const apiCalls = API_CALL_STEPS[apiCallsIdx] ?? 1_000;
  const tokensPerRequest = TOKEN_STEPS[tokensIdx] ?? 100;

  const estimate = useMemo(
    () => calculateEstimate(apiCalls, tokensPerRequest, teamMembers),
    [apiCalls, tokensPerRequest, teamMembers]
  );

  const isFree = estimate.total === 0;

  return (
    <section className="border-y border-slate-100 bg-[#F8FAFF] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center"
        >
          <span className="text-brand-500 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase">
            Estimate Your Cost
          </span>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            See exactly what you&apos;ll pay
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
            Adjust the sliders to match your expected usage and find the right plan.
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mx-auto mt-12 max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10"
        >
          <div className="space-y-8">
            {/* Slider 1: API Calls */}
            <Slider
              label="Monthly API Calls"
              value={apiCallsIdx}
              displayValue={formatCompact(apiCalls)}
              min={0}
              max={API_CALL_STEPS.length - 1}
              step={1}
              fillPercent={(apiCallsIdx / (API_CALL_STEPS.length - 1)) * 100}
              onChange={setApiCallsIdx}
            />

            {/* Slider 2: Tokens per Request */}
            <Slider
              label="Avg. Tokens per Request"
              value={tokensIdx}
              displayValue={formatNumber(tokensPerRequest)}
              min={0}
              max={TOKEN_STEPS.length - 1}
              step={1}
              fillPercent={(tokensIdx / (TOKEN_STEPS.length - 1)) * 100}
              onChange={setTokensIdx}
            />

            {/* Slider 3: Team Members */}
            <Slider
              label="Team Members"
              value={teamMembers}
              displayValue={teamMembers.toString()}
              min={1}
              max={100}
              step={1}
              fillPercent={((teamMembers - 1) / 99) * 100}
              onChange={setTeamMembers}
            />
          </div>

          {/* Cost Display */}
          <div className="mt-8 rounded-xl bg-gradient-to-r from-blue-50 to-violet-50 p-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <span className="text-sm font-medium text-slate-600">Estimated Monthly Cost</span>
              <motion.span
                key={estimate.total}
                initial={{ scale: 0.95, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="gradient-text text-4xl font-bold"
              >
                {isFree ? '$0' : formatCurrency(estimate.total)}
              </motion.span>
            </div>

            {/* Breakdown */}
            <div className="mt-4 space-y-1">
              <AnimatePresence mode="sync">
                {isFree && (
                  <motion.div
                    key="free-msg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 text-sm text-emerald-600"
                  >
                    <Check className="h-4 w-4" />
                    You&apos;re covered by the free Starter plan!
                  </motion.div>
                )}

                {!isFree && (
                  <motion.div
                    key="base"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex justify-between text-sm text-slate-500"
                  >
                    <span>Base plan (Pro)</span>
                    <span>{formatCurrency(estimate.baseCost)}</span>
                  </motion.div>
                )}

                {estimate.tokenOverage > 0 && (
                  <motion.div
                    key="token"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex justify-between text-sm text-slate-500"
                  >
                    <span>Token overage</span>
                    <span>{formatCurrency(estimate.tokenOverage)}</span>
                  </motion.div>
                )}

                {estimate.seatOverage > 0 && (
                  <motion.div
                    key="seats"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex justify-between text-sm text-slate-500"
                  >
                    <span>Additional seats ({teamMembers - 5})</span>
                    <span>{formatCurrency(estimate.seatOverage)}</span>
                  </motion.div>
                )}

                {estimate.total > 500 && (
                  <motion.div
                    key="volume"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2"
                  >
                    <Link
                      href="/contact"
                      className="text-brand-500 hover:text-brand-600 inline-flex items-center gap-1 text-sm font-medium transition-colors"
                    >
                      Talk to us for volume discounts
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
