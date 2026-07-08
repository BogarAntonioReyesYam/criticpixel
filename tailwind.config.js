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
        gamingBg: {
          DEFAULT: "#f8f9fa",
          dark: "#121212",
        },
        gamingCard: {
          DEFAULT: "#ffffff",
          dark: "#1d1d1d",
        },
        gamingOrange: "#ff6b00",
        gamingHeader: {
          DEFAULT: "#ffffff",
          dark: "#1a1a1a",
        },
        gamingText: {
          DEFAULT: "#1a1a1a",
          dark: "#ffffff",
        },
        gamingMuted: {
          DEFAULT: "#6c757d",
          dark: "#999999",
        },
      },
      spacing: {
        'tight': '0.5rem',
      },
      fontSize: {
        'xxs': '0.65rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-dark': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 24px rgba(255, 107, 0, 0.15)',
      },
      borderColor: {
        DEFAULT: 'var(--gaming-border)',
      },
    },
  },
  plugins: [],
}
