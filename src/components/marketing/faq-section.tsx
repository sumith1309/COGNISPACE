'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FAQ_ITEMS } from '@/lib/pricing-data';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="border-t border-slate-100 bg-[#F8FAFF] py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-slate-500">Everything you need to know about our pricing</p>
        </motion.div>

        {/* Items */}
        <div className="mt-12">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.05,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="border-b border-slate-200 last:border-0"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="hover:text-brand-500 flex w-full items-center justify-between gap-4 py-5 text-left transition-colors"
                >
                  <span className="text-base font-medium text-slate-900">{item.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  </motion.span>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{
                    height: { duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] },
                    opacity: { duration: 0.2 },
                  }}
                  className="overflow-hidden"
                >
                  <p className="pr-12 pb-5 text-sm leading-relaxed text-slate-500">{item.answer}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
