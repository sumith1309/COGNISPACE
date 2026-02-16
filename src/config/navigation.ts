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
    title: 'Products',
    href: '/products',
    children: [
      {
        title: 'AI Playground',
        href: '/dashboard/playground',
        description: 'Test and explore AI models interactively',
        icon: 'Sparkles',
      },
      {
        title: 'Model Catalog',
        href: '/dashboard/models',
        description: 'Browse available AI models and services',
        icon: 'Layers',
      },
      {
        title: 'API Platform',
        href: '/docs',
        description: 'Comprehensive API documentation and SDKs',
        icon: 'Code',
      },
      {
        title: 'Enterprise',
        href: '/enterprise',
        description: 'Custom solutions for large organizations',
        icon: 'Building2',
      },
    ],
  },
  {
    title: 'Solutions',
    href: '/solutions',
    children: [
      { title: 'Healthcare', href: '/solutions#healthcare', description: 'AI for medical data analysis and diagnostics' },
      { title: 'Finance', href: '/solutions#finance', description: 'Intelligent risk assessment and automation' },
      { title: 'E-commerce', href: '/solutions#ecommerce', description: 'Personalization and recommendation engines' },
      { title: 'Legal', href: '/solutions#legal', description: 'Document analysis and contract intelligence' },
    ],
  },
  { title: 'Pricing', href: '/pricing' },
  { title: 'Docs', href: '/docs' },
  { title: 'Blog', href: '/blog' },
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
  product: [
    { title: 'AI Playground', href: '/dashboard/playground' },
    { title: 'Model Catalog', href: '/dashboard/models' },
    { title: 'API Platform', href: '/docs' },
    { title: 'SDKs', href: '/docs/sdks' },
    { title: 'Status', href: '/status' },
  ],
  company: [
    { title: 'About', href: '/about' },
    { title: 'Careers', href: '/careers' },
    { title: 'Blog', href: '/blog' },
    { title: 'Press', href: '/press' },
    { title: 'Partners', href: '/partners' },
  ],
  resources: [
    { title: 'Documentation', href: '/docs' },
    { title: 'Tutorials', href: '/docs/tutorials' },
    { title: 'API Reference', href: '/docs/api' },
    { title: 'Community', href: '/community' },
    { title: 'Changelog', href: '/changelog' },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
    { title: 'Cookie Policy', href: '/cookies' },
    { title: 'Security', href: '/security' },
    { title: 'DPA', href: '/dpa' },
  ],
} as const;
