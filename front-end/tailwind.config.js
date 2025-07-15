/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50:  '#e6f9f0',
          100: '#c1f2dd',
          200: '#8be4c1',
          300: '#4fd49e',
          400: '#22c97f', // verde claro usado nos botões
          500: '#16a765', // verde principal
          600: '#158f56',
          700: '#137a4a',
          800: '#115f3a',
          900: '#0d4a2c',
        },
      },
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}; 