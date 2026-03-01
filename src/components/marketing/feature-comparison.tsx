'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FEATURE_CATEGORIES } from '@/lib/pricing-data';

/* ─── Cell renderer ─── */

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-500" />
    ) : (
      <X className="mx-auto h-5 w-5 text-slate-300 dark:text-slate-600" />
    );
  }
  return <span className="text-sm text-slate-700 dark:text-slate-300">{value}</span>;
}

/* ─── Mobile single-plan list ─── */

function MobilePlanView({ plan }: { plan: 'starter' | 'pro' | 'enterprise' }) {
  return (
    <div className="space-y-6">
      {FEATURE_CATEGORIES.map((cat) => (
        <div key={cat.category}>
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-900 uppercase dark:text-white">
            {cat.category}
          </h3>
          <ul className="space-y-2.5">
            {cat.features.map((feature) => {
              const value = feature[plan];
              return (
                <li key={feature.name} className="flex items-center gap-3">
                  <div className="shrink-0">
                    {typeof value === 'boolean' ? (
                      value ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <X className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                      )
                    ) : (
                      <span className="inline-flex min-w-[60px] justify-center rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {value}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">{feature.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Component ─── */

export function FeatureComparison() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-white py-24 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl dark:text-white">
            Compare tiers in detail
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Every deliverable across all engagement tiers
          </p>
        </motion.div>

        {/* Expand Button */}
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            rightIcon={
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            }
          >
            {isExpanded ? 'Hide details' : 'Compare all deliverables'}
          </Button>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="overflow-hidden"
            >
              <div className="mt-10">
                {/* Desktop Table */}
                <div className="hidden lg:block">
                  <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                            Deliverables
                          </th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">
                            Starter Project
                            <span className="block text-xs font-normal text-slate-400">
                              From $15,000
                            </span>
                          </th>
                          <th className="text-brand-600 dark:text-brand-400 px-6 py-4 text-center text-sm font-semibold">
                            Growth
                            <span className="block text-xs font-normal text-slate-400">
                              From $50,000
                            </span>
                          </th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-violet-600 dark:text-violet-400">
                            Enterprise
                            <span className="block text-xs font-normal text-slate-400">Custom</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {FEATURE_CATEGORIES.map((cat) => (
                          <CategoryRows key={cat.category} category={cat} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile Tabbed View */}
                <div className="lg:hidden">
                  <Tabs defaultValue="pro">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="starter">Starter</TabsTrigger>
                      <TabsTrigger value="pro">Growth</TabsTrigger>
                      <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
                    </TabsList>
                    <TabsContent value="starter" className="mt-6">
                      <MobilePlanView plan="starter" />
                    </TabsContent>
                    <TabsContent value="pro" className="mt-6">
                      <MobilePlanView plan="pro" />
                    </TabsContent>
                    <TabsContent value="enterprise" className="mt-6">
                      <MobilePlanView plan="enterprise" />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── Category Rows (desktop table) ─── */

function CategoryRows({ category }: { category: (typeof FEATURE_CATEGORIES)[number] }) {
  return (
    <>
      <tr className="bg-slate-50/60 dark:bg-slate-950/60">
        <td
          colSpan={4}
          className="px-6 py-3 text-xs font-semibold tracking-wide text-slate-900 uppercase dark:text-white"
        >
          {category.category}
        </td>
      </tr>
      {category.features.map((feature) => (
        <tr
          key={feature.name}
          className="border-b border-slate-100 transition-colors hover:bg-slate-50/50 dark:border-slate-800 dark:hover:bg-slate-800/30"
        >
          <td className="px-6 py-3.5 text-sm text-slate-700 dark:text-slate-300">{feature.name}</td>
          <td className="px-6 py-3.5 text-center">
            <CellValue value={feature.starter} />
          </td>
          <td className="px-6 py-3.5 text-center">
            <CellValue value={feature.pro} />
          </td>
          <td className="px-6 py-3.5 text-center">
            <CellValue value={feature.enterprise} />
          </td>
        </tr>
      ))}
    </>
  );
}
