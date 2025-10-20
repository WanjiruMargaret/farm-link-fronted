/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22c55e',
        secondary: '#16a34a',
        accent: '#f59e0b',
      }
    },
  },
  plugins: [],
}