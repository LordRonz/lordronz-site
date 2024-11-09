import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const withOpacity =
  (variable: string) =>
  ({ opacityValue }: { opacityValue?: string }) =>
    opacityValue === undefined
      ? `rgb(var(${variable}))`
      : `rgb(var(${variable}) / ${opacityValue})`;

const getColorShades = (shades: number[], name = 'primary') =>
  shades.reduce(
    (a, v) => ({ ...a, [v]: withOpacity(`--tw-clr-${name}-${v}`) }),
    {},
  );

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      fontFamily: {
        primary: ['var(--font-geist-sans)', ...fontFamily.sans],
      },
      colors: {
        // Customize it on globals.css :root
        primary: getColorShades([
          50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
        ]),
        dark: '#111',
        light: '#ddd',
      },
      strokeWidth: {
        0.5: '0.5',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'bg-shine': {
          from: {
            backgroundPosition: '0 0',
          },
          to: {
            backgroundPosition: '-200% 0',
          },
        },
        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
          },
        },
        'bg-position': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'bg-shine': 'bg-shine 2.2s linear infinite',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
        meteor: 'meteor 5s linear infinite',
        'bg-position': 'bg-position 2.3s linear infinite alternate',
      },
    },
  },
  variants: {
    extend: {},
  },
  daisyui: {
    themes: [],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui'),
    require('tailwindcss-animate'),
  ],
} satisfies Config;
