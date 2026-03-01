'use client';

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useTypewriter } from '@/hooks/use-typewriter';
import { Badge } from '@/components/ui/badge';

type ProjectTab = 'Architecture' | 'Tech Stack' | 'Outcomes';

const architectureSteps = [
  { label: 'User Query', color: 'bg-blue-500' },
  { label: 'LangGraph Orchestrator', color: 'bg-violet-500' },
  { label: 'Research Agents', color: 'bg-emerald-500' },
  { label: 'Claude API Analysis', color: 'bg-blue-500' },
  { label: 'SHAP Explainability', color: 'bg-amber-500' },
  { label: 'Investment Brief', color: 'bg-emerald-500' },
];

const techStack = [
  'LangGraph',
  'Claude API',
  'SHAP',
  'Python',
  'FastAPI',
  'PostgreSQL',
  'Redis',
  'Docker',
];

const outcomeText =
  'The system autonomously researches stocks, evaluates risk factors, and generates comprehensive investment briefs — with full transparency into its reasoning via SHAP visualizations. Multi-agent orchestration enables parallel research across market data, financial filings, and news sentiment.';

export function CodeDemoSection() {
  const [activeTab, setActiveTab] = useState<ProjectTab>('Architecture');
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });

  const { displayedText, start } = useTypewriter({
    text: outcomeText,
    speed: 20,
    startOnMount: false,
  });

  useEffect(() => {
    if (isInView && activeTab === 'Outcomes') {
      const timeout = setTimeout(() => start(), 400);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [isInView, activeTab, start]);

  const features = [
    'Multi-agent orchestration via LangGraph',
    'Claude API for deep research analysis',
    'Explainable outputs with SHAP visualization',
  ];

  return (
    <section className="bg-white py-24 lg:py-32 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col justify-center"
          >
            <span className="text-brand-500 inline-block w-fit rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase dark:bg-blue-950">
              Featured Project
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl dark:text-white">
              AI Investment Research Advisor
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-500 dark:text-slate-400">
              An agentic research platform that autonomously investigates stocks, evaluates risk,
              and generates investment briefs with full explainability — built for a financial
              services firm.
            </p>

            <ul className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <Check className="text-brand-500 mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <Link
              href={'/work' as '/'}
              className="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 mt-8 inline-flex w-fit items-center text-sm font-medium transition-colors"
            >
              View all projects →
            </Link>
          </motion.div>

          {/* Right: Project Deep Dive Card */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Project Window */}
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">
              {/* Window Header */}
              <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                </div>
                <div className="ml-2 flex gap-2">
                  {(['Architecture', 'Tech Stack', 'Outcomes'] as ProjectTab[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        'rounded px-3 py-1 text-xs font-medium transition-colors',
                        activeTab === tab
                          ? 'bg-white text-slate-900 dark:bg-slate-950 dark:text-white'
                          : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'Architecture' && (
                  <div className="space-y-3">
                    {architectureSteps.map((step, i) => (
                      <div key={step.label} className="flex items-center gap-3">
                        <div
                          className={cn(
                            'flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white',
                            step.color
                          )}
                        >
                          {i + 1}
                        </div>
                        <div className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {step.label}
                        </div>
                        {i < architectureSteps.length - 1 && (
                          <div className="absolute ml-4 hidden text-slate-300 dark:text-slate-600" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Tech Stack' && (
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="px-3 py-1.5 text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}

                {activeTab === 'Outcomes' && (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Project Outcomes
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {displayedText}
                      {displayedText && displayedText.length < outcomeText.length && (
                        <span className="bg-brand-500 inline-block h-4 w-1.5 animate-pulse" />
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
