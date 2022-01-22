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
        primary: ['Roboto', ...fontFamily.sans],
      },
      colors: {
        // Customize it on globals.css :root
        primary: getColorShades([50, 100, 200, 300, 400, 500, 600, 700]),
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
