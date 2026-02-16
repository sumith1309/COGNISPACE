'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Twitter, Linkedin, MessageCircle, Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/shared/logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { footerNavigation } from '@/config/navigation';
import { siteConfig } from '@/config/site';

export function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would call an API
      setSubmitted(true);
      setEmail('');
    }
  };

  const socialLinks = [
    { icon: Github, href: siteConfig.links.github, label: 'GitHub' },
    { icon: Twitter, href: siteConfig.links.twitter, label: 'Twitter' },
    { icon: Linkedin, href: siteConfig.links.linkedin, label: 'LinkedIn' },
    { icon: MessageCircle, href: siteConfig.links.discord, label: 'Discord' },
  ];

  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-white to-[#F8FAFF] dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Newsletter Section */}
        <div className="mx-auto mb-10 max-w-md text-center">
          <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
            Stay in the loop
          </h3>
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
            Get the latest on AI products, engineering insights, and company news.
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="flex gap-2"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" size="md">
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-2.5 text-green-700 dark:bg-green-950 dark:text-green-300"
              >
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">Thanks! You're subscribed.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Separator className="my-10" />

        {/* Link Grid */}
        <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Product */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider text-slate-900 uppercase dark:text-white">
              Product
            </h4>
            <ul className="space-y-3">
              {footerNavigation.product.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href as any}
                    className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider text-slate-900 uppercase dark:text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {footerNavigation.company.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href as any}
                    className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider text-slate-900 uppercase dark:text-white">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerNavigation.resources.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href as any}
                    className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider text-slate-900 uppercase dark:text-white">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerNavigation.legal.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href as any}
                    className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <Logo size="sm" showWordmark={false} className="hidden sm:flex" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2026 Cognispace Technologies
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-all hover:scale-110 hover:text-slate-700 dark:hover:text-slate-300"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
