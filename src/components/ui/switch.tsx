'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & { label?: string }
>(({ className, label, ...props }, ref) => {
  const id = React.useId();
  return (
    <div className="flex items-center gap-2">
      <SwitchPrimitive.Root
        id={id}
        className={cn(
          'peer focus-visible:ring-brand-500 data-[state=checked]:bg-brand-500 inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-slate-300 dark:focus-visible:ring-offset-slate-900 dark:data-[state=unchecked]:bg-slate-600',
          className
        )}
        ref={ref}
        {...props}
      >
        <SwitchPrimitive.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
      </SwitchPrimitive.Root>
      {label && (
        <label htmlFor={id} className="cursor-pointer text-sm text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
    </div>
  );
});
Switch.displayName = 'Switch';

export { Switch };
