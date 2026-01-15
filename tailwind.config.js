/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          900: '#100d38', // Background utama (Deep Space)
          800: '#2a1d6c', // Card/Container (Nebula Purple)
          700: '#41398c', // Accent/Hover (Starlight)
          100: '#c9aed7', // Text utama (Lavender Light)
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
