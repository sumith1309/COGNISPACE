'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MapPin,
  Clock,
  Linkedin,
  Github,
  Twitter,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  contactFormSchema,
  SERVICE_OPTIONS,
  BUDGET_OPTIONS,
  REFERRAL_OPTIONS,
} from '@/lib/validations/contact-form';

/* ─── Types ─── */

interface FormState {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  serviceType: string;
  description: string;
  budget: string;
  referralSource: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  company?: string;
  phone?: string;
  serviceType?: string;
  description?: string;
  budget?: string;
  referralSource?: string;
}

/* ─── Constants ─── */

const INITIAL_FORM_STATE: FormState = {
  fullName: '',
  email: '',
  company: '',
  phone: '',
  serviceType: '',
  description: '',
  budget: '',
  referralSource: '',
};

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'hello@cognispace.com',
    href: 'mailto:hello@cognispace.com',
  },
  {
    icon: MapPin,
    label: 'Hyderabad, India',
    href: undefined,
  },
  {
    icon: Clock,
    label: 'Typically respond within 24 hours',
    href: undefined,
  },
] as const;

const SOCIAL_LINKS = [
  { icon: Linkedin, href: 'https://linkedin.com/company/cognispace', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/cognispace', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/cognispace', label: 'Twitter' },
] as const;

/* ─── Select Component ─── */

function FormSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: ReadonlyArray<{ readonly value: string; readonly label: string }>;
  placeholder: string;
  error?: string | undefined;
  required?: boolean | undefined;
}) {
  return (
    <div className="w-full space-y-1.5">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'flex h-10 w-full appearance-none rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-900 dark:text-white',
          error
            ? 'border-red-500 focus-visible:ring-red-500'
            : 'focus-visible:ring-brand-500 border-slate-300 dark:border-slate-700',
          !value && 'text-slate-400 dark:text-slate-500'
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Main Component ─── */

export function ContactPageContent() {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setFormData((prev) => {
      const next: FormState = { ...prev };
      next[field] = value;
      return next;
    });
    // Clear error for this field on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    // Build the validation payload — only include optional enum fields if they have values
    const payload: Record<string, unknown> = {
      fullName: formData.fullName,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      serviceType: formData.serviceType,
      description: formData.description,
    };
    if (formData.budget) {
      payload['budget'] = formData.budget;
    }
    if (formData.referralSource) {
      payload['referralSource'] = formData.referralSource;
    }

    const result = contactFormSchema.safeParse(payload);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0];
        if (typeof fieldName === 'string' && fieldName in INITIAL_FORM_STATE) {
          const key = fieldName as keyof FormErrors;
          if (!fieldErrors[key]) {
            fieldErrors[key] = issue.message;
          }
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const errorBody = (await response.json()) as { error?: unknown };
        if (Array.isArray(errorBody.error)) {
          const fieldErrors: FormErrors = {};
          for (const err of errorBody.error as Array<{ path: string; message: string }>) {
            const key = err.path as keyof FormErrors;
            if (key in INITIAL_FORM_STATE) {
              fieldErrors[key] = err.message;
            }
          }
          setErrors(fieldErrors);
        } else {
          setErrors({ fullName: 'Something went wrong. Please try again.' });
        }
        return;
      }

      setIsSuccess(true);
    } catch {
      setErrors({ fullName: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-violet-50/30 dark:from-blue-950/20 dark:to-violet-950/10" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[45fr_55fr] lg:gap-20">
          {/* ── Left Column ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl dark:text-white">
              Let&apos;s talk about
              <br />
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">
                your project
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#334155] dark:text-slate-400">
              Whether you have a clear vision or just a kernel of an idea, we&apos;d love to hear
              about it. Our initial consultation is free &mdash; no strings attached.
            </p>

            {/* Contact info items */}
            <div className="mt-10 space-y-5">
              {CONTACT_INFO.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#3B82F6] dark:bg-blue-950/50 dark:text-blue-400">
                    <item.icon className="h-5 w-5" />
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium text-[#334155] transition-colors hover:text-[#3B82F6] dark:text-slate-300 dark:hover:text-blue-400"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-[#334155] dark:text-slate-300">
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="mt-10">
              <p className="mb-3 text-sm font-medium text-[#64748B] dark:text-slate-500">
                Follow us
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-[#64748B] transition-all hover:border-[#3B82F6] hover:text-[#3B82F6] dark:border-slate-700 dark:text-slate-400 dark:hover:border-blue-500 dark:hover:text-blue-400"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right Column ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="mt-6 text-2xl font-bold text-[#0F172A] dark:text-white">
                    Thank you!
                  </h2>
                  <p className="mt-3 max-w-sm text-[#334155] dark:text-slate-400">
                    We&apos;ll be in touch within 24 hours. In the meantime, check out our
                    solutions.
                  </p>
                  <Link href="/solutions">
                    <Button variant="primary" size="lg" className="mt-8" rightIcon={<ArrowRight />}>
                      Explore Solutions
                    </Button>
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900"
                >
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Full Name + Email */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input
                        label="Full name"
                        placeholder="Jane Doe"
                        required
                        value={formData.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        error={errors.fullName}
                      />
                      <Input
                        label="Work email"
                        type="email"
                        placeholder="jane@company.com"
                        required
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        error={errors.email}
                      />
                    </div>

                    {/* Company + Phone */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input
                        label="Company name"
                        placeholder="Acme Inc."
                        value={formData.company}
                        onChange={(e) => updateField('company', e.target.value)}
                        error={errors.company}
                      />
                      <Input
                        label="Phone number"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        error={errors.phone}
                      />
                    </div>

                    {/* Service Type */}
                    <FormSelect
                      label="What can we help you with?"
                      value={formData.serviceType}
                      onChange={(val) => updateField('serviceType', val)}
                      options={SERVICE_OPTIONS}
                      placeholder="Select a service type"
                      error={errors.serviceType}
                      required
                    />

                    {/* Project Description */}
                    <Textarea
                      label="Tell us about your project"
                      placeholder="Describe your goals, challenges, and any specific requirements..."
                      rows={5}
                      required
                      value={formData.description}
                      onChange={(e) => updateField('description', e.target.value)}
                      error={errors.description}
                    />

                    {/* Budget + Referral */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormSelect
                        label="Estimated budget"
                        value={formData.budget}
                        onChange={(val) => updateField('budget', val)}
                        options={BUDGET_OPTIONS}
                        placeholder="Select a range (optional)"
                        error={errors.budget}
                      />
                      <FormSelect
                        label="How did you hear about us?"
                        value={formData.referralSource}
                        onChange={(val) => updateField('referralSource', val)}
                        options={REFERRAL_OPTIONS}
                        placeholder="Select an option (optional)"
                        error={errors.referralSource}
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isLoading}
                      className="w-full"
                    >
                      Send Message
                    </Button>

                    <p className="text-center text-xs text-[#64748B] dark:text-slate-500">
                      We&apos;ll never share your information with third parties.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
