/** @type {import('tailwindcss').Config} */
const colors = require("./src/styles/colors.json");

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quattrocentoregular: ["Quattrocento_400Regular"],
        quattrocentobold: ["Quattrocento_700Bold"],
      },
      colors,
    },
  },
  plugins: [],
};
