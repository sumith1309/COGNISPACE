import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProjectShowcase } from '@/components/marketing/project-showcase';

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Explore 60+ AI projects across finance, healthcare, education, retail, and more. See how Cognispace builds intelligent solutions that ship.',
};

export default function WorkPage() {
  return (
    <Suspense>
      <ProjectShowcase />
    </Suspense>
  );
}
