/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        public: "#2d4000",
        private: "#8AB863",
        private2: "rgba(253, 151, 45, .8)",
        white: "#ffffff",
        black: "#000000",
        lightGray: "#c7c6c1",
        darkGray: "#262626",
        red: "#FF0000",
        vintage: "#540202",
        grayLight: "#ececec",
        blue: "#0000FF",
        bg: "#f2f2f2",
        tet: "#ff5887",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        lora: ["Lora", "serif"],
        playfair: ["Playfair Display", "sans-serif"],
      },
      keyframes: {
        pulseGrow: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
      },
      animation: {
        pulseGrow: "pulseGrow 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
