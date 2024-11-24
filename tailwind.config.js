/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
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
    require('flowbite/plugin'),
    flowbite.plugin(),
  ],
}