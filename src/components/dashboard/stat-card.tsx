'use client';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { getIcon } from '@/lib/icons';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconColor?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  iconColor = 'bg-blue-100 text-blue-600',
  className,
}: StatCardProps) {
  const Icon = getIcon(icon);

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
        {Icon && (
          <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', iconColor)}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </Card>
  );
}
