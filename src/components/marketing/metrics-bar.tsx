'use client';

import React from 'react';
import { FolderCheck, Heart, Globe, TrendingUp } from 'lucide-react';
import { useAnimatedCounter } from '@/hooks/use-animated-counter';

interface MetricItemProps {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

function MetricItem({
  icon: Icon,
  value,
  label,
  prefix = '',
  suffix = '',
  decimals = 0,
}: MetricItemProps) {
  const { count, ref } = useAnimatedCounter({ end: value, decimals, duration: 2500 });

  return (
    <div className="flex flex-col items-center text-center">
      <Icon className="mb-3 h-6 w-6 text-slate-300" aria-hidden="true" />
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className="gradient-text text-4xl font-bold lg:text-5xl"
      >
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </div>
  );
}

export function MetricsBar() {
  const metrics: MetricItemProps[] = [
    {
      icon: FolderCheck,
      value: 50,
      label: 'Projects Delivered',
      suffix: '+',
    },
    {
      icon: Heart,
      value: 98,
      label: 'Client Satisfaction',
      suffix: '%',
    },
    {
      icon: Globe,
      value: 12,
      label: 'Industries Served',
      suffix: '+',
    },
    {
      icon: TrendingUp,
      value: 3,
      label: 'Average ROI',
      suffix: 'x',
    },
  ];

  return (
    <section className="border-y border-slate-100 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <MetricItem key={index} {...metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
