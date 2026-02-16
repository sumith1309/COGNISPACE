import { HeroSection } from '@/components/marketing/hero/hero-section';
import { SocialProofMarquee } from '@/components/marketing/social-proof-marquee';
import { CapabilitiesSection } from '@/components/marketing/capabilities-section';
import { CodeDemoSection } from '@/components/marketing/code-demo-section';
import { MetricsBar } from '@/components/marketing/metrics-bar';
import { HowItWorksSection } from '@/components/marketing/how-it-works-section';
import { TestimonialsSection } from '@/components/marketing/testimonials-section';
import { CTABannerSection } from '@/components/marketing/cta-banner-section';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section - 100vh with 3D scene */}
      <HeroSection />

      {/* 2. Social Proof Marquee */}
      <SocialProofMarquee />

      {/* 3. Core Capabilities - 3 feature cards */}
      <CapabilitiesSection />

      {/* 4. Interactive Code Demo */}
      <CodeDemoSection />

      {/* 5. Metrics Bar - 4 animated counters */}
      <MetricsBar />

      {/* 6. How It Works - 3-step process */}
      <HowItWorksSection />

      {/* 7. Testimonials Carousel */}
      <TestimonialsSection />

      {/* 8. Final CTA Banner */}
      <CTABannerSection />
    </>
  );
}
