/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "5xl": { max: "2560px" },
      "4xl": { max: "1920px" },
      "3xl": { max: "1680px" },
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1060px" },
      tablet: { max: "962px" },
      md: { max: "770px" },
      sm: { max: "639px" },
      xxs: { max: "320px" },
      mlg: "1023px",
    },
    extend: {
      colors: {
        "primary-orange-100": "rgba(75, 192, 192, 0.6)",
        "primary-gray-900": "#201F1B",
        "primary-gray-800": "#3F3C37",
        "primary-gray-700": "#CCC6BA",
        "primary-gray-600": "#F4F3EE",
      },
    },
  },
  plugins: [],
};
