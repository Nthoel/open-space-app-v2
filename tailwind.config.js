/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // === NIGHT SPACE THEME (ENHANCED) ===
        
        // Background Layers
        dark: '#0f0a2e',           // Background utama (lebih gelap)
        'dark-lighter': '#1a1442', // Background section alternatif
        
        // Surface (Card, Container, Modal)
        card: '#231b4d',           // Background card
        'card-hover': '#2d2460',   // Card hover state
        
        // Primary Accent (Magenta/Pink - seperti di referensi)
        primary: '#d946ef',        // Tombol utama, link aktif
        'primary-hover': '#e879f9', // Hover primary
        'primary-soft': '#d946ef20', // Background soft untuk highlight
        
        // Secondary Accent (Cyan/Teal)
        secondary: '#22d3ee',      // Accent sekunder
        'secondary-hover': '#67e8f9',
        
        // Tertiary Accent (Orange/Warm)
        accent: '#fb923c',         // Untuk highlight penting, notification
        'accent-hover': '#fdba74',
        
        // Text
        text: '#e2d9f3',           // Teks utama (lebih terang)
        'text-muted': '#9c8bb8',   // Teks secondary
        'text-dark': '#1a1442',    // Teks di atas background terang
        
        // Status/Feedback
        success: '#4ade80',
        error: '#f87171',
        warning: '#fbbf24',
        info: '#60a5fa',
        
        // Border & Divider
        border: '#3d2d7a',
        'border-light': '#5a4cb0',
        
        // Vote Colors
        upvote: '#4ade80',
        downvote: '#f87171',
        
        // Gradient stops (untuk background decorative)
        'gradient-start': '#7c3aed',
        'gradient-mid': '#db2777',
        'gradient-end': '#f97316',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        // Gradient untuk header/hero section
        'space-gradient': 'linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #f97316 100%)',
        'card-gradient': 'linear-gradient(180deg, #231b4d 0%, #1a1442 100%)',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(217, 70, 239, 0.3)',
        'glow-secondary': '0 0 20px rgba(34, 211, 238, 0.3)',
        'glow-accent': '0 0 20px rgba(251, 146, 60, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
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
