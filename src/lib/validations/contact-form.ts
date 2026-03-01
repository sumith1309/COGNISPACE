import { z } from 'zod';

/* ─── Contact Form Schema ─── */

export const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  serviceType: z.enum([
    'custom-software',
    'ai-consulting',
    'ongoing-support',
    'partnership',
    'other',
  ]),
  description: z.string().min(10, 'Please describe your project (at least 10 characters)'),
  budget: z.enum(['under-25k', '25k-50k', '50k-100k', '100k-250k', '250k+', 'not-sure']).optional(),
  referralSource: z
    .enum(['search', 'social', 'referral', 'blog', 'conference', 'other'])
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/* ─── Display Label Options ─── */

export const SERVICE_OPTIONS = [
  { value: 'custom-software', label: 'I need custom software built' },
  { value: 'ai-consulting', label: 'I need AI/ML consulting' },
  { value: 'ongoing-support', label: 'I need ongoing AI support' },
  { value: 'partnership', label: 'I want to discuss a partnership' },
  { value: 'other', label: 'Other' },
] as const;

export const BUDGET_OPTIONS = [
  { value: 'under-25k', label: 'Under $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: '100k-250k', label: '$100,000 - $250,000' },
  { value: '250k+', label: '$250,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const;

export const REFERRAL_OPTIONS = [
  { value: 'search', label: 'Search engine' },
  { value: 'social', label: 'Social media' },
  { value: 'referral', label: 'Referral' },
  { value: 'blog', label: 'Blog / Article' },
  { value: 'conference', label: 'Conference / Event' },
  { value: 'other', label: 'Other' },
] as const;
