const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.svelte",
    "./src/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C6CAB9',
        secondary: '#CCCBCD',
        tertiary: '#FBFBF2',
        accent: '#1C2635',
        pop: colors.red[800],
      },
      fontFamily: {
        display: ['Special Elite', 'serif'],
        body: ['Crimson Pro', 'serif'],
        mono: ['Mononoki', 'ui-monospace'],
      },
      typography: ({ theme }) => ({
        neutral: {
          css: {
            '--tw-prose-hr': theme('colors.accent'),
            '--tw-prose-quote-borders': theme('colors.accent'),
            '--tw-prose-bullets': theme('colors.accent'),
          }
        },
        DEFAULT: {
          css: {
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            'blockquote p:first-of-type::before': {
              content: 'none',
            },
            'blockquote p:last-of-type::after': {
              content: 'none',
            },
          }
        }
      }),
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, scale: '150%' },
          '100%': { opacity: 1, scale: '100%' },
        },
        'blur-in': {
          '0%': { filter: 'grayscale(100%)' },
          '100%': { filter: 'grayscale(0%) blur(4px)' },
        },
        'bump': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'bump-small': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-1px)' },
          '100%': { transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 2s ease-in-out',
        'blur-in': 'blur-in 6s ease-in-out',
        'bump': 'bump 0.2s ease-in-out',
        'bump-small': 'bump-small 0.1s ease-in-out',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
