/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: { min: "480px" },
    },
    extend: {
      fontFamily: {
        display: ["ADLaM Display"],
      },
      transitionProperty: {
        bgcolor: "background-color",
      },
    },
  },
  plugins: [],
};
