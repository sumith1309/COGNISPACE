import Link from 'next/link';
import { Logo } from '@/components/shared/logo';
import { Separator } from '@/components/ui/separator';

const footerLinks = [
  { title: 'Solutions', href: '/solutions' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'Our Work', href: '/work' },
  { title: 'About', href: '/about' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <Logo size="sm" />

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href as '/'}
                className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>

        <Separator className="my-6" />

        <p className="text-center text-sm text-slate-400 dark:text-slate-500">
          &copy; {new Date().getFullYear()} Cognispace Technologies
        </p>
      </div>
    </footer>
  );
}
