export const siteConfig = {
  name: 'Cognispace',
  description:
    'Cognispace is a technology studio focused on building intelligent products where human insight and machine intelligence work together.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://cognispace.com',
  ogImage: '/og-default.png',
  creator: 'Cognispace Technologies',
  keywords: [
    'AI platform',
    'machine learning',
    'AI-native tools',
    'enterprise AI',
    'AI infrastructure',
    'intelligent products',
    'AI services',
    'API platform',
  ],
  links: {
    github: 'https://github.com/cognispace',
    twitter: 'https://twitter.com/cognispace',
    linkedin: 'https://linkedin.com/company/cognispace',
    discord: 'https://discord.gg/cognispace',
  },
} as const;

export type SiteConfig = typeof siteConfig;
