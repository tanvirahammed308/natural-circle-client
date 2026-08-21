'use client';

import { useEffect, useRef, useState } from 'react';
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';
import { AlertItem } from '@/types';
import { cn } from '@/lib/utils';

const styles = {
  success: { icon: FiCheckCircle, ring: 'border-organic-200 dark:border-organic-800', iconColor: 'text-organic-600 dark:text-organic-400', bar: 'bg-organic-500' },
  error: { icon: FiXCircle, ring: 'border-red-200 dark:border-red-900', iconColor: 'text-red-500 dark:text-red-400', bar: 'bg-red-500' },
  warning: { icon: FiAlertTriangle, ring: 'border-amber-200 dark:border-amber-900', iconColor: 'text-amber-500 dark:text-amber-400', bar: 'bg-amber-500' },
  info: { icon: FiInfo, ring: 'border-blue-200 dark:border-blue-900', iconColor: 'text-blue-500 dark:text-blue-400', bar: 'bg-blue-500' },
} as const;

interface AlertToastProps {
  alert: AlertItem;
  onDismiss: (id: string) => void;
}

export function AlertToast({ alert, onDismiss }: AlertToastProps) {
  const [isLeaving, setIsLeaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const exitTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const config = styles[alert.type];
  const Icon = config.icon;

  const handleClose = () => {
    setIsLeaving(true);
    exitTimerRef.current = setTimeout(() => onDismiss(alert.id), 180);
  };

  useEffect(() => {
    timerRef.current = setTimeout(handleClose, alert.duration);
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(exitTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert.id]);

  return (
    <div
      role="alert"
      className={cn(
        'pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-xl border bg-white shadow-lg dark:bg-earth-900 dark:shadow-black/40',
        config.ring,
        isLeaving ? 'animate-slide-out' : 'animate-slide-in'
      )}
      onMouseEnter={() => clearTimeout(timerRef.current)}
      onMouseLeave={() => { timerRef.current = setTimeout(handleClose, 1500); }}
    >
      <div className="flex items-start gap-3 p-4">
        <Icon className={cn('mt-0.5 h-5 w-5 flex-shrink-0', config.iconColor)} />
        <div className="min-w-0 flex-1">
          {alert.title && <p className="text-sm font-semibold text-earth-900 dark:text-earth-50">{alert.title}</p>}
          <p className="text-sm text-earth-600 dark:text-earth-300">{alert.message}</p>
        </div>
        <button onClick={handleClose} className="flex-shrink-0 rounded-full p-1 text-earth-400 hover:bg-earth-100 hover:text-earth-600 dark:text-earth-500 dark:hover:bg-earth-800 dark:hover:text-earth-300" aria-label="Dismiss notification">
          <FiX className="h-4 w-4" />
        </button>
      </div>
      <div className="h-1 w-full bg-earth-100 dark:bg-earth-800">
        <div className={cn('h-full', config.bar)} style={{ animation: `shrink-bar ${alert.duration}ms linear forwards` }} />
      </div>
    </div>
  );
}
