'use client';

import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex h-9 w-16 items-center rounded-full border border-earth-200 bg-earth-100 px-1 transition-colors dark:border-earth-700 dark:bg-earth-800"
    >
      <span
        className={`flex h-7 w-7 transform items-center justify-center rounded-full bg-white text-earth-700 shadow-sm transition-transform duration-200 dark:bg-earth-900 dark:text-organic-300 ${
          isDark ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {isDark ? <FiMoon className="h-3.5 w-3.5" /> : <FiSun className="h-3.5 w-3.5" />}
      </span>
    </button>
  );
}
