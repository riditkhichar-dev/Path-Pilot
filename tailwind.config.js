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
        brand: {
          primary: '#2563EB',
          'primary-hover': '#1D4ED8',
          secondary: '#0F172A',
          accent: '#334155',
          orange: '#F97316',
          'orange-hover': '#EA580C',
          dark: '#0F172A',
          card: '#1E293B',
          lightBg: '#F8FAFC'
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        sora: ['Sora', 'sans-serif']
      },
      boxShadow: {
        'glow-blue': '0 0 30px -5px rgba(37, 99, 235, 0.4)',
        'glow-orange': '0 0 30px -5px rgba(249, 115, 22, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gradient: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        }
      }
    },
  },
  plugins: [],
}
