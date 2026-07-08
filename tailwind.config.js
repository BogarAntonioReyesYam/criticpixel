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
        gamingBg: "#121212",
        gamingCard: "#1d1d1d",
        gamingOrange: "#ff6b00",
        gamingHeader: "#1a1a1a",
        gamingText: "#ffffff",
        gamingMuted: "#999999",
      },
      spacing: {
        'tight': '0.5rem',
      },
      fontSize: {
        'xxs': '0.65rem',
      }
    },
  },
  plugins: [],
}
