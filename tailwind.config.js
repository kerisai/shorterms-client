/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#eaf7ff',
          '100': '#d9f0ff',
          '200': '#bbe3ff',
          '300': '#92cfff',
          '400': '#68adff',
          '500': '#458bff',
          '600': '#2465ff',
          '700': '#1954e9',
          '800': '#1748bc',
          '900': '#1c4193',
          '950': '#0a1633',
        },
        backdrop: "#f8f8f8",
      }
    },
  },
  plugins: [],
}