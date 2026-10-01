/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#0d59f2",
        "apple-green": "#8ce02c",
        "bright-yellow": "#ffea00",
        "selection-green": "#8ce600",
        "background-light": "#f5f6f8",
        "background-dark": "#101622",
      },
      fontFamily: {
        "display": ["Lexend", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      keyframes: {
        'pull-left': {
          '0%, 100%': { transform: 'translateX(0) rotate(0)' },
          '50%': { transform: 'translateX(-8px) rotate(-5deg)' },
        },
        'pull-right': {
          '0%, 100%': { transform: 'translateX(0) rotate(0)' },
          '50%': { transform: 'translateX(8px) rotate(5deg)' },
        },
        'rope-tension': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '28px 0' },
        },
        'flag-shake': {
          '0%, 100%': { transform: 'translateY(-50%) rotate(45deg)' },
          '50%': { transform: 'translateY(-50%) rotate(35deg)' },
        }
      },
      animation: {
        'pull-left': 'pull-left 0.8s ease-in-out infinite',
        'pull-right': 'pull-right 0.9s ease-in-out infinite',
        'rope-tension': 'rope-tension 0.4s linear infinite',
        'flag-shake': 'flag-shake 0.8s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
