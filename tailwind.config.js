/******** Tailwind Config ********/
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background))',
        foreground: 'rgb(var(--color-foreground))',
        primary: 'rgb(var(--color-primary))',
        secondary: 'rgb(var(--color-secondary))',
        accent: 'rgb(var(--color-accent))',
        text: 'rgb(var(--color-text))',
        textSecondary: 'rgb(var(--color-text-secondary))',
        border: 'rgb(var(--color-border))',
        // Rick & Morty specific colors
        purple: 'rgb(var(--color-purple))',
        pink: 'rgb(var(--color-pink))',
        orange: 'rgb(var(--color-orange))',
        error: 'rgb(var(--color-error))',
        success: 'rgb(var(--color-success))',
        warning: 'rgb(var(--color-warning))',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        glow: 'var(--shadow-glow)',
        portal: 'var(--shadow-portal)'
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
      }
    },
  },
  plugins: [],
}
