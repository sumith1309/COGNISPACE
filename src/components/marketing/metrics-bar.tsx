'use client';

import React from 'react';
import { Shield, Zap, Activity, Users } from 'lucide-react';
import { useAnimatedCounter } from '@/hooks/use-animated-counter';
import { cn } from '@/lib/utils';

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
      icon: Shield,
      value: 99.9,
      label: 'Uptime SLA',
      suffix: '%',
      decimals: 1,
    },
    {
      icon: Zap,
      value: 100,
      label: 'p95 Latency',
      prefix: '< ',
      suffix: 'ms',
    },
    {
      icon: Activity,
      value: 10000000,
      label: 'API Calls / Month',
      suffix: '+',
    },
    {
      icon: Users,
      value: 500,
      label: 'Teams Worldwide',
      suffix: '+',
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
