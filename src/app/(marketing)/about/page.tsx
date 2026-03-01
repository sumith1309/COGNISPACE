import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase, Building2, Wrench, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Cognispace is a technology studio that designs and builds intelligent AI solutions — from research to production.',
};

const values = [
  {
    title: 'Production over Prototype',
    description:
      'Every system we build is containerized, monitored, and deployed. We optimize for real-world performance, not demo-day impressions.',
  },
  {
    title: 'Domain Depth',
    description:
      'We invest time understanding your industry before writing a single line of code. Context is what separates useful AI from generic models.',
  },
  {
    title: 'Transparent Engineering',
    description:
      'No black boxes. We use explainable models, document our decisions, and build systems your team can maintain and evolve.',
  },
  {
    title: 'Right-Sized Solutions',
    description:
      'Not every problem needs deep learning. We pick the simplest approach that actually works — whether that is a fine-tuned DistilBERT or a well-designed rule engine.',
  },
];

const stats = [
  { icon: Briefcase, value: '60+', label: 'Projects Delivered' },
  { icon: Building2, value: '9', label: 'Industries Served' },
  { icon: Wrench, value: '25+', label: 'Technologies' },
  { icon: Award, value: '100%', label: 'Client Satisfaction' },
];

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-brand-500 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase dark:bg-blue-950">
              About Us
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              We build AI that works in the real world
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-500 dark:text-slate-400">
              Cognispace is a technology studio focused on building intelligent products where human
              insight and machine intelligence work together. We partner with teams across finance,
              healthcare, education, retail, and more to turn AI ambition into production systems.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-100 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex flex-col items-center text-center">
                  <Icon className="mb-3 h-6 w-6 text-slate-300" />
                  <div className="gradient-text text-4xl font-bold">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              How we think about AI
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-500 dark:text-slate-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-violet-50 py-16 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Ready to work together?
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
            Tell us about your challenge and we will figure out the best way to help.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
