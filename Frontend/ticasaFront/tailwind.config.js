/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/@rnr/**/*.{ts,tsx}',
    "./app/**/*.{js,ts,jsx,tsx,ts}",
    "./components/**/*.{js,ts,jsx,tsx,ts}",
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [],
};
