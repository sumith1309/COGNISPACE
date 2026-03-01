'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'DataFlow',
    content:
      'Cognispace took our vague idea about using AI for document processing and turned it into a production system in 6 weeks. Their team understood our domain deeply and delivered beyond expectations.',
    initials: 'SC',
  },
  {
    id: '2',
    name: 'Marcus Rivera',
    role: 'Lead Engineer',
    company: 'NeuralEdge',
    content:
      'What impressed us most was their ability to evaluate multiple ML approaches and pick the one that actually worked at scale. No hype, just rigorous engineering with real results.',
    initials: 'MR',
  },
  {
    id: '3',
    name: 'Priya Sharma',
    role: 'VP Engineering',
    company: 'ScaleAI',
    content:
      'We needed an AI recommendation engine that could handle millions of users. Cognispace built it, deployed it, and it has been running flawlessly for over a year with sub-10ms latency.',
    initials: 'PS',
  },
  {
    id: '4',
    name: 'James Kim',
    role: 'Product Manager',
    company: 'CloudMind',
    content:
      'They did not just build what we asked for — they challenged our assumptions, proposed a better architecture, and delivered a system that was simpler and more performant than we imagined.',
    initials: 'JK',
  },
  {
    id: '5',
    name: 'Elena Volkov',
    role: 'Head of AI',
    company: 'TechCorp',
    content:
      'From LMS platforms to AI-powered assessments, Cognispace has been our go-to partner for anything at the intersection of education and machine intelligence. Consistently excellent work.',
    initials: 'EV',
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section
      className="bg-gradient-to-b from-white to-[#F8FAFF] py-24 lg:py-32 dark:from-slate-900 dark:to-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-16 text-center"
        >
          <span className="text-brand-500 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase dark:bg-blue-950">
            What Clients Say
          </span>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Trusted by teams building with AI
          </h2>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg lg:p-12 dark:border-slate-800 dark:bg-slate-900"
              >
                <Quote
                  className="mb-6 h-10 w-10 text-slate-200 dark:text-slate-700"
                  aria-hidden="true"
                />
                <p className="mb-8 text-xl leading-relaxed text-slate-700 dark:text-slate-300">
                  &ldquo;{testimonials[currentIndex]?.content}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-semibold text-white">
                    {testimonials[currentIndex]?.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {testimonials[currentIndex]?.name}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {testimonials[currentIndex]?.role} at {testimonials[currentIndex]?.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    index === currentIndex
                      ? 'bg-brand-500 w-8'
                      : 'w-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                />
              ))}
            </div>

            <Button variant="ghost" size="icon" onClick={handleNext} aria-label="Next testimonial">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
