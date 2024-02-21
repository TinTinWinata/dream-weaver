/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F111B',
        secondary: '#1A1E32',
        'accent-1': '#37A2EA',
        'accent-2': '#0075FF',
        'green-1': '#00D415',
        'green-2': '#00B21D',
        'secondary-hover': '#22263E'
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif']
      }
    },
  },
  plugins: [],
}