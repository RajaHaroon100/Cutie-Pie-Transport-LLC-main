/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
      colors: {
        bg: '#fff7ed',
        primary: '#0c1c2e',
        secondary: '#111827',
        accent: '#e63984',
        secondaryAccent: '#ffedd5',
        heading_1: 'white',
        subHeading_1: 'white',
        text_1: '#f2c849',
        heading_2: '#CD5360',
        subHeading_2: '#CD5360',
        text_2: '',
      },
    },
  },
  plugins: [],
}


