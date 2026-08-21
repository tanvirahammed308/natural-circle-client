'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAlerts, dismissAlert } from '@/store/slices/alertSlice';
import { AlertToast } from './AlertToast';

/**
 * Renders the app's custom alert/notification stack. Mounted once
 * in the root layout so any component can trigger alerts via useAlert().
 */
export function AlertContainer() {
  const dispatch = useAppDispatch();
  const alerts = useAppSelector(selectAlerts);

  if (alerts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-4 top-4 z-[100] flex flex-col items-end gap-3 sm:inset-x-auto sm:right-4"
      aria-live="polite"
    >
      {alerts.map((alert) => (
        <AlertToast key={alert.id} alert={alert} onDismiss={(id) => dispatch(dismissAlert(id))} />
      ))}
    </div>
  );
}
