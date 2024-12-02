/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-custom': 'linear-gradient(0.54deg, #000000 -1.7%, rgba(0, 0, 0, 0.5) 36.31%, rgba(102, 102, 102, 0) 99.6%)',
      },
    },
  },
  plugins: [],
}

