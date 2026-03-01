export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  children?: NavItem[];
  badge?: string;
  external?: boolean;
}

export const mainNavigation: NavItem[] = [
  {
    title: 'Services',
    href: '/services',
    children: [
      {
        title: 'AI Strategy & Discovery',
        href: '/services#strategy',
        description: 'Problem scoping, feasibility analysis, and AI roadmapping',
        icon: 'Lightbulb',
      },
      {
        title: 'Custom AI Development',
        href: '/services#development',
        description: 'End-to-end design, build, and deploy of AI solutions',
        icon: 'Code',
      },
      {
        title: 'MLOps & Infrastructure',
        href: '/services#mlops',
        description: 'Production pipelines, monitoring, and scaling',
        icon: 'Server',
      },
      {
        title: 'AI Audits & Ethics',
        href: '/services#audits',
        description: 'Bias analysis, explainability, and governance compliance',
        icon: 'Shield',
      },
    ],
  },
  { title: 'Work', href: '/work' },
  { title: 'About', href: '/about' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
];

export const dashboardNavigation: NavItem[] = [
  { title: 'Overview', href: '/dashboard', icon: 'LayoutDashboard' },
  { title: 'Playground', href: '/dashboard/playground', icon: 'Sparkles' },
  { title: 'Models', href: '/dashboard/models', icon: 'Layers' },
  { title: 'API Keys', href: '/dashboard/api-keys', icon: 'Key' },
  { title: 'Usage', href: '/dashboard/usage', icon: 'BarChart3' },
  { title: 'Billing', href: '/dashboard/billing', icon: 'CreditCard' },
  { title: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
  { title: 'Support', href: '/dashboard/support', icon: 'LifeBuoy' },
];

export const footerNavigation = {
  services: [
    { title: 'AI Strategy', href: '/services#strategy' },
    { title: 'Custom Development', href: '/services#development' },
    { title: 'MLOps & Infra', href: '/services#mlops' },
    { title: 'AI Audits', href: '/services#audits' },
  ],
  company: [
    { title: 'About', href: '/about' },
    { title: 'Blog', href: '/blog' },
    { title: 'Careers', href: '/careers' },
    { title: 'Contact', href: '/contact' },
  ],
  industries: [
    { title: 'Finance', href: '/work?category=finance' },
    { title: 'Healthcare', href: '/work?category=healthcare' },
    { title: 'Education', href: '/work?category=education' },
    { title: 'Retail', href: '/work?category=retail' },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
    { title: 'Cookie Policy', href: '/cookies' },
  ],
} as const;
