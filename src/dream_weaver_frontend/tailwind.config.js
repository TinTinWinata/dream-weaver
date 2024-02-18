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
        'secondary-hover': '#22263E'
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif']
      }
    },
  },
  plugins: [],
}