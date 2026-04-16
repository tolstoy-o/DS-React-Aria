import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Universal colors — never change
        'text-dark':    '#111111',
        'text-base':    '#444444',
        'text-light':   '#888888',
        'bg-base':      '#F2F2F2',
        'divider':      '#E2E2E2',
        'input-border': '#CCCCCC',

        // Partner brand tokens — driven by CSS variables
        'primary':          'var(--color-primary)',
        'link':             'var(--color-link)',
        'dashboard-icon':   'var(--color-dashboard-icon)',
        'success':          'var(--color-success)',
        'fail':             'var(--color-fail)',
        'footer-bg':        'var(--color-footer-bg)',
        'cp-nav':           'var(--color-cp-nav)',
        'cp-nav-menu':      'var(--color-cp-nav-menu)',
        'th-nav':           'var(--color-th-nav)',
        'tags':             'var(--color-tags)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
