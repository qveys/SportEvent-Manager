/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: {
          light: 'rgba(128, 128, 128, 0.2)',
          dark: 'rgba(128, 128, 128, 0.3)'
        },
        background: {
          light: 'rgba(235, 240, 245, 0.4)',
          dark: 'rgba(17, 24, 39, 1)'
        }
      },
      borderWidth: {
        subtle: '1px'
      }
    },
  },
  plugins: [],
};