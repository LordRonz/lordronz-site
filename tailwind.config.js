/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

const withOpacity =
  (variable) =>
  ({ opacityValue }) =>
    opacityValue === undefined
      ? `rgb(var(${variable}))`
      : `rgb(var(${variable}) / ${opacityValue})`;

const getColorShades = (shades, name = 'primary') =>
  shades.reduce(
    (a, v) => ({ ...a, [v]: withOpacity(`--tw-clr-${name}-${v}`) }),
    {}
  );

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        primary: ['InterVariable', ...fontFamily.sans],
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
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
