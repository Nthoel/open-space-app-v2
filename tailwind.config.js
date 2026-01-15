/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // === NIGHT SPACE THEME ===
        
        // Background
        dark: '#100d38',           // Background utama halaman
        
        // Surface (Card, Container, Modal)
        card: '#2a1d6c',           // Background card/container
        
        // Interactive (Button, Link, Accent)
        primary: '#41398c',        // Tombol utama, hover state
        secondary: '#5a4cb0',      // Tombol sekunder (lebih terang dari primary)
        
        // Text
        text: '#c9aed7',           // Teks utama
        'text-muted': '#9a85b0',   // Teks secondary/placeholder
        
        // Status/Feedback
        success: '#4ade80',        // Hijau untuk sukses
        error: '#f87171',          // Merah untuk error
        warning: '#fbbf24',        // Kuning untuk warning
        
        // Border & Divider
        border: '#3d2d7a',         // Border card, divider
        
        // Vote Colors (Saran Fitur)
        upvote: '#4ade80',         // Hijau untuk upvote
        downvote: '#f87171',       // Merah untuk downvote
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Animasi untuk interaksi
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
