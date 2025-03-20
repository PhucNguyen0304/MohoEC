/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        showSideBar: "showSideBar .5s ease-in-out",
      },
      fontFamily: {
        montserrat:["Montserrat","sans-serif"]
      },
      keyframes: {
          showSideBar: {
            "0%":{height:'0',opacity:'0'},
            "100%":{height:"350px",opacity:'1'}
          },
      }
    },
  },
  plugins: [],
}