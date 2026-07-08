/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta exacta de Instant-Gaming
        gamingBg: "#121212",      // Fondo ultra oscuro
        gamingCard: "#1d1d1d",    // Tarjetas con contraste sutil
        gamingOrange: "#ff6b00",  // Naranja vibrante de acción
        gamingHeader: "#1a1a1a",  // Cabecera densa
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
