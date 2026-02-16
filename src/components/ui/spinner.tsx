import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const spinnerVariants = cva('animate-spin text-current', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    },
  },
  defaultVariants: { size: 'md' },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
  label?: string;
}

function Spinner({ size, className, label = 'Loading...' }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center" role="status" aria-label={label}>
      <Loader2 className={cn(spinnerVariants({ size }), className)} />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export { Spinner };
