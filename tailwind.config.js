/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      colors:{
        'public':'#2d4000',
        'private':'#8AB863',
        'private2':'rgba(253, 151, 45, .8)',
        'white': '#ffffff',
        'black':'#000000',
        'gray':'#c7c6c1',
        'red':'#FF0000',
        'vintage':'#540202',    
        'grayLight':'#ececec',
        'blue':'#0000FF',
        'bg':'#ebebf3',
        'tet': '#ff5887',
      },
      fontFamily:{
        roboto:["Roboto", "sans-serif"],
        lora:["Lora", "serif"],
        playfair:['Playfair Display', 'sans-serif']
  
      },
    extend: {
      
    },
  },
  plugins: [],
}