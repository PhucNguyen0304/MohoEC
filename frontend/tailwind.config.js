/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn .5s ease-in-out",
        fadeInNav:"fadeInNav 1s ease-in-out",
        fadeOutNav:"fadeOutNav 1s ease-in-out",
        fadeInHero: "fadeInHero .5s ease-in-out",
        expandMiniCart: 'expandMiniCart 1s ease-in-out',
        collapseMiniCart: 'collapseMiniCart 1s ease-in-out',
      },
      keyframes: {
        fadeIn : {
 "0%":{opacity:'0'},
        "100%":{opacity:'1'}
        },
        fadeOut: {
        "0%": {opacity:'1'},
        "100%": {opacity:'0'}
        },
        fadeInNav: {
          "0%":{width:'200px',opacity:'0'},
          "100%":{width:"350px",opacity:'1'}
        },
        fadeOutNav: {
          "0%":{width:"500px",opacity:'1'},
          "100%":{width:'0%',opacity:'0'}
        },
        fadeInHero: {
            "0%": {opacity:'0'},
            "100%":{opacity:"1"}
        },
        expandMiniCart: {
          '0%': { opacity: '0'},
          '100%': { opacity: '1'},
        },
        collapseMiniCart: {
          '0%': { opacity: '1'},
          '100%': { opacity: '0'},
        },
       
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Use Google Font
        playwrite:["Playwrite IT Moderna",'sans-serif'],
        hubot:["Hubot Sans",'sans-serif'],
        montserrat:["Montserrat","sans-serif"],
        bigShoulders:["Big Shoulders","sans-serif"],
        Rufina:["Rufina","sans-serif"]

        
      }
  },
  plugins: [],
}
}