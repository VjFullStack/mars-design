/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D3047',
          light: '#414464',
        },
        secondary: {
          DEFAULT: '#D09E88',
          light: '#E5BCAA',
        },
        accent: {
          DEFAULT: '#97B8C2',
          light: '#B8D3DA',
        },
        light: '#F9F9F9',
        dark: '#1A1A1A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
