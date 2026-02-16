'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & { label?: string }
>(({ className, label, ...props }, ref) => {
  const id = React.useId();
  return (
    <div className="flex items-center gap-2">
      <CheckboxPrimitive.Root
        id={id}
        ref={ref}
        className={cn(
          'peer focus-visible:ring-brand-500 data-[state=checked]:border-brand-500 data-[state=checked]:bg-brand-500 dark:data-[state=checked]:border-brand-500 h-4 w-4 shrink-0 rounded border border-slate-300 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-white dark:border-slate-600',
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          {props.checked === 'indeterminate' ? (
            <Minus className="h-3 w-3" />
          ) : (
            <Check className="h-3 w-3" />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label htmlFor={id} className="cursor-pointer text-sm text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
    </div>
  );
});
Checkbox.displayName = 'Checkbox';

export { Checkbox };
