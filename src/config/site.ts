export const siteConfig = {
  name: 'Cognispace',
  description:
    'Cognispace is a technology studio that builds custom AI-powered software products. From strategy to deployment, we partner with companies to design, build, and ship intelligent software.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://cognispace.com',
  ogImage: '/og-default.png',
  creator: 'Cognispace Technologies',
  keywords: [
    'AI software development',
    'custom AI solutions',
    'technology studio',
    'AI consulting',
    'machine learning engineering',
    'intelligent software',
    'AI-powered products',
    'software development agency',
  ],
  links: {
    github: 'https://github.com/cognispace',
    twitter: 'https://twitter.com/cognispace',
    linkedin: 'https://linkedin.com/company/cognispace',
    discord: 'https://discord.gg/cognispace',
  },
} as const;

export type SiteConfig = typeof siteConfig;
