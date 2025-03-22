/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cpu-dark': '#1a1a2e',
        'cpu-medium': '#16213e',
        'cpu-light': '#0f3460',
        'cpu-accent': '#e94560',
        'cpu-success': '#4ade80',
        'cpu-warning': '#fbbf24',
      }
    },
  },
  plugins: [],
}