/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

const withOpacity = (variableName) => {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
};

const getColorShades = (shades, name = 'primary') => {
  const colorShades = {};
  shades.forEach((shade) => {
    colorShades[shade] = withOpacity(`--tw-clr-${name}-${shade}`);
  });
  return colorShades;
};

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
