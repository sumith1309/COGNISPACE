/* ─── Types ─── */

export type BillingPeriod = 'monthly' | 'annual';
export type PlanTier = 'starter' | 'pro' | 'enterprise';

export interface PlanFeature {
  name: string;
  highlighted?: boolean; // e.g. "Everything in Starter, plus:"
}

export interface PricingPlan {
  id: PlanTier;
  name: string;
  description: string;
  monthlyPrice: number | null; // null = custom
  annualPrice: number | null;
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
    name: 'Starter',
    description: 'Perfect for exploring and prototyping',
    monthlyPrice: 0,
    annualPrice: 0,
    cta: { text: 'Get Started Free', href: '/auth/signup' },
    features: [
      { name: '1,000 API calls/month' },
      { name: '3 base models' },
      { name: '20 requests/minute' },
      { name: 'Community support' },
      { name: '1 team member' },
      { name: 'Basic analytics' },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For teams shipping AI-powered products',
    monthlyPrice: 49,
    annualPrice: 39,
    badge: 'Most Popular',
    cta: { text: 'Start Free Trial', href: '/auth/signup' },
    features: [
      { name: 'Everything in Starter, plus:', highlighted: true },
      { name: '100,000 API calls/month' },
      { name: 'All models' },
      { name: '200 requests/minute' },
      { name: 'Priority email support' },
      { name: '5 team members' },
      { name: 'Advanced analytics' },
      { name: 'Webhook integrations' },
      { name: 'Custom API key scopes' },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations with advanced requirements',
    monthlyPrice: null,
    annualPrice: null,
    cta: { text: 'Contact Sales' },
    features: [
      { name: 'Everything in Pro, plus:', highlighted: true },
      { name: 'Unlimited API calls' },
      { name: 'Custom fine-tuned models' },
      { name: 'Custom rate limits' },
      { name: 'Dedicated support + SLA' },
      { name: 'Unlimited team members' },
      { name: 'Custom dashboards' },
      { name: 'SSO / SAML' },
      { name: 'Dedicated infrastructure' },
      { name: 'Custom SLA (99.99%)' },
    ],
  },
];

/* ─── Feature Comparison Data ─── */

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    category: 'API Access',
    features: [
      { name: 'Monthly API calls', starter: '1,000', pro: '100,000', enterprise: 'Unlimited' },
      { name: 'Rate limit', starter: '20/min', pro: '200/min', enterprise: 'Custom' },
      { name: 'Concurrent requests', starter: '2', pro: '20', enterprise: 'Custom' },
      { name: 'Request timeout', starter: '30s', pro: '60s', enterprise: 'Custom' },
    ],
  },
  {
    category: 'Models & Inference',
    features: [
      { name: 'Base models', starter: '3', pro: 'All', enterprise: 'All' },
      { name: 'Custom fine-tuned', starter: false, pro: false, enterprise: true },
      { name: 'Streaming responses', starter: true, pro: true, enterprise: true },
      { name: 'Batch processing', starter: false, pro: true, enterprise: true },
      { name: 'Model playground', starter: true, pro: true, enterprise: true },
    ],
  },
  {
    category: 'Security & Compliance',
    features: [
      { name: 'API key encryption', starter: true, pro: true, enterprise: true },
      { name: 'SSO / SAML', starter: false, pro: false, enterprise: true },
      { name: 'SOC 2 report', starter: false, pro: false, enterprise: true },
      { name: 'Custom DPA', starter: false, pro: false, enterprise: true },
      { name: 'IP allowlisting', starter: false, pro: false, enterprise: true },
    ],
  },
  {
    category: 'Support & SLA',
    features: [
      {
        name: 'Support channel',
        starter: 'Community',
        pro: 'Email (24h)',
        enterprise: 'Dedicated (1h)',
      },
      { name: 'Uptime SLA', starter: '—', pro: '99.9%', enterprise: '99.99%' },
      { name: 'Onboarding', starter: 'Docs', pro: 'Guided', enterprise: 'White-glove' },
      { name: 'Status page', starter: true, pro: true, enterprise: '✔ + custom' },
    ],
  },
  {
    category: 'Collaboration',
    features: [
      { name: 'Team members', starter: '1', pro: '5', enterprise: 'Unlimited' },
      { name: 'Additional seats', starter: '—', pro: '$10/seat', enterprise: 'Custom' },
      { name: 'Role-based access', starter: false, pro: true, enterprise: true },
      { name: 'Audit log', starter: false, pro: false, enterprise: true },
    ],
  },
  {
    category: 'Analytics',
    features: [
      { name: 'Usage dashboard', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
      { name: 'Webhook events', starter: false, pro: true, enterprise: '✔ + custom' },
      { name: 'Data export (CSV)', starter: false, pro: true, enterprise: true },
      { name: 'Real-time metrics', starter: false, pro: true, enterprise: true },
    ],
  },
];

/* ─── FAQ Data ─── */

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What's included in the free Starter plan?",
    answer:
      'The Starter plan includes 1,000 API calls per month, access to 3 base models, basic analytics, and community support. It\u2019s perfect for prototyping and personal projects. No credit card required.',
  },
  {
    question: 'Can I upgrade or downgrade at any time?',
    answer:
      'Yes! You can upgrade to Pro instantly and start using additional features right away. If you downgrade, the change takes effect at the end of your current billing period. No penalties or fees.',
  },
  {
    question: 'How does the billing work for API overages?',
    answer:
      'On the Pro plan, if you exceed your 100,000 monthly API call limit, additional calls are billed at $0.002 per 1,000 tokens. You\u2019ll receive email alerts at 80% and 90% of your limit so there are no surprises.',
  },
  {
    question: 'Do you offer a free trial of the Pro plan?',
    answer:
      'Yes! Every new Pro subscription starts with a 14-day free trial with full access to all features. No credit card required to start your trial.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, American Express) and process payments securely through Stripe. For Enterprise customers, we also support invoicing and wire transfers.',
  },
  {
    question: 'Is there a discount for annual billing?',
    answer:
      'Yes, annual billing saves you 20% compared to monthly billing. That\u2019s $39/month billed annually instead of $49/month billed monthly.',
  },
  {
    question: 'What kind of support do Enterprise customers get?',
    answer:
      'Enterprise customers receive a dedicated account manager, 1-hour response time SLA, private Slack channel with our engineering team, custom onboarding, and quarterly business reviews.',
  },
  {
    question: "Can I get a custom plan that doesn't fit the standard tiers?",
    answer:
      'Absolutely. Contact our sales team and we\u2019ll work with you to create a plan that matches your exact requirements, including custom rate limits, dedicated infrastructure, and volume pricing.',
  },
];

/* ─── Calculator ─── */

export const API_CALL_STEPS = [
  1_000, 5_000, 10_000, 25_000, 50_000, 100_000, 250_000, 500_000, 1_000_000, 2_500_000, 5_000_000,
  10_000_000,
];

export const TOKEN_STEPS = [100, 250, 500, 1_000, 2_000, 4_000, 8_000, 10_000];

export interface PricingEstimate {
  plan: 'starter' | 'pro';
  baseCost: number;
  tokenOverage: number;
  seatOverage: number;
  total: number;
}

/**
 * Calculate estimated monthly cost based on usage.
 *
 * Logic:
 * - ≤ 1,000 API calls → Free (Starter)
 * - > 1,000 API calls → $49/mo (Pro base)
 * - Token overage: Pro includes 10M tokens/month, overage $0.002 per 1K tokens
 * - Seat overage: Pro includes 5, additional $10/seat/month
 */
export function calculateEstimate(
  apiCalls: number,
  tokensPerRequest: number,
  teamMembers: number
): PricingEstimate {
  // Starter is sufficient
  if (apiCalls <= 1_000 && teamMembers <= 1) {
    return { plan: 'starter', baseCost: 0, tokenOverage: 0, seatOverage: 0, total: 0 };
  }

  const baseCost = 49;

  // Token overage
  const totalTokens = apiCalls * tokensPerRequest;
  const includedTokens = 10_000_000; // 10M tokens included in Pro
  const tokenOverage =
    totalTokens > includedTokens ? ((totalTokens - includedTokens) / 1_000) * 0.002 : 0;

  // Seat overage
  const includedSeats = 5;
  const seatOverage = teamMembers > includedSeats ? (teamMembers - includedSeats) * 10 : 0;

  return {
    plan: 'pro',
    baseCost,
    tokenOverage: Math.round(tokenOverage * 100) / 100,
    seatOverage,
    total: Math.round((baseCost + tokenOverage + seatOverage) * 100) / 100,
  };
}
