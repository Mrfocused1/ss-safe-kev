/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          base: '#F5F5F0',
          dark: '#1A1A1A',
          accent: '#8B0000',
          text: '#2C2C2C',
          concrete: '#E0E0E0'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      }
    }
  },
  plugins: []
};
