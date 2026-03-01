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
    href: '/solutions',
    children: [
      {
        title: 'AI Strategy & Consulting',
        href: '/solutions#strategy',
        description: 'AI readiness assessments, roadmaps, and ROI modeling',
        icon: 'Lightbulb',
      },
      {
        title: 'Custom Software Development',
        href: '/solutions#development',
        description: 'Full-stack AI-powered products built from scratch',
        icon: 'Code',
      },
      {
        title: 'AI/ML Engineering',
        href: '/solutions#engineering',
        description: 'Custom models, NLP, computer vision, and data pipelines',
        icon: 'Brain',
      },
      {
        title: 'Ongoing AI Operations',
        href: '/solutions#operations',
        description: 'Post-launch support, monitoring, and continuous improvement',
        icon: 'Settings',
      },
    ],
  },
  {
    title: 'Solutions',
    href: '/solutions',
    children: [
      {
        title: 'Healthcare',
        href: '/solutions#healthcare',
        description: 'AI-powered diagnostics and clinical workflow automation',
      },
      {
        title: 'Finance',
        href: '/solutions#finance',
        description: 'Fraud detection, risk assessment, and trading tools',
      },
      {
        title: 'E-commerce',
        href: '/solutions#ecommerce',
        description: 'Recommendation engines and dynamic pricing',
      },
      {
        title: 'Legal',
        href: '/solutions#legal',
        description: 'Contract analysis and document intelligence',
      },
    ],
  },
  { title: 'Pricing', href: '/pricing' },
  { title: 'About', href: '/about' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
];

export const dashboardNavigation: NavItem[] = [
  { title: 'Overview', href: '/dashboard', icon: 'LayoutDashboard' },
  { title: 'Projects', href: '/dashboard/projects', icon: 'FolderKanban' },
  { title: 'Messages', href: '/dashboard/messages', icon: 'MessageSquare' },
  { title: 'Invoices', href: '/dashboard/invoices', icon: 'Receipt' },
  { title: 'Documents', href: '/dashboard/documents', icon: 'FileText' },
  { title: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
  { title: 'Support', href: '/dashboard/support', icon: 'LifeBuoy' },
];

export const footerNavigation = {
  services: [
    { title: 'AI Strategy & Consulting', href: '/solutions#strategy' },
    { title: 'Custom Software Development', href: '/solutions#development' },
    { title: 'AI/ML Engineering', href: '/solutions#engineering' },
    { title: 'Ongoing AI Operations', href: '/solutions#operations' },
    { title: 'Pricing', href: '/pricing' },
  ],
  company: [
    { title: 'About', href: '/about' },
    { title: 'Careers', href: '/careers' },
    { title: 'Blog', href: '/blog' },
    { title: 'Contact', href: '/contact' },
    { title: 'Partners', href: '/partners' },
  ],
  industries: [
    { title: 'Healthcare', href: '/solutions#healthcare' },
    { title: 'Finance', href: '/solutions#finance' },
    { title: 'Legal', href: '/solutions#legal' },
    { title: 'E-commerce', href: '/solutions#ecommerce' },
    { title: 'Education', href: '/solutions#education' },
    { title: 'Logistics', href: '/solutions#logistics' },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
    { title: 'Cookie Policy', href: '/cookies' },
    { title: 'Security', href: '/security' },
    { title: 'DPA', href: '/dpa' },
  ],
} as const;
