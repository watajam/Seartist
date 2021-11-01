module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",

    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "12/25": "48%",
      },
      fontSize: {
        xs: [".75rem", "1"],
        sm: [".875rem", "1"],
        tiny: [".875rem", "1"],
        base: ["1rem", "1"],
        lg: ["1.125rem", "1"],
        xl: ["1.25rem", "1"],
        "2xl": ["1.5rem", "1"],
        "3xl": ["1.875rem", "1"],
        "4xl": ["2.25rem", "1"],
        "5xl": ["3rem", "1"],
        "6xl": ["4rem", "1"],
        "7xl": ["5rem", "1"],
      },
      colors: {
        orange: {
          400: "#FF7600",
          300: "#FF851C",
          200: "#FE9C47",
          100: "#FFB06B",
        },
      },
    },
  },

  variants: {
    extend: {},
  },

  plugins: [],
};
