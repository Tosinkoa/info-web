const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "1px",
      md: "800px",
      lg: "1140px",
    },

    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".data_list::-webkit-scrollbar": {
          display: "none",
        },
      });
    }),
  ],
};
