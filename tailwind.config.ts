import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F9F4DF',
        ink: '#1A1A23',
        pink: {
          DEFAULT: '#FF6EC7',
          light: '#FFB3DC',
        },
        yellow: {
          DEFAULT: '#FFD93D',
          light: '#FFE989',
        },
        blue: {
          DEFAULT: '#4D96FF',
          light: '#A8C8FF',
        },
        lime: {
          DEFAULT: '#B9FF66',
          light: '#DAFFA3',
        },
        purple: {
          DEFAULT: '#5B57EB',
          light: '#A5A3F5',
        },
      },
      fontFamily: {
        display: ['"Archivo Black"', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderWidth: {
        '3': '3px',
      },
      borderRadius: {
        'neo': '16px',
        'neo-sm': '10px',
        'neo-lg': '24px',
      },
      boxShadow: {
        'neo': '4px 4px 0 0 #1A1A23',
        'neo-sm': '2px 2px 0 0 #1A1A23',
        'neo-lg': '6px 6px 0 0 #1A1A23',
        'neo-xl': '8px 8px 0 0 #1A1A23',
        'neo-hover': '2px 2px 0 0 #1A1A23',
        'neo-none': '0 0 0 0 #1A1A23',
      },
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.2s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'wiggle': 'wiggle 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}

export default config
