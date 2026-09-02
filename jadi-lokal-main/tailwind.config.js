/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sawah: {
          DEFAULT: '#2F6B4F',
          dark: '#234F3A',
          light: '#EAF2EC',
        },
        turmeric: {
          DEFAULT: '#E3A02C',
          dark: '#B87D1A',
          light: '#FBEDD3',
        },
        ink: {
          DEFAULT: '#241C15',
          soft: '#4A3F35',
        },
        paper: '#FAF6EC',
        clay: {
          DEFAULT: '#B65C38',
          light: '#F3DDD0',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px -12px rgba(36, 28, 21, 0.25)',
        stamp: '0 2px 0 rgba(36,28,21,0.15)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out both',
        slideUp: 'slideUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
