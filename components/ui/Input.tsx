import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-earth-800 dark:text-earth-200">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-lg border border-earth-200 bg-white px-4 py-2.5 text-sm text-earth-900 placeholder:text-earth-400 focus:border-organic-500 focus:outline-none focus:ring-2 focus:ring-organic-100',
            'dark:border-earth-700 dark:bg-earth-900 dark:text-earth-50 dark:placeholder:text-earth-500 dark:focus:border-organic-500 dark:focus:ring-organic-900',
            error && 'border-red-400 focus:border-red-500 focus:ring-red-100 dark:border-red-500 dark:focus:ring-red-900',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
