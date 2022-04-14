module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}


const tailwindcss = require("tailwindcss");

module.exports = {
  content: ["./src/**/*.{js,jsx}"],

  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: ["luxury"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
   
  },
}



// require('tailwindcss'),
//             require('autoprefixer')