/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta pop-art Kimera Geek
        kimera: {
          orange: '#F97316',
          yellow: '#FACC15',
          ink: '#111111',
          cream: '#FFFDF7',
          red: '#EF4444',
          purple: '#7C3AED',
        },
      },
      fontFamily: {
        display: ['Bangers', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        comic: '4px 4px 0 0 #111111',
        'comic-sm': '2px 2px 0 0 #111111',
        'comic-lg': '8px 8px 0 0 #111111',
        'comic-orange': '6px 6px 0 0 #F97316',
        'comic-purple': '6px 6px 0 0 #7C3AED',
      },
      backgroundImage: {
        // Padrão halftone (pontos de quadrinho) gerado por CSS
        halftone:
          'radial-gradient(circle, rgba(17,17,17,0.18) 1.5px, transparent 1.6px)',
        'halftone-light':
          'radial-gradient(circle, rgba(255,255,255,0.16) 1.5px, transparent 1.6px)',
        'halftone-orange':
          'radial-gradient(circle, rgba(249,115,22,0.25) 1.5px, transparent 1.6px)',
      },
      backgroundSize: {
        dots: '18px 18px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(var(--tw-rotate, 0))' },
          '50%': { transform: 'translateY(-14px) rotate(var(--tw-rotate, 0))' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-22px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'pulse-tag': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        wiggle: 'wiggle 2.5s ease-in-out infinite',
        'pulse-tag': 'pulse-tag 1.8s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}
