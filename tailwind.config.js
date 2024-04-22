/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-light-blue": "#e0f3f7",
        "primary-mid-blue": "#5da9b3",
        "primary-dark-blue1": "#0f3353",
        "primary-dark-blue2": "#0d222e",
        "primary-yellow": "#ebe843",
        "primary-orange": "#f8a92e",
        "primary-pink": "#f1584f",
        "primary-red": "#cd2828",

      }
      ,

    fontFamily: {
      poppins: ['var(--poppins)'],
      roboto: ['var(--roboto)'],
      inter: ['var(--inter)'],
      dsd: ['var(--dsd)'],
      ds: ['var(--ds)'],
      noto: ['var(--noto)']
    },


  }
  },
  screens: {
    xs: "375px",
    xmd: "950px",
    ...defaultTheme.screens,
  },
  plugins: [require("daisyui")],
};


