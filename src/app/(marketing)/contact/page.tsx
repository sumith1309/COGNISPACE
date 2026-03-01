'use client';

import React, { useState } from 'react';
import { ArrowRight, Mail, MapPin, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { industries } from '@/lib/projects-data';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white dark:bg-slate-900">
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left: Info */}
            <div>
              <span className="text-brand-500 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase dark:bg-blue-950">
                Contact
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                Let&apos;s build something intelligent together
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-500 dark:text-slate-400">
                Whether you have a clear AI vision or are just exploring possibilities, we would
                love to hear about your challenge. Most engagements start in under 2 weeks.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-50 dark:bg-brand-950 flex h-10 w-10 items-center justify-center rounded-lg">
                    <Mail className="text-brand-500 h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">Email</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      hello@cognispace.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-brand-50 dark:bg-brand-950 flex h-10 w-10 items-center justify-center rounded-lg">
                    <MessageSquare className="text-brand-500 h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">Response Time</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-brand-50 dark:bg-brand-950 flex h-10 w-10 items-center justify-center rounded-lg">
                    <MapPin className="text-brand-500 h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">Location</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Remote-first, working globally
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" required className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        required
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Your company" className="mt-1.5" />
                  </div>

                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <select
                      id="industry"
                      className="mt-1.5 flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    >
                      <option value="">Select an industry</option>
                      {industries.map((industry) => (
                        <option key={industry.id} value={industry.id}>
                          {industry.label}
                        </option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Tell us about your project</Label>
                    <Textarea
                      id="message"
                      placeholder="What challenge are you trying to solve? What does success look like?"
                      rows={5}
                      required
                      className="mt-1.5"
                    />
                  </div>

                  <Button type="submit" className="group w-full">
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
                    <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Message sent!
                  </h3>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">
                    We will get back to you within 24 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
