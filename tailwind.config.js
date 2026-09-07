/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        insta: {
          pink: '#E1306C',
          purple: '#C13584',
          yellow: '#FCAF45',
          orange: '#F77737',
          blue: '#0095F6',
          'blue-hover': '#1877F2',
          border: '#DBDBDB',
          'dark-bg': '#000000',
          'dark-card': '#121212',
          'dark-border': '#262626',
          'dark-hover': '#1c1c1c',
          'dark-text-muted': '#A8A8A8',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
        heartBurst: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '40%': { transform: 'scale(1.25)', opacity: '0.9' },
          '60%': { transform: 'scale(0.95)', opacity: '1' },
          '80%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'heart-burst': 'heartBurst 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'fade-in': 'fadeIn 0.25s ease-out forwards',
      }
    },
  },
  plugins: [],
}

