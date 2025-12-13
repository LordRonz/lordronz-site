/* eslint-disable @typescript-eslint/no-require-imports */

// eslint-disable-next-line import/no-anonymous-default-export
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
      colors: {
        // Customize it on globals.css :root
        primary: {
          50: 'rgb(var(--tw-clr-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-clr-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-clr-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-clr-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-clr-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-clr-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-clr-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-clr-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-clr-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-clr-primary-900) / <alpha-value>)',
        },
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
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'bg-shine': 'bg-shine 2.2s linear infinite',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
        meteor: 'meteor 5s linear infinite',
        'bg-position': 'bg-position 2.3s linear infinite alternate',
        wave: 'wave 2.25s ease-in-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};
