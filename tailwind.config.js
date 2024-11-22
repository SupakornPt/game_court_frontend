/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        chewy: ['Chewy'],
        poppins: ['Poppins'],
        fredoka: ['Fredoka'],
      },
        colors:{
          menu: "#686868",
        },
        cursor: {
          "swordCursor": 'url(https://res.cloudinary.com/dxfryzi0g/image/upload/v1728461886/cursor/sword%20cursor.png),auto'
        },
    },
    },
  plugins: [
    require('daisyui'),
  ],
}