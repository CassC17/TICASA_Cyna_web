/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/@rnr/**/*.{ts,tsx}',
    "./app/**/*.{js,ts,jsx,tsx,ts}",
    "./components/**/*.{js,ts,jsx,tsx,ts}",
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: "#302082",
        "primary-dark": "#34419E",
        "blue-accent": "#3192D5",
        "blue-soft": "#95D0D4",
        cta: "#F68E5F",
        "text": "#E0E0E0"
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
