import type { Config } from 'tailwindcss';

// Colours are CSS variables (RGB triplets) so one class works in both themes.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        line: token('line'),
        'line-strong': token('line-strong'),
        fg: token('fg'),
        muted: token('muted'),
        subtle: token('subtle'),
        danger: token('danger'),
        accent: {
          DEFAULT: token('accent'),
          ink: token('accent-ink'),
          fg: token('accent-fg'),
        },
      },
      fontFamily: {
        display: [
          'var(--font-display)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: [
          'var(--font-mono)',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
      },
      fontSize: {
        label: ['0.75rem', { lineHeight: '1.1rem', letterSpacing: '0.06em' }],
        display: [
          'clamp(2.5rem, 1.15rem + 5.3vw, 6.25rem)',
          { lineHeight: '0.95', letterSpacing: '-0.042em' },
        ],
        h1: [
          'clamp(2.4rem, 1.4rem + 4vw, 5rem)',
          { lineHeight: '0.98', letterSpacing: '-0.038em' },
        ],
        h2: [
          'clamp(2rem, 1.25rem + 2.9vw, 3.75rem)',
          { lineHeight: '1.02', letterSpacing: '-0.032em' },
        ],
        h3: [
          'clamp(1.375rem, 1.1rem + 0.9vw, 1.875rem)',
          { lineHeight: '1.15', letterSpacing: '-0.022em' },
        ],
        lead: [
          'clamp(1.0625rem, 0.98rem + 0.35vw, 1.3125rem)',
          { lineHeight: '1.6' },
        ],
        figure: [
          'clamp(2rem, 1.3rem + 2.6vw, 3.75rem)',
          { lineHeight: '1', letterSpacing: '-0.035em' },
        ],
      },
      maxWidth: {
        page: '84rem',
        prose: '40rem',
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
