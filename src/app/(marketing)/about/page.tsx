import type { Metadata } from 'next';
import { AboutPageContent } from './about-page-content';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet the team behind Cognispace. We are a technology studio building AI-powered software products.',
};

export default function AboutPage() {
  return <AboutPageContent />;
}
