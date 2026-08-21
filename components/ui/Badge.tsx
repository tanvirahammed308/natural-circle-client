import { cn } from '@/lib/utils';

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-organic-100 px-2.5 py-1 text-xs font-medium text-organic-800 dark:bg-organic-900 dark:text-organic-300',
        className
      )}
    >
      {children}
    </span>
  );
}
