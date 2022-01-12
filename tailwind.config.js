module.exports = {
  content: ['./dev/*.html', './dev/projects/*.html'],
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
          750: '#07070780',
          800: "#070707",
          900: "#040404",
          1000: "#000000",
        },
      },
      translate: {
        '1.25': '0.3125rem',
      },
      fontFamily: {
        'mono': ['Jetbrains Mono'],
      },
      borderWidth: {
        '12': '12px',
      },
      zIndex: {
        '5': 5,
        '35': 35,
      },
      maxWidth: {
        '95': '95%',
      },
      boxShadow: {
        'hard-green': '0 0 0 2px theme("colors.green.700")',
        'hard-sm': '5px 5px theme("colors.black.750")',
        'inner-hard-sm': 'inset 3px 3px 1px theme("colors.black.750")',
        'inner-b-hard-sm': 'inset 3px -1px 1px theme("colors.black.750")',
      },
      backgroundImage: () => ({
        'earth': 'url("/img/icons/earth-bg.webp")',
        'mars': 'url("/img/icons/mars-bg.webp")',
      }),
    },
  },
};
