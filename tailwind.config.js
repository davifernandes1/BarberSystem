/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#c0a062', // Um tom de dourado/bronze
        'brand-secondary': '#2d2d2d',
        'light-gray': '#f8f9fa',
        'dark-gray': '#343a40',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}