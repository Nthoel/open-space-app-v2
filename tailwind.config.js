/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background
        dark: '#0a0a1a',
        'dark-lighter': '#12122a',
        
        // Surface
        card: '#1a1a3e',
        'card-hover': '#252550',
        
        // Primary (Purple/Violet)
        primary: '#a855f7',
        'primary-hover': '#c084fc',
        'primary-soft': '#a855f720',
        
        // Secondary (Cyan)
        secondary: '#22d3ee',
        'secondary-hover': '#67e8f9',
        
        // Accent (Pink/Magenta)
        accent: '#ec4899',
        'accent-hover': '#f472b6',
        
        // Text
        text: '#e8e8ff',
        'text-muted': '#8888aa',
        
        // Status
        success: '#4ade80',
        error: '#f87171',
        warning: '#fbbf24',
        
        // Border
        border: '#2a2a5a',
        'border-light': '#3a3a7a',
        
        // Votes
        upvote: '#4ade80',
        downvote: '#f87171',

        // Category Colors (untuk indicator)
        'cat-react': '#61dafb',
        'cat-redux': '#764abc',
        'cat-javascript': '#f7df1e',
        'cat-typescript': '#3178c6',
        'cat-general': '#a855f7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(ellipse at top, #1a1a4e 0%, #0a0a1a 50%, #050510 100%)',
        'card-gradient': 'linear-gradient(135deg, #1a1a3e 0%, #12122a 100%)',
        'glow-gradient': 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-primary': '0 0 30px rgba(168, 85, 247, 0.3)',
        'glow-accent': '0 0 30px rgba(236, 72, 153, 0.3)',
        'glow-secondary': '0 0 20px rgba(34, 211, 238, 0.2)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
