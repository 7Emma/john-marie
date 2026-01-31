/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        vibes: ['Great Vibes', 'cursive'],
      },
      colors: {
        'rose': {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        'gold': {
          50: '#fefef0',
          100: '#fffbeb',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        }
      },
      boxShadow: {
        'romantic': '0 20px 50px rgba(236, 72, 153, 0.15)',
        'soft': '0 10px 30px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 20px rgba(236, 72, 153, 0.3)',
      },
      backgroundImage: {
        'gradient-romantic': 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f3e8ff 100%)',
        'gradient-gold': 'linear-gradient(90deg, transparent, #ca8a04, transparent)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5', boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 30px rgba(236, 72, 153, 0.6)' },
        }
      },
      transitionDuration: {
        '750': '750ms',
      }
    },
  },
  plugins: [],
};
