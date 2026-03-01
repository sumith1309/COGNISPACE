'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Diamond, Handshake, Rocket, Linkedin, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

/* -------------------------------------------------------------------------- */
/*  Animation helpers                                                         */
/* -------------------------------------------------------------------------- */

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0.6, ease },
};

function staggeredFadeUp(index: number, base = 0.1) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' as const },
    transition: { duration: 0.5, delay: index * base, ease },
  };
}

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

interface Founder {
  name: string;
  title: string;
  initials: string;
  image: string;
  imagePosition?: string;
  bio: string;
  gradientFrom: string;
  gradientTo: string;
  linkedinHref: string;
}

const founders: Founder[] = [
  {
    name: 'Vidit K Bhatnagar',
    title: 'Co-Founder & CEO',
    initials: 'VB',
    image: '/founders/vidit.png',
    bio: 'Vidit leads the company\u2019s vision and strategy. With deep expertise in AI systems and product development, he ensures every product Cognispace builds delivers real business value. He\u2019s passionate about making AI accessible to every industry.',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-violet-600',
    linkedinHref: 'https://www.linkedin.com/in/vidit-k-bhatnagar-24b107146/',
  },
  {
    name: 'Aditya Tripathi',
    title: 'Co-Founder & CTO',
    initials: 'AT',
    image: '/founders/aditya-v2.png',
    bio: 'Aditya leads the engineering team and technical architecture. His background in machine learning and scalable systems means every product is built on a foundation of clean code, smart AI, and rock-solid infrastructure.',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-fuchsia-600',
    linkedinHref: 'https://www.linkedin.com/in/aditya-tripathi-7b8365167/',
  },
  {
    name: 'S. Jyothi Swaroop',
    title: 'Co-Founder & CPO',
    initials: 'JS',
    image: '/founders/jyothi-swaroop-v3.jpeg',
    imagePosition: 'center 25%',
    bio: 'Jyothi Swaroop leads product design and client relationships. With a keen eye for user experience and a deep understanding of how AI should feel in the hands of real users, he ensures every product is intuitive, beautiful, and impactful.',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-600',
    linkedinHref: 'https://www.linkedin.com/in/jyothi-swaroop-753116295/',
  },
];

interface Value {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: Brain,
    title: 'Intelligence First',
    description:
      'AI isn\u2019t an afterthought \u2014 it\u2019s the foundation. Every product we build has intelligence woven into its core.',
  },
  {
    icon: Diamond,
    title: 'Craft & Quality',
    description:
      'We don\u2019t ship mediocre software. Every pixel, every function, every model is crafted to the highest standard.',
  },
  {
    icon: Handshake,
    title: 'Partnership, Not Vendors',
    description:
      'We don\u2019t just take orders. We become part of your team, deeply understanding your business to build the right thing.',
  },
  {
    icon: Rocket,
    title: 'Ship & Iterate',
    description:
      'We believe in getting real software in front of real users fast, then continuously improving based on data and feedback.',
  },
];

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

function FounderCard({ founder, index }: { founder: Founder; index: number }) {
  return (
    <motion.div
      {...staggeredFadeUp(index, 0.15)}
      className="group rounded-2xl border border-slate-200 bg-white p-8 text-center transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Avatar */}
      <div
        className={`mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${founder.gradientFrom} ${founder.gradientTo} shadow-lg`}
      >
        <Image
          src={founder.image}
          alt={founder.name}
          width={128}
          height={128}
          className="h-full w-full object-cover"
          style={founder.imagePosition ? { objectPosition: founder.imagePosition } : undefined}
        />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">{founder.name}</h3>
      <p className="text-brand-500 dark:text-brand-400 mt-1 text-sm font-medium">{founder.title}</p>
      <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {founder.bio}
      </p>

      {/* LinkedIn link */}
      <a
        href={founder.linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${founder.name} on LinkedIn`}
        className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-blue-300 hover:text-blue-500 dark:border-slate-700 dark:text-slate-500 dark:hover:border-blue-700 dark:hover:text-blue-400"
      >
        <Linkedin className="h-4 w-4" />
      </a>
    </motion.div>
  );
}

function ValueCard({ value, index }: { value: Value; index: number }) {
  const Icon = value.icon;
  return (
    <motion.div
      {...staggeredFadeUp(index, 0.1)}
      className="rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950 dark:to-violet-950">
        <Icon className="text-brand-500 h-6 w-6" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{value.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {value.description}
      </p>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main content                                                              */
/* -------------------------------------------------------------------------- */

export function AboutPageContent() {
  return (
    <main>
      {/* ------------------------------------------------------------------ */}
      {/*  Hero                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F4FF] via-[#F8FAFF] to-white py-28 lg:py-40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <span className="text-brand-500 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase dark:bg-blue-950">
              About Cognispace
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl dark:text-white">
              We&apos;re building the future of intelligent software
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#334155] dark:text-slate-300">
              Cognispace is a technology studio founded by three engineers who believe every
              business deserves access to world-class AI. We partner with companies to turn
              ambitious ideas into production-ready software.
            </p>
          </motion.div>
        </div>

        {/* Decorative blurs */}
        <div
          className="pointer-events-none absolute -top-24 -left-48 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-48 -bottom-24 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-500/10"
          aria-hidden="true"
        />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Our Story                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white py-24 lg:py-32 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl">
            <span className="text-brand-500 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase dark:bg-blue-950">
              Our Story
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl dark:text-white">
              From a shared belief to a technology studio
            </h2>

            <div className="mt-8 space-y-6 text-base leading-relaxed text-[#334155] dark:text-slate-300">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.1, ease }}
              >
                Founded in 2025, Cognispace started with a simple belief: AI shouldn&apos;t be
                locked inside research labs. Every business, from healthcare startups to enterprise
                logistics companies, should be able to harness the power of intelligent software.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.2, ease }}
              >
                Our founders &mdash; Vidit, Aditya, and Jyothi Swaroop &mdash; combined their
                expertise in software engineering, AI/ML, and product design to create a studio that
                doesn&apos;t just build software, but builds{' '}
                <em className="font-medium text-[#0F172A] not-italic dark:text-white">
                  intelligent software
                </em>
                . Products that think, adapt, and deliver real results.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.3, ease }}
              >
                Today, we work with companies across industries to solve their toughest problems
                with technology. Our approach is simple: understand the business deeply, design with
                users in mind, build with cutting-edge AI, and deliver software that actually works.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Meet the Founders                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-[#F8FAFF] py-24 lg:py-32 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center">
            <span className="text-brand-500 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase dark:bg-blue-950">
              Leadership
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl dark:text-white">
              Meet the Founders
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#334155] dark:text-slate-400">
              Three engineers united by a shared mission to make AI accessible, practical, and
              transformative for every business.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
            {founders.map((founder, index) => (
              <FounderCard key={founder.name} founder={founder} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Our Values                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white py-24 lg:py-32 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center">
            <span className="text-brand-500 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase dark:bg-blue-950">
              Our Values
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl dark:text-white">
              What drives us every day
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#334155] dark:text-slate-400">
              The principles that guide every decision we make and every line of code we write.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-10">
            {values.map((value, index) => (
              <ValueCard key={value.title} value={value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  CTA                                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-50 py-24 lg:py-32 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl dark:text-white">
              Want to work with us?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#334155] dark:text-slate-300">
              Whether you&apos;re looking to join our team or start a project together, we&apos;d
              love to hear from you.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="outline" size="lg">
                <Link href={'/careers' as '/'}>View Open Positions</Link>
              </Button>
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Decorative blurs */}
        <div
          className="pointer-events-none absolute top-1/2 -left-48 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-200/20 blur-3xl dark:bg-blue-500/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 -right-48 h-96 w-96 -translate-y-1/2 rounded-full bg-violet-200/20 blur-3xl dark:bg-violet-500/10"
          aria-hidden="true"
        />
      </section>
    </main>
  );
}
