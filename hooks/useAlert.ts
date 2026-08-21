'use client';

import { useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { showAlert } from '@/store/slices/alertSlice';

interface AlertOptions {
  title?: string;
  duration?: number;
}

/**
 * Central hook for firing the app's custom alert/notification UI.
 * Use this instead of window.alert() or a third-party toast library.
 *
 * Example:
 *   const alert = useAlert();
 *   alert.success('Added to cart!');
 *   alert.error('Could not place order', { title: 'Payment failed' });
 */
export function useAlert() {
  const dispatch = useAppDispatch();

  const success = useCallback(
    (message: string, options?: AlertOptions) =>
      dispatch(showAlert({ type: 'success', message, ...options })),
    [dispatch]
  );

  const error = useCallback(
    (message: string, options?: AlertOptions) =>
      dispatch(showAlert({ type: 'error', message, duration: 6000, ...options })),
    [dispatch]
  );

  const warning = useCallback(
    (message: string, options?: AlertOptions) =>
      dispatch(showAlert({ type: 'warning', message, ...options })),
    [dispatch]
  );

  const info = useCallback(
    (message: string, options?: AlertOptions) =>
      dispatch(showAlert({ type: 'info', message, ...options })),
    [dispatch]
  );

  return { success, error, warning, info };
}
