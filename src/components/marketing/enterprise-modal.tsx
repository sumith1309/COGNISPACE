'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CheckCircle2 } from 'lucide-react';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { SelectField } from '@/components/ui/select';
import {
  companyStepSchema,
  projectStepSchema,
  technicalStepSchema,
  contactStepSchema,
  COMPANY_SIZES,
  INDUSTRIES,
  TIMELINES,
  BUDGETS,
  SERVICE_OPTIONS,
  PROJECT_SCALES,
  REQUIREMENT_OPTIONS,
  MEETING_FORMATS,
  REFERRAL_SOURCES,
} from '@/lib/validations/enterprise-form';
import type {
  CompanyStepData,
  ProjectStepData,
  TechnicalStepData,
  ContactStepData,
} from '@/lib/validations/enterprise-form';

/* ─── Types ─── */

type StepId = 'company' | 'project' | 'technical' | 'contact';

const STEPS: { id: StepId; label: string }[] = [
  { id: 'company', label: 'Company' },
  { id: 'project', label: 'Project' },
  { id: 'technical', label: 'Technical' },
  { id: 'contact', label: 'Contact' },
];

interface EnterpriseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/* ─── Progress Indicator ─── */

function ProgressIndicator({ currentStep, steps }: { currentStep: number; steps: typeof STEPS }) {
  return (
    <div className="mb-8">
      {/* Dots and lines */}
      <div className="flex items-center justify-center">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                'flex h-3 w-3 items-center justify-center rounded-full transition-colors duration-300',
                idx < currentStep && 'bg-brand-500',
                idx === currentStep && 'bg-brand-500',
                idx > currentStep && 'bg-slate-200 dark:bg-slate-700'
              )}
            >
              {idx < currentStep && <Check className="h-2 w-2 text-white" strokeWidth={3} />}
            </div>
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  'mx-2 h-0.5 w-10 transition-colors duration-300 sm:w-16',
                  idx < currentStep ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-700'
                )}
              />
            )}
          </div>
        ))}
      </div>
      {/* Labels */}
      <div className="mt-2 flex justify-between px-0">
        <div className="flex w-full justify-center gap-8 sm:gap-[4.5rem]">
          {steps.map((step, idx) => (
            <span
              key={step.id}
              className={cn(
                'text-xs font-medium transition-colors',
                idx <= currentStep ? 'text-brand-500' : 'text-slate-400 dark:text-slate-500'
              )}
            >
              {step.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Step Variants ─── */

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

/* ─── Main Modal ─── */

export function EnterpriseModal({ open, onOpenChange }: EnterpriseModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form data
  const [company, setCompany] = useState<Partial<CompanyStepData>>({
    companyName: '',
    website: '',
    companySize: '',
    industry: '',
  });
  const [project, setProject] = useState<Partial<ProjectStepData>>({
    useCase: '',
    timeline: '',
    budget: '',
  });
  const [technical, setTechnical] = useState<Partial<TechnicalStepData>>({
    services: [],
    projectScale: '',
    requirements: [],
  });
  const [contact, setContact] = useState<Partial<ContactStepData>>({
    fullName: '',
    email: '',
    phone: '',
    jobTitle: '',
    meetingFormat: '',
    referralSource: '',
  });

  const resetForm = useCallback(() => {
    setCurrentStep(0);
    setDirection(0);
    setIsSubmitting(false);
    setIsSuccess(false);
    setErrors({});
    setCompany({ companyName: '', website: '', companySize: '', industry: '' });
    setProject({ useCase: '', timeline: '', budget: '' });
    setTechnical({ services: [], projectScale: '', requirements: [] });
    setContact({
      fullName: '',
      email: '',
      phone: '',
      jobTitle: '',
      meetingFormat: '',
      referralSource: '',
    });
  }, []);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) resetForm();
      onOpenChange(nextOpen);
    },
    [onOpenChange, resetForm]
  );

  const validateStep = (): boolean => {
    const schemas: Record<number, z.ZodType> = {
      0: companyStepSchema,
      1: projectStepSchema,
      2: technicalStepSchema,
      3: contactStepSchema,
    };
    const data: Record<number, unknown> = {
      0: company,
      1: project,
      2: technical,
      3: contact,
    };

    const schema = schemas[currentStep]!;
    const result = schema.safeParse(data[currentStep]);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path.join('.');
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep === STEPS.length - 1) {
      handleSubmit();
      return;
    }

    setDirection(1);
    setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setErrors({});
    setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  /* ─── Toggle helper for checkbox arrays ─── */
  const toggleArray = (arr: string[] | undefined, value: string): string[] => {
    const current = arr || [];
    return current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
  };

  /* ─── Step Content ─── */

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-5">
            <Input
              label="Company Name"
              placeholder="Acme Corporation"
              value={company.companyName || ''}
              onChange={(e) => setCompany({ ...company, companyName: e.target.value })}
              error={errors['companyName']}
            />
            <Input
              label="Company Website"
              placeholder="https://"
              value={company.website || ''}
              onChange={(e) => setCompany({ ...company, website: e.target.value })}
              error={errors['website']}
            />
            <SelectField
              label="Company Size"
              placeholder="Select company size"
              value={company.companySize || ''}
              onValueChange={(v) => setCompany({ ...company, companySize: v })}
              options={COMPANY_SIZES}
              error={errors['companySize']}
            />
            <SelectField
              label="Industry"
              placeholder="Select your industry"
              value={company.industry || ''}
              onValueChange={(v) => setCompany({ ...company, industry: v })}
              options={INDUSTRIES}
              error={errors['industry']}
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-5">
            <Textarea
              label="Project Description"
              placeholder="Describe what you're looking to build..."
              value={project.useCase || ''}
              onChange={(e) => setProject({ ...project, useCase: e.target.value })}
              error={errors['useCase']}
            />
            <SelectField
              label="Expected Timeline"
              placeholder="Select timeline"
              value={project.timeline || ''}
              onValueChange={(v) => setProject({ ...project, timeline: v })}
              options={TIMELINES}
              error={errors['timeline']}
            />
            <SelectField
              label="Budget Range"
              placeholder="Select budget range"
              value={project.budget || ''}
              onValueChange={(v) => setProject({ ...project, budget: v })}
              options={BUDGETS}
              error={errors['budget']}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Services Needed
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SERVICE_OPTIONS.map((opt) => (
                  <Checkbox
                    key={opt.value}
                    label={opt.label}
                    checked={technical.services?.includes(opt.value) || false}
                    onCheckedChange={() =>
                      setTechnical({
                        ...technical,
                        services: toggleArray(technical.services, opt.value),
                      })
                    }
                  />
                ))}
              </div>
              {errors['services'] && (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors['services']}
                </p>
              )}
            </div>
            <SelectField
              label="Project Scale"
              placeholder="Select project scale"
              value={technical.projectScale || ''}
              onValueChange={(v) => setTechnical({ ...technical, projectScale: v })}
              options={PROJECT_SCALES}
              error={errors['projectScale']}
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Technical Requirements
              </label>
              <div className="grid grid-cols-2 gap-2">
                {REQUIREMENT_OPTIONS.map((opt) => (
                  <Checkbox
                    key={opt.value}
                    label={opt.label}
                    checked={technical.requirements?.includes(opt.value) || false}
                    onCheckedChange={() =>
                      setTechnical({
                        ...technical,
                        requirements: toggleArray(technical.requirements, opt.value),
                      })
                    }
                  />
                ))}
              </div>
              {errors['requirements'] && (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors['requirements']}
                </p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={contact.fullName || ''}
              onChange={(e) => setContact({ ...contact, fullName: e.target.value })}
              error={errors['fullName']}
            />
            <Input
              label="Work Email"
              type="email"
              placeholder="john@company.com"
              value={contact.email || ''}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              error={errors['email']}
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={contact.phone || ''}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              error={errors['phone']}
            />
            <Input
              label="Job Title"
              placeholder="CTO"
              value={contact.jobTitle || ''}
              onChange={(e) => setContact({ ...contact, jobTitle: e.target.value })}
              error={errors['jobTitle']}
            />
            <SelectField
              label="Preferred Meeting Format"
              placeholder="Select format"
              value={contact.meetingFormat || ''}
              onValueChange={(v) => setContact({ ...contact, meetingFormat: v })}
              options={MEETING_FORMATS}
              error={errors['meetingFormat']}
            />
            <SelectField
              label="How did you hear about us?"
              placeholder="Select source"
              value={contact.referralSource || ''}
              onValueChange={(v) => setContact({ ...contact, referralSource: v })}
              options={REFERRAL_SOURCES}
              error={errors['referralSource']}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto"
        showClose={!isSuccess}
      >
        {isSuccess ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30"
            >
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </motion.div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Thank you! We&apos;ll be in touch within 24 hours.
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Our team will reach out to{' '}
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {contact.email}
              </span>{' '}
              with next steps.
            </p>
            <Button className="mt-6" onClick={() => handleOpenChange(false)}>
              Close
            </Button>
          </motion.div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Get a Custom Quote</DialogTitle>
              <DialogDescription>
                Tell us about your project and we&apos;ll create a tailored proposal.
              </DialogDescription>
            </DialogHeader>

            <ProgressIndicator currentStep={currentStep} steps={STEPS} />

            <div className="min-h-[280px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between">
              {currentStep > 0 ? (
                <Button variant="ghost" onClick={handleBack} disabled={isSubmitting}>
                  Back
                </Button>
              ) : (
                <div />
              )}
              <Button onClick={handleNext} isLoading={isSubmitting}>
                {currentStep === STEPS.length - 1
                  ? isSubmitting
                    ? 'Submitting...'
                    : 'Submit Inquiry'
                  : 'Next'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
