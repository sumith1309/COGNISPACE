import type { Metadata } from 'next';
import { ContactPageContent } from './contact-page-content';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Start a conversation with Cognispace. Tell us about your project and we'll explore how AI can help.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
