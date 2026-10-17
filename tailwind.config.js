/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#06162a',
          900: '#0a203b',
          800: '#102d4d',
          700: '#17416b',
        },
        accent: {
          500: '#3182f6',
          400: '#55a2ff',
          300: '#8ac0ff',
        },
      },
      boxShadow: {
        soft: '0 18px 55px rgba(7, 27, 51, 0.08)',
      },
    },
  },
  plugins: [],
}
