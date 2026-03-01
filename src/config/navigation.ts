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
  { title: 'Solutions', href: '/solutions' },
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
    { title: 'Healthcare', href: '/work?category=healthcare' },
    { title: 'Finance', href: '/work?category=finance' },
    { title: 'E-commerce', href: '/work?category=retail' },
    { title: 'Education', href: '/work?category=education' },
    { title: 'Logistics', href: '/work?category=logistics' },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
    { title: 'Cookie Policy', href: '/cookies' },
    { title: 'Security', href: '/security' },
    { title: 'DPA', href: '/dpa' },
  ],
} as const;
