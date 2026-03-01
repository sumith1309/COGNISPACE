/* ─── Types ─── */

export type PlanTier = 'starter' | 'pro' | 'enterprise';

export interface PlanFeature {
  name: string;
  highlighted?: boolean;
}

export interface PricingPlan {
  id: PlanTier;
  name: string;
  description: string;
  monthlyPrice: number | null; // null = custom
  annualPrice: number | null;
  priceLabel: string; // e.g. "From $15,000" or "Custom"
  features: PlanFeature[];
  cta: { text: string; href?: string };
  badge?: string;
}

export interface FeatureRow {
  name: string;
  starter: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
}

export interface FeatureCategory {
  category: string;
  features: FeatureRow[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

/* ─── Plan Cards Data ─── */

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Project',
    description: 'Perfect for MVPs, proof-of-concepts, and small-scale AI features',
    monthlyPrice: 15000,
    annualPrice: 15000,
    priceLabel: 'From $15,000',
    cta: { text: 'Get Started', href: '/contact' },
    features: [
      { name: 'Discovery workshop' },
      { name: 'UI/UX design' },
      { name: 'Core development (up to 6 weeks)' },
      { name: '1 AI model integration' },
      { name: 'Staging & production deployment' },
      { name: '30-day post-launch support' },
    ],
  },
  {
    id: 'pro',
    name: 'Growth',
    description: 'For companies building comprehensive AI-powered products',
    monthlyPrice: 50000,
    annualPrice: 50000,
    priceLabel: 'From $50,000',
    badge: 'Most Popular',
    cta: { text: 'Start a Project', href: '/contact' },
    features: [
      { name: 'Everything in Starter, plus:', highlighted: true },
      { name: 'Full product development (up to 16 weeks)' },
      { name: 'Multiple AI/ML integrations' },
      { name: 'Custom model training' },
      { name: 'Advanced analytics dashboard' },
      { name: 'Dedicated project manager' },
      { name: '90-day post-launch support' },
      { name: 'Priority communication channel' },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations with complex, large-scale AI initiatives',
    monthlyPrice: null,
    annualPrice: null,
    priceLabel: 'Custom',
    cta: { text: 'Contact Sales' },
    features: [
      { name: 'Everything in Growth, plus:', highlighted: true },
      { name: 'Unlimited project scope' },
      { name: 'Dedicated development team' },
      { name: 'Custom SLA with 99.9% uptime' },
      { name: 'On-premise deployment option' },
      { name: '24/7 support' },
      { name: 'Quarterly business reviews' },
      { name: 'Staff augmentation available' },
    ],
  },
];

/* ─── Feature Comparison Data ─── */

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    category: 'Project Scope',
    features: [
      {
        name: 'Development timeline',
        starter: 'Up to 6 weeks',
        pro: 'Up to 16 weeks',
        enterprise: 'Custom',
      },
      { name: 'AI model integrations', starter: '1', pro: 'Multiple', enterprise: 'Unlimited' },
      { name: 'Discovery workshop', starter: true, pro: true, enterprise: true },
      { name: 'Custom model training', starter: false, pro: true, enterprise: true },
    ],
  },
  {
    category: 'Design & UX',
    features: [
      { name: 'UI/UX design', starter: true, pro: true, enterprise: true },
      { name: 'Design system', starter: 'Basic', pro: 'Full', enterprise: 'Custom' },
      { name: 'Interactive prototype', starter: true, pro: true, enterprise: true },
      { name: 'User research', starter: false, pro: true, enterprise: true },
    ],
  },
  {
    category: 'AI & Technology',
    features: [
      { name: 'NLP / Language models', starter: true, pro: true, enterprise: true },
      { name: 'Computer vision', starter: false, pro: true, enterprise: true },
      { name: 'Custom ML pipelines', starter: false, pro: true, enterprise: true },
      { name: 'Data engineering', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
      { name: 'Analytics dashboard', starter: false, pro: true, enterprise: 'Custom' },
    ],
  },
  {
    category: 'Delivery & Deployment',
    features: [
      { name: 'Cloud deployment', starter: true, pro: true, enterprise: true },
      { name: 'On-premise option', starter: false, pro: false, enterprise: true },
      { name: 'CI/CD pipeline', starter: true, pro: true, enterprise: true },
      { name: 'API documentation', starter: true, pro: true, enterprise: true },
      { name: 'Source code ownership', starter: true, pro: true, enterprise: true },
    ],
  },
  {
    category: 'Support & Communication',
    features: [
      { name: 'Post-launch support', starter: '30 days', pro: '90 days', enterprise: 'Ongoing' },
      { name: 'Dedicated project manager', starter: false, pro: true, enterprise: true },
      { name: 'Weekly progress demos', starter: true, pro: true, enterprise: true },
      { name: 'Priority communication', starter: false, pro: true, enterprise: true },
      { name: 'Quarterly business reviews', starter: false, pro: false, enterprise: true },
      { name: '24/7 support', starter: false, pro: false, enterprise: true },
    ],
  },
];

/* ─── FAQ Data ─── */

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What's included in the Starter Project tier?",
    answer:
      'The Starter Project tier is designed for MVPs and proof-of-concepts. It includes a discovery workshop, UI/UX design, up to 6 weeks of core development, 1 AI model integration, staging and production deployment, and 30 days of post-launch support. You own all the source code.',
  },
  {
    question: 'How does the engagement process work?',
    answer:
      'We start with a free consultation to understand your project. After that, we\u2019ll provide a detailed proposal with scope, timeline, and cost. Once approved, we kick off with a discovery workshop, then move through design, development, and launch phases with weekly progress demos throughout.',
  },
  {
    question: 'Who owns the intellectual property?',
    answer:
      'You do. All source code, designs, models, and documentation we create during the project are fully owned by you upon delivery. We believe in building products that are truly yours.',
  },
  {
    question: 'What are the payment terms?',
    answer:
      'We typically structure payments in milestones: 30% upfront to begin, 40% at the midpoint, and 30% on delivery. For Enterprise engagements, we offer flexible terms including monthly retainers and custom invoicing schedules.',
  },
  {
    question: 'Can the project scope change during development?',
    answer:
      'Yes, we use an agile approach with built-in flexibility. If requirements evolve, we\u2019ll discuss the impact on timeline and budget transparently. Small changes are often absorbed; significant scope changes are documented in a change order.',
  },
  {
    question: 'What technologies do you use?',
    answer:
      'We work with modern tech stacks including React, Next.js, Python, TensorFlow, PyTorch, PostgreSQL, and cloud platforms like AWS and GCP. We choose the best tools for each project \u2014 not a one-size-fits-all approach.',
  },
  {
    question: 'What kind of support do Enterprise clients get?',
    answer:
      'Enterprise clients receive a dedicated development team, a named project manager, 24/7 support, quarterly business reviews, and custom SLAs. We also offer staff augmentation if you need to embed our engineers within your team.',
  },
  {
    question: 'How accurate are the project estimates?',
    answer:
      'Our estimates are based on detailed scope analysis during the discovery phase. We provide a range (e.g., $45K\u2013$60K) and work to deliver within that range. If anything threatens to go over, we flag it early and discuss options.',
  },
];

/* ─── Calculator ─── */

export const COMPLEXITY_STEPS = [
  { label: 'Simple MVP', value: 1 },
  { label: 'Standard App', value: 2 },
  { label: 'Complex App', value: 3 },
  { label: 'Multi-system', value: 4 },
  { label: 'Enterprise Platform', value: 5 },
];

export const AI_FEATURE_STEPS = [
  { label: '1 basic', value: 1 },
  { label: '2 features', value: 2 },
  { label: '3 features', value: 3 },
  { label: '4 features', value: 4 },
  { label: '5+ advanced', value: 5 },
];

export const TIMELINE_STEPS = [
  { label: '4 weeks', value: 4 },
  { label: '8 weeks', value: 8 },
  { label: '12 weeks', value: 12 },
  { label: '16 weeks', value: 16 },
  { label: '24+ weeks', value: 24 },
];

export interface ProjectEstimate {
  lowRange: number;
  highRange: number;
  tier: 'starter' | 'growth' | 'enterprise';
}

export function calculateProjectEstimate(
  complexity: number,
  aiFeatures: number,
  timeline: number
): ProjectEstimate {
  // Base calculation
  const complexityMultiplier = complexity * 8000;
  const aiMultiplier = aiFeatures * 5000;
  const timelineMultiplier = timeline * 1200;

  const base = complexityMultiplier + aiMultiplier + timelineMultiplier;
  const lowRange = Math.round((base * 0.85) / 1000) * 1000;
  const highRange = Math.round((base * 1.25) / 1000) * 1000;

  let tier: 'starter' | 'growth' | 'enterprise';
  if (highRange <= 25000) {
    tier = 'starter';
  } else if (highRange <= 120000) {
    tier = 'growth';
  } else {
    tier = 'enterprise';
  }

  return { lowRange, highRange, tier };
}
