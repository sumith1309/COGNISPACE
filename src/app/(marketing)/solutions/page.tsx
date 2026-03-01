import type { Metadata } from 'next';
import { SolutionsPageContent } from './solutions-content';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Custom AI-powered software solutions for healthcare, finance, legal, e-commerce, education, and logistics. See how Cognispace builds intelligent products.',
};

export default function SolutionsPage() {
  return <SolutionsPageContent />;
}
