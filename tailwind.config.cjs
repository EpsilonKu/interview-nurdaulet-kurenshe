/** @type {import('tailwindcss').Config}*/
const config = {
  darkMode: "false",
  content: ["./src/**/*.{html,js,svelte,ts}", "./index.html"],
  theme: {
    extend: {
      colors: {
        svelte: "#ff3e00",
      },
    },
  },
  plugins: [],
};

module.exports = config;
