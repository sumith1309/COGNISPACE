'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as Collapsible from '@radix-ui/react-collapsible';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/logo';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { mainNavigation } from '@/config/navigation';
import { getIcon } from '@/lib/icons';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-16 transition-all duration-300 lg:h-[72px]',
          scrolled
            ? 'border-b border-slate-200/50 bg-white/80 shadow-sm backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-full items-center justify-between">
            {/* Logo */}
            <Logo size="md" />

            {/* Desktop Navigation */}
            <NavigationMenu.Root className="hidden lg:flex">
              <NavigationMenu.List className="flex items-center gap-1">
                {/* Products Mega Menu */}
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger
                    className={cn(
                      'group inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium',
                      'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
                      'transition-colors hover:bg-slate-100 dark:hover:bg-slate-800',
                      'data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800'
                    )}
                  >
                    Products
                    <ChevronDown
                      className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content
                    className={cn(
                      'absolute top-0 left-0 w-full',
                      'data-[motion=from-start]:animate-fade-in',
                      'data-[motion=from-end]:animate-fade-in',
                      'data-[motion=to-start]:animate-fade-in',
                      'data-[motion=to-end]:animate-fade-in'
                    )}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 w-[600px] rounded-xl border border-slate-200 bg-white/80 p-4 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        {(mainNavigation[0]?.children || []).map((item, index) => {
                          const Icon = getIcon(item.icon || '');
                          return (
                            <NavigationMenu.Link key={item.title} asChild>
                              <Link
                                href={item.href as '/'}
                                className={cn(
                                  'group block rounded-lg border border-slate-200 p-4 dark:border-slate-800',
                                  'transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                )}
                              >
                                <div className="flex items-start gap-3">
                                  {Icon && (
                                    <div className="bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex h-10 w-10 items-center justify-center rounded-lg">
                                      <Icon className="h-5 w-5" />
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <div className="mb-1 font-medium text-slate-900 dark:text-white">
                                      {item.title}
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </NavigationMenu.Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>

                {/* Other Nav Links */}
                {mainNavigation.slice(1).map((item) => (
                  <NavigationMenu.Item key={item.title}>
                    <Link
                      href={item.href as '/'}
                      className={cn(
                        'inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium',
                        'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
                        'transition-colors hover:bg-slate-100 dark:hover:bg-slate-800',
                        pathname === item.href && 'bg-slate-100 dark:bg-slate-800'
                      )}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenu.Item>
                ))}
              </NavigationMenu.List>
            </NavigationMenu.Root>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="sm" asChild className="hidden lg:inline-flex">
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="hidden lg:inline-flex">
                <Link href="/auth/signup">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
                style={{ top: '64px' }}
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Menu Panel */}
              <motion.nav
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-white shadow-2xl lg:hidden dark:bg-slate-900"
                style={{ top: '64px' }}
              >
                <div className="flex h-full flex-col">
                  <div className="flex-1 space-y-1 px-4 py-6">
                    {/* Products Accordion */}
                    <Collapsible.Root>
                      <Collapsible.Trigger
                        className={cn(
                          'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium',
                          'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
                          'transition-colors'
                        )}
                      >
                        Products
                        <ChevronDown className="h-4 w-4" />
                      </Collapsible.Trigger>
                      <Collapsible.Content className="mt-1 ml-3 space-y-1">
                        {mainNavigation[0]?.children?.map((item) => {
                          const Icon = getIcon(item.icon || '');
                          return (
                            <Link
                              key={item.title}
                              href={item.href as '/'}
                              className={cn(
                                'flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm',
                                'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
                                'transition-colors'
                              )}
                            >
                              {Icon && (
                                <div className="bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                                  <Icon className="h-4 w-4" />
                                </div>
                              )}
                              <div>
                                <div className="font-medium">{item.title}</div>
                                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </Collapsible.Content>
                    </Collapsible.Root>

                    {/* Other Links */}
                    {mainNavigation.slice(1).map((item) => (
                      <Link
                        key={item.title}
                        href={item.href as '/'}
                        className={cn(
                          'block rounded-lg px-3 py-2.5 text-sm font-medium',
                          'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
                          'transition-colors',
                          pathname === item.href && 'bg-slate-100 dark:bg-slate-800'
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Actions */}
                  <div className="space-y-2 border-t border-slate-200 p-4 dark:border-slate-800">
                    <Button variant="ghost" className="w-full justify-center" asChild>
                      <Link href="/auth/signin">Sign In</Link>
                    </Button>
                    <Button className="w-full justify-center" asChild>
                      <Link href="/auth/signup">
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 lg:h-[72px]" />
    </>
  );
}
