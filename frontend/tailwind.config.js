/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        kudasai: "#0b0719",
        kudasaiSecondary: "#ea429a",
        kudasaiDark: "#2b214d",
        kudasaiPrimary: "#aa9add",
        kudasaiText: "#c4b6f2",
      },
    },
  },
  plugins: [],
};
