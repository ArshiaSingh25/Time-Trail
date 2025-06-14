/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        audiowide: ['Audiowide'],
        cinzel: ['Cinzel'],
        michroma: ['Michroma', 'sans-serif'],
        digital: ['Orbitron'],        
        terminal: ['VT323'],
        ocean: ['Seaweed']
      },
      animation: {
        typewriter1: "typewriter1 5s steps(30) forwards",
        typewriter2: "typewriter2 8s steps(56) forwards 2.5s, fadeIn 0s forwards 2.5s", // add fadeIn
      },
      keyframes: {
        typewriter1: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
        typewriter2: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      
    },
  },
  plugins: [],
};
