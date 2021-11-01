module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './app/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: "2rem",
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1500px",
        xl: "1600px"
      }
    },
    extend: {
      boxShadow: {
        big:
          "0px 0px 20px 2px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 0%)",
        "big-active":
          "0px 0px 20px 2px rgb(0 0 0 / 13%), 0 2px 4px -1px rgb(0 0 0 / 0%)"
      },
      fontFamily: {
        body: ["Lato", "sans-serif"],
        display: ["Lato", "sans-serif"],
        open: ["OpenSans", "sans-serif"],
        h1:["Circe","Circe"]
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
        105: "32rem"
      },
      width: {
        "fit-content": "fit-content"
      },
      colors: {
        mint: {
          300: "#5bd6ad",
          400: "#47d1a3",
          500: "#33CC99",
          600: "#2db789",
          700: "#28a37a",
          disabled: "#ffffff52"
        },
        redish: {
          200: "#e96d84",
          300: "#e65872",
          400: "#e34361",
          500: "#E02F50",
          600: "#c92a48",
          700: "#b32540",
          800: "#9c2038"
        },
        black: "#222222",
        "light-black": "#666666",
        "ultralight-dark": "#F8F8F8",
        "alert-red": "#EF4545",
        "border-hover": "#999999",
        border: "#EAEAEA",
        accent: "#33CC99",
        separator: "#CCCCCC",
        error: "#ff6961"
      },
      height: () => ({
        17: "61px",
        72: "18rem"
      }),
      gridTemplateColumns: {
        // Simple 16 column grid
       '16': 'repeat(16, minmax(0, 1fr))',

        // Complex site-specific column configuration
       'footer': '200px minmax(900px, 1fr) 100px',
      }
    }

  },
  variants: {
    extend: {},
  },
  plugins: [],
}
