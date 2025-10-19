const scrollbarHide = require('tailwind-scrollbar-hide');

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // suas customizações aqui
    },
  },
  plugins: [scrollbarHide],
};

module.exports = config;