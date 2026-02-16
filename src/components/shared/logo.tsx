'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { icon: 24, text: 'text-base' },
  md: { icon: 32, text: 'text-lg' },
  lg: { icon: 40, text: 'text-xl' },
};

export function Logo({ className, showWordmark = true, size = 'md' }: LogoProps) {
  const { icon, text } = sizeMap[size];

  return (
    <Link href="/" className={cn('group flex items-center gap-2.5', className)}>
      {/* Abstract geometric logo mark — 3 overlapping circles suggesting neural connectivity */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="logo-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          <linearGradient id="logo-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>

        {/* Three interlocking circles */}
        <circle cx="16" cy="14" r="10" fill="url(#logo-gradient-1)" opacity="0.9" />
        <circle cx="26" cy="14" r="10" fill="url(#logo-gradient-2)" opacity="0.7" />
        <circle cx="21" cy="24" r="10" fill="url(#logo-gradient-1)" opacity="0.8" />

        {/* Center glow dot */}
        <circle cx="21" cy="17" r="3" fill="white" opacity="0.9" />
      </svg>

      {showWordmark && (
        <span
          className={cn(
            text,
            'font-semibold tracking-tight text-slate-900 transition-colors dark:text-white'
          )}
        >
          cognispace
        </span>
      )}
    </Link>
  );
}
