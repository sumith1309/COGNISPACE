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
  useCase: z.string().min(10, 'Please describe your use case (at least 10 characters)'),
  timeline: z.string().min(1, 'Please select a timeline'),
  budget: z.string().min(1, 'Please select a budget range'),
});

export type ProjectStepData = z.infer<typeof projectStepSchema>;

/* ─── Step 3: Technical Requirements ─── */

export const technicalStepSchema = z.object({
  models: z.array(z.string()).min(1, 'Please select at least one model'),
  apiVolume: z.string().min(1, 'Please select expected API volume'),
  integrations: z.array(z.string()).min(1, 'Please select at least one integration'),
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
  { value: 'under-1k', label: 'Under $1,000/mo' },
  { value: '1k-5k', label: '$1,000-5,000/mo' },
  { value: '5k-20k', label: '$5,000-20,000/mo' },
  { value: '20k+', label: '$20,000+/mo' },
  { value: 'not-sure', label: 'Not sure yet' },
];

export const MODEL_OPTIONS = [
  { value: 'nlp', label: 'NLP / Text Generation' },
  { value: 'vision', label: 'Vision / Image Analysis' },
  { value: 'audio', label: 'Audio / Speech' },
  { value: 'multimodal', label: 'Multimodal' },
  { value: 'embeddings', label: 'Embeddings / Search' },
  { value: 'fine-tuned', label: 'Custom Fine-tuned' },
];

export const API_VOLUMES = [
  { value: 'under-100k', label: 'Under 100K calls' },
  { value: '100k-1m', label: '100K-1M' },
  { value: '1m-10m', label: '1M-10M' },
  { value: '10m+', label: '10M+' },
];

export const INTEGRATION_OPTIONS = [
  { value: 'rest-api', label: 'REST API' },
  { value: 'python-sdk', label: 'Python SDK' },
  { value: 'javascript-sdk', label: 'JavaScript SDK' },
  { value: 'websocket', label: 'WebSocket / Streaming' },
  { value: 'on-premise', label: 'On-premise deployment' },
  { value: 'custom-sla', label: 'Custom SLA' },
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
