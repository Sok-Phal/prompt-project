/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'khmer': ['Noto Sans Khmer', 'sans-serif'],
      },
      colors: {
        'price-low': '#10B981',
        'price-high': '#EF4444',
        'price-medium': '#F59E0B',
      }
    },
  },
  plugins: [],
}
