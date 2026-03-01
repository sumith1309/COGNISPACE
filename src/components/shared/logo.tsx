'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
}

const sizeMap = {
  sm: { height: 28, text: 'text-base' },
  md: { height: 36, text: 'text-lg' },
  lg: { height: 44, text: 'text-xl' },
};

export function Logo({ className, size = 'md', showWordmark = true }: LogoProps) {
  const { height, text } = sizeMap[size];

  return (
    <Link href="/" className={cn('group flex items-center gap-2.5', className)}>
      <Image
        src="/logo.jpeg"
        alt="Cognispace"
        width={Math.round(height * 3)}
        height={height}
        className="transition-transform duration-300 group-hover:scale-105"
        style={{ height, width: 'auto' }}
        priority
      />
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
