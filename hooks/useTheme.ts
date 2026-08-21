'use client';

import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectTheme, setTheme, toggleTheme, Theme } from '@/store/slices/themeSlice';

const STORAGE_KEY = 'terra-harvest-theme';

function applyThemeClass(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

/**
 * Reads the saved theme (or system preference) on mount, applies the
 * `dark` class to <html>, and keeps Redux + localStorage in sync.
 * The layout also runs a small inline script before hydration so there's
 * no flash of the wrong theme on first paint.
 */
export function useThemeListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: Theme = stored ?? (prefersDark ? 'dark' : 'light');

    dispatch(setTheme(initial));
    applyThemeClass(initial);

    // Keep in sync if the user changes their OS theme and hasn't set an explicit preference
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (window.localStorage.getItem(STORAGE_KEY)) return; // explicit choice wins
      const next: Theme = e.matches ? 'dark' : 'light';
      dispatch(setTheme(next));
      applyThemeClass(next);
    };
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [dispatch]);
}

export function useTheme() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    dispatch(toggleTheme());
    applyThemeClass(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, [dispatch, theme]);

  return { theme, toggle };
}
