import { z } from 'zod';

/* ─── Step 1: Company Information ─── */

export const companyStepSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  website: z.string().url('Please enter a valid URL').or(z.literal('')).optional().default(''),
  companySize: z.string().min(1, 'Please select a company size'),
  industry: z.string().min(1, 'Please select an industry'),
});

export type CompanyStepData = z.infer<typeof companyStepSchema>;

/* ─── Step 2: Project Details ─── */

export const projectStepSchema = z.object({
  useCase: z.string().min(10, 'Please describe your project (at least 10 characters)'),
  timeline: z.string().min(1, 'Please select a timeline'),
  budget: z.string().min(1, 'Please select a budget range'),
});

export type ProjectStepData = z.infer<typeof projectStepSchema>;

/* ─── Step 3: Technical Requirements ─── */

export const technicalStepSchema = z.object({
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  projectScale: z.string().min(1, 'Please select a project scale'),
  requirements: z.array(z.string()).min(1, 'Please select at least one requirement'),
});

export type TechnicalStepData = z.infer<typeof technicalStepSchema>;

/* ─── Step 4: Contact Information ─── */

export const contactStepSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().default(''),
  jobTitle: z.string().optional().default(''),
  meetingFormat: z.string().min(1, 'Please select a meeting format'),
  referralSource: z.string().min(1, 'Please select how you heard about us'),
});

export type ContactStepData = z.infer<typeof contactStepSchema>;

/* ─── Combined Type ─── */

export interface EnterpriseFormData {
  company: CompanyStepData;
  project: ProjectStepData;
  technical: TechnicalStepData;
  contact: ContactStepData;
}

/* ─── Dropdown Options ─── */

export const COMPANY_SIZES = [
  { value: '1-10', label: '1-10' },
  { value: '11-50', label: '11-50' },
  { value: '51-200', label: '51-200' },
  { value: '201-1000', label: '201-1,000' },
  { value: '1000+', label: '1,000+' },
];

export const INDUSTRIES = [
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'legal', label: 'Legal' },
  { value: 'technology', label: 'Technology' },
  { value: 'education', label: 'Education' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'media', label: 'Media' },
  { value: 'other', label: 'Other' },
];

export const TIMELINES = [
  { value: 'immediately', label: 'Immediately' },
  { value: '1-3-months', label: '1-3 months' },
  { value: '3-6-months', label: '3-6 months' },
  { value: '6-12-months', label: '6-12 months' },
  { value: 'exploring', label: 'Just exploring' },
];

export const BUDGETS = [
  { value: 'under-25k', label: 'Under $25,000' },
  { value: '25k-50k', label: '$25,000-$50,000' },
  { value: '50k-100k', label: '$50,000-$100,000' },
  { value: '100k-250k', label: '$100,000-$250,000' },
  { value: '250k+', label: '$250,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
];

export const SERVICE_OPTIONS = [
  { value: 'custom-dev', label: 'Custom AI Software Development' },
  { value: 'ai-ml', label: 'AI/ML Engineering' },
  { value: 'consulting', label: 'AI Strategy & Consulting' },
  { value: 'ongoing-support', label: 'Ongoing AI Operations' },
];

export const PROJECT_SCALES = [
  { value: 'mvp', label: 'MVP / Proof of Concept' },
  { value: 'small', label: 'Small (1-2 months)' },
  { value: 'medium', label: 'Medium (3-6 months)' },
  { value: 'large', label: 'Large (6-12 months)' },
  { value: 'enterprise', label: 'Enterprise (12+ months)' },
];

export const REQUIREMENT_OPTIONS = [
  { value: 'web-app', label: 'Web Application' },
  { value: 'mobile-app', label: 'Mobile Application' },
  { value: 'api-backend', label: 'API / Backend' },
  { value: 'data-pipeline', label: 'Data Pipeline' },
  { value: 'ml-models', label: 'ML Models' },
  { value: 'cloud-infra', label: 'Cloud Infrastructure' },
];

export const MEETING_FORMATS = [
  { value: 'video', label: 'Video call' },
  { value: 'phone', label: 'Phone call' },
  { value: 'email', label: 'Email only' },
];

export const REFERRAL_SOURCES = [
  { value: 'search', label: 'Search engine' },
  { value: 'social', label: 'Social media' },
  { value: 'referral', label: 'Referral' },
  { value: 'blog', label: 'Blog' },
  { value: 'conference', label: 'Conference' },
  { value: 'other', label: 'Other' },
];
