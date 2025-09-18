/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'khmer': ['Noto Sans Khmer', 'sans-serif'],
      },
      colors: {
        'price-low': '#10B981',
        'price-high': '#EF4444',
        'price-medium': '#F59E0B',
        'primary': '#3B82F6',
        'secondary': '#6366F1',
        'accent': '#10B981',
        'neutral': '#4B5563',
        'base-100': '#F9FAFB',
        'base-200': '#F3F4F6',
        'base-300': '#E5E7EB',
      }
    },
  },
  plugins: [],
}
