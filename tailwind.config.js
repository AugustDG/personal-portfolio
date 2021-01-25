module.exports = {
  purge: {
    content: ['public/*.html'],
    options: {
      safelist: ['w-0'],
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      '2xl': { 'max': '1535px' },
      'xl': { 'max': '1279px' },
      'lg': { 'max': '1023px' },
      'md': { 'max': '767px' },
      'sm': { 'max': '639px' },
      'xs': { 'max': '490px' },
    },
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
      borderWidth: {
        '12': '12px',
      },
      zIndex: {
        '5': 5,
      },
      boxShadow: {
        'hard-green': '0 0 0 2px theme("colors.green.700")'
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
      animation: ['hover'],
      borderWidth: ['hover']
    },
  },
  plugins: [],
}
