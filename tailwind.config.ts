import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backgroundImage: {
        'app-gradient': 'linear-gradient(145deg, #0f2862 0%, #1e40af 30%, #2563eb 60%, #38bdf8 100%)',
        'icon-gradient': 'linear-gradient(145deg, #1e40af 0%, #2563eb 50%, #38bdf8 100%)',
        'progress-gradient': 'linear-gradient(90deg, #93c5fd, #ffffff)',
      },
      minHeight: {
        dvh: '100dvh',
      },
      maxWidth: {
        quiz: '360px',
        numpad: '320px',
      },
      borderRadius: {
        card: '24px',
        'card-lg': '28px',
        numpad: '16px',
        icon: '20px',
      },
      fontSize: {
        problem: ['clamp(2.4rem, 10vw, 3.6rem)', { lineHeight: '1' }],
        numkey: ['1.6rem', { lineHeight: '1' }],
        feedback: ['1.25rem', { lineHeight: '1.4' }],
        'result-title': ['1.75rem', { lineHeight: '1.2' }],
        'result-medal': ['1.3rem', { lineHeight: '1.3' }],
        'result-pct': ['1.5rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'card': '0 8px 32px rgba(0, 0, 0, 0.15)',
        'card-lg': '0 16px 48px rgba(0, 0, 0, 0.18)',
        'glow-blue': '0 6px 20px rgba(30, 64, 175, 0.4)',
        '3d': '0 4px 0 rgba(0, 0, 0, 0.1)',
        '3d-pressed': '0 1px 0 rgba(0, 0, 0, 0.1)',
        '3d-soft': '0 4px 0 rgba(0, 0, 0, 0.08)',
        '3d-soft-pressed': '0 1px 0 rgba(0, 0, 0, 0.08)',
        '3d-blue': '0 4px 0 #1d4ed8',
        '3d-blue-pressed': '0 1px 0 #1d4ed8',
        '3d-start': '0 6px 0 #1e3a8a',
        '3d-start-pressed': '0 2px 0 #1e3a8a',
      },
    },
  },
  plugins: [],
} satisfies Config
