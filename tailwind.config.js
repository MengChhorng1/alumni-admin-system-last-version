/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { brand: { DEFAULT: '#4CAF50', dark: '#43A047', soft: 'rgb(76 175 80 / .14)' } },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      boxShadow: { soft: '0 20px 50px -20px rgb(15 23 42 / .35)' },
      backgroundImage: {
        'admin-gradient': 'radial-gradient(circle at top left, rgba(76,175,80,.22), transparent 32%), radial-gradient(circle at bottom right, rgba(76,175,80,.16), transparent 30%)'
      }
    }
  },
  plugins: []
};
