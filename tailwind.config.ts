import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        organic: {
          50: '#f3f9ee', 100: '#e4f0d9', 200: '#c9e2b6', 300: '#a4cd85', 400: '#82b75d',
          500: '#5f9a3c', 600: '#487a2d', 700: '#385e25', 800: '#2f4b21', 900: '#28401f', 950: '#16240f',
        },
        earth: {
          50: '#faf6f1', 100: '#f0e6d8', 200: '#e0cab0', 300: '#cba67e', 400: '#b98457',
          500: '#a3683e', 600: '#875233', 700: '#6c3f2b', 800: '#5a3527', 900: '#4c2e23', 950: '#211712',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      keyframes: {
        'slide-in': { '0%': { transform: 'translateX(120%)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        'slide-out': { '0%': { transform: 'translateX(0)', opacity: '1' }, '100%': { transform: 'translateX(120%)', opacity: '0' } },
        'shrink-bar': { '0%': { width: '100%' }, '100%': { width: '0%' } },
      },
      animation: {
        'slide-in': 'slide-in 0.25s ease-out forwards',
        'slide-out': 'slide-out 0.2s ease-in forwards',
      },
    },
  },
  plugins: [],
};
export default config;
