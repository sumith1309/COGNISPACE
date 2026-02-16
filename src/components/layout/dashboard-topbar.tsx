'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search, Bell, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/shared/theme-toggle';

export function DashboardTopbar() {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((segment, index) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
    href: '/' + segments.slice(0, index + 1).join('/'),
    isLast: index === segments.length - 1,
  }));

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-full items-center justify-between px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              {index > 0 && <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-600" />}
              {crumb.isLast ? (
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href as any}
                  className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <Button variant="ghost" size="sm" className="gap-2 text-slate-500 dark:text-slate-400">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search...</span>
            <Badge
              variant="outline"
              className="text-2xs ml-auto hidden px-1.5 py-0.5 font-mono sm:inline-flex"
            >
              ⌘K
            </Badge>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Avatar */}
          <Avatar className="h-8 w-8">
            <AvatarImage src={undefined} alt="User" />
            <AvatarFallback className="bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs">
              DU
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
