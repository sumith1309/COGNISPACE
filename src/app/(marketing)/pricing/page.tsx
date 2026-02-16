import type { Metadata } from 'next';
import { PricingSections } from '@/components/marketing/pricing-sections';
import { PricingCalculator } from '@/components/marketing/pricing-calculator';
import { FeatureComparison } from '@/components/marketing/feature-comparison';
import { FAQSection } from '@/components/marketing/faq-section';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for Cognispace AI Platform. Start free, scale as you grow.',
};

export default function PricingPage() {
  return (
    <PricingSections>
      <PricingCalculator />
      <FeatureComparison />
      <FAQSection />
    </PricingSections>
  );
}
