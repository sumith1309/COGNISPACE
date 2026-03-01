'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Lightbulb, Settings, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IndustriesSection } from '@/components/marketing/industries-section';

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  bullets: string[];
  techBadges: string[];
  colorClasses: {
    bg: string;
    icon: string;
    border: string;
  };
}

/* -------------------------------------------------------------------------- */
/*  Animation helpers                                                         */
/* -------------------------------------------------------------------------- */

const sectionBadgeClasses =
  'text-brand-500 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase dark:bg-blue-950';

const ease = [0.21, 0.47, 0.32, 0.98] as const;

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const services: ServiceItem[] = [
  {
    icon: Code2,
    title: 'Custom AI Software Development',
    description:
      'Full-stack development of intelligent software products, from concept to production. We combine modern engineering practices with cutting-edge AI capabilities to build software that solves real business problems at scale.',
    bullets: [
      'Requirements analysis & scoping',
      'UX research & interface design',
      'Frontend & backend development',
      'AI/ML model integration',
      'Automated testing & QA',
      'Cloud deployment & DevOps',
    ],
    techBadges: ['Next.js', 'React', 'Python', 'TensorFlow', 'PostgreSQL', 'AWS'],
    colorClasses: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900',
      icon: 'text-blue-500',
      border: 'border-blue-100 dark:border-blue-900',
    },
  },
  {
    icon: Lightbulb,
    title: 'AI Strategy & Consulting',
    description:
      'Not sure where to start with AI? We help you identify the highest-impact opportunities, evaluate feasibility, and build a clear roadmap. Our consulting engagements are designed to give you clarity and confidence before committing to a build.',
    bullets: [
      'Workshop facilitation & discovery',
      'Technical feasibility reports',
      'AI implementation roadmap',
      'Team training & enablement',
    ],
    techBadges: [
      'AI Readiness Assessment',
      'Data Strategy',
      'Use Case Identification',
      'ROI Modeling',
    ],
    colorClasses: {
      bg: 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900',
      icon: 'text-amber-500',
      border: 'border-amber-100 dark:border-amber-900',
    },
  },
  {
    icon: Settings,
    title: 'Ongoing AI Operations',
    description:
      'Launching is just the beginning. We provide post-launch support, continuous model monitoring, and iterative improvements to keep your AI systems accurate, reliable, and aligned with evolving business needs.',
    bullets: [
      '24/7 system monitoring & alerts',
      'Monthly performance reviews',
      'Model retraining & optimization',
      'Feature development & iteration',
    ],
    techBadges: [
      'Model Monitoring',
      'Performance Analytics',
      'Continuous Deployment',
      'SLA Support',
    ],
    colorClasses: {
      bg: 'bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900',
      icon: 'text-violet-500',
      border: 'border-violet-100 dark:border-violet-900',
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [...ease] }}
      className={cn(
        'group rounded-2xl border bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg lg:p-10',
        'border-slate-200 dark:border-slate-800 dark:bg-slate-900'
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'inline-flex h-14 w-14 items-center justify-center rounded-xl',
          service.colorClasses.bg
        )}
      >
        <Icon className={cn('h-7 w-7', service.colorClasses.icon)} />
      </div>

      {/* Title & Description */}
      <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">{service.title}</h3>
      <p className="mt-3 text-base leading-relaxed text-slate-500 dark:text-slate-400">
        {service.description}
      </p>

      {/* Bullet points */}
      <ul className="mt-6 space-y-3">
        {service.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Tech badges */}
      <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-6 dark:border-slate-800">
        {service.techBadges.map((tech) => (
          <Badge key={tech} variant="secondary" className="text-xs">
            {tech}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main content component                                                    */
/* -------------------------------------------------------------------------- */

export function SolutionsPageContent() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/*  Hero Section                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 py-24 lg:py-32 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [...ease] }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className={sectionBadgeClasses}>Solutions</span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl dark:text-white">
              Intelligent solutions for real-world problems
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              We build custom AI software that delivers measurable business impact across every
              industry.
            </p>
          </motion.div>
        </div>

        {/* Decorative blur elements */}
        <div
          className="pointer-events-none absolute -top-24 -left-32 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl dark:bg-blue-500/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-32 -bottom-24 h-96 w-96 rounded-full bg-violet-100/40 blur-3xl dark:bg-violet-500/10"
          aria-hidden="true"
        />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Our Services Section                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white py-24 lg:py-32 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [...ease] }}
            className="text-center"
          >
            <span className={sectionBadgeClasses}>Our Services</span>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              Everything you need to ship AI products
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
              From strategic planning to post-launch operations, we partner with you at every stage
              of the AI product lifecycle.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Industries Section (reused component)                              */}
      {/* ------------------------------------------------------------------ */}
      <IndustriesSection />

      {/* ------------------------------------------------------------------ */}
      {/*  CTA Section                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-50 py-24 lg:py-32 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [...ease] }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              Let&apos;s build your AI advantage
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Whether you&apos;re exploring AI for the first time or scaling an existing system, we
              can help you move faster and smarter.
            </p>

            <div className="mt-10">
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Let&apos;s Talk
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
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
    </>
  );
}
