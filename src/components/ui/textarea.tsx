'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | undefined;
  helperText?: string | undefined;
  error?: string | undefined;
  showCount?: boolean | undefined;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, showCount, maxLength, id, ...props }, ref) => {
    const [charCount, setCharCount] = React.useState(0);
    const textareaId = id || React.useId();
    const errorId = error ? `${textareaId}-error` : undefined;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'focus-visible:ring-brand-500 flex min-h-[80px] w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500',
            error
              ? 'border-red-500 focus-visible:ring-red-500'
              : 'border-slate-300 dark:border-slate-700',
            className
          )}
          ref={ref}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={errorId}
          onChange={(e) => {
            setCharCount(e.target.value.length);
            props.onChange?.(e);
          }}
          {...props}
        />
        <div className="flex justify-between">
          {error ? (
            <p id={errorId} className="text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          ) : helperText ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">{helperText}</p>
          ) : (
            <span />
          )}
          {showCount && maxLength && (
            <p
              className={cn(
                'text-sm',
                charCount > maxLength * 0.9 ? 'text-amber-600' : 'text-slate-400'
              )}
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
