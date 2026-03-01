import type { Metadata } from 'next';
import { PricingSections } from '@/components/marketing/pricing-sections';
import { PricingCalculator } from '@/components/marketing/pricing-calculator';
import { FeatureComparison } from '@/components/marketing/feature-comparison';
import { FAQSection } from '@/components/marketing/faq-section';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent project pricing for custom AI software development. Starter projects from $15K, Growth from $50K, Enterprise custom.',
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
