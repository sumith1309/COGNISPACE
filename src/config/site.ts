export const siteConfig = {
  name: 'Cognispace',
  description:
    'Cognispace is a technology studio that designs and builds intelligent AI solutions — from research to production — across finance, healthcare, education, and beyond.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://cognispace.com',
  ogImage: '/og-default.png',
  creator: 'Cognispace Technologies',
  keywords: [
    'AI studio',
    'technology studio',
    'AI solutions',
    'machine learning consulting',
    'AI development agency',
    'custom AI development',
    'AI projects portfolio',
    'AI for finance',
    'AI for healthcare',
    'AI for education',
  ],
  links: {
    github: 'https://github.com/cognispace',
    twitter: 'https://twitter.com/cognispace',
    linkedin: 'https://linkedin.com/company/cognispace',
    discord: 'https://discord.gg/cognispace',
  },
} as const;

export type SiteConfig = typeof siteConfig;
