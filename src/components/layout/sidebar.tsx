'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { dashboardNavigation } from '@/config/navigation';
import { getIcon } from '@/lib/icons';
import { SidebarUser } from './sidebar-user';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Load collapse state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed');
    if (stored !== null) {
      setIsCollapsed(stored === 'true');
    }
  }, []);

  // Save collapse state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(isCollapsed));
  }, [isCollapsed]);

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 64 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 z-40 flex h-screen flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-slate-200 px-4 dark:border-slate-800">
        <Logo showWordmark={!isCollapsed} size="sm" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {dashboardNavigation.map((item) => {
            const Icon = getIcon(item.icon || '');
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

            const navItem = (
              <Link
                href={item.href as '/'}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all',
                  'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
                  isActive &&
                    'bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 border-brand-600 dark:border-brand-400 border-l-3',
                  isCollapsed && 'justify-center'
                )}
              >
                {Icon && <Icon className="h-5 w-5 shrink-0" />}
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="truncate text-sm font-medium"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );

            if (isCollapsed) {
              return (
                <Tooltip key={item.title} delayDuration={0}>
                  <TooltipTrigger asChild>{navItem}</TooltipTrigger>
                  <TooltipContent side="right" align="center">
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return <div key={item.title}>{navItem}</div>;
          })}
        </div>
      </nav>

      <Separator />

      {/* User Section */}
      <div className="p-3">
        <SidebarUser isCollapsed={isCollapsed} />
      </div>

      <Separator />

      {/* Collapse Toggle */}
      <div className="p-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn('w-full justify-center', isCollapsed && 'px-0')}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="ml-2 text-sm">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </motion.aside>
  );
}
