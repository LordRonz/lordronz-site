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
      fontFamily: {
        primary: ['var(--inter-font)', ...fontFamily.sans],
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
  ],
} satisfies Config;
