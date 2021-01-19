module.exports = {
  purge: {
    content: ['public/*.html'],
    options: {
      safelist: ['w-0'],
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          100: "#d0d0d0",
          200: "#a0a0a0",
          300: "#717171",
          400: "#414141",
          500: "#121212",
          600: "#0e0e0e",
          700: "#0b0b0b",
          800: "#070707",
          900: "#040404",
          1000: "#000000"
        },
      },
      fontFamily: {
        'mono': ['Jetbrains Mono', 'Source Code Pro'],
      },
      fontSize: {
        '4xs': ['0.375rem', '0.5rem'],
        '3xs': ['0.5rem', '0.675rem'],
        '2xs': ['0.675rem', '0.75rem'],
      },
      backgroundImage: () => ({
        'earth': 'url("/img/earth-bg_img.webp")',
        'mars': 'url("/img/mars-bg_img.webp")',
      }),
    },
  },
  variants: {
    extend: {
      width: ['group-hover'],
      animation: ['hover']
    },
  },
  plugins: [],
}
