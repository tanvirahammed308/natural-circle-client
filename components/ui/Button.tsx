import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-organic-600 text-white hover:bg-organic-700 dark:bg-organic-500 dark:hover:bg-organic-600',
      secondary: 'bg-earth-100 text-earth-900 hover:bg-earth-200 dark:bg-earth-800 dark:text-earth-50 dark:hover:bg-earth-700',
      outline: 'border border-organic-600 text-organic-700 hover:bg-organic-50 dark:border-organic-500 dark:text-organic-400 dark:hover:bg-earth-900',
      ghost: 'text-earth-700 hover:bg-earth-100 dark:text-earth-300 dark:hover:bg-earth-800',
    };
    const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5 text-sm', lg: 'px-7 py-3 text-base' };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60',
          variants[variant], sizes[size], className
        )}
        {...props}
      >
        {isLoading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
