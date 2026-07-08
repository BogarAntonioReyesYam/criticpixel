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
          DEFAULT: "#121212",
          light: "#f5f5f5",
        },
        gamingCard: {
          DEFAULT: "#1d1d1d",
          light: "#ffffff",
        },
        gamingOrange: "#ff6b00",
        gamingHeader: {
          DEFAULT: "#1a1a1a",
          light: "#ffffff",
        },
        gamingText: {
          DEFAULT: "#ffffff",
          light: "#1a1a1a",
        },
        gamingMuted: {
          DEFAULT: "#999999",
          light: "#666666",
        },
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
