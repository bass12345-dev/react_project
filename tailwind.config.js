/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],

    theme: {

      extend: {
          colors: {
              debexRed: '#4d3a3a',
              debexLightBlue: '#D9D9D9',
              debexPrimary: '#222E3C'
          },
          fontFamily: {
              roboto: ['Roboto', 'sans-serif'],
              varela: ['Varela Round', 'sans-serif'],
              sixtyfour: ['Sixtyfour', 'sans-serif'],  // 'sans-serif' as a fallback
          },
      },

  },
  plugins: [
    require('flowbite/plugin')
  ],
}