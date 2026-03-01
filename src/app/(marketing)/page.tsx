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
      {/* 1. Hero — Studio positioning with 3D scene */}
      <HeroSection />

      {/* 2. Tech Stack Marquee */}
      <SocialProofMarquee />

      {/* 3. Industry Expertise — 3 vertical cards */}
      <CapabilitiesSection />

      {/* 4. Featured Project Deep Dive */}
      <CodeDemoSection />

      {/* 5. Impact Metrics — 4 animated counters */}
      <MetricsBar />

      {/* 6. Our Process — 3-step Discover/Build/Deploy */}
      <HowItWorksSection />

      {/* 7. Client Testimonials */}
      <TestimonialsSection />

      {/* 8. Contact CTA Banner */}
      <CTABannerSection />
    </>
  );
}
