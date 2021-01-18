module.exports = {
  purge: ['dev/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'mono': ['Jetbrains Mono', 'Source Code Pro'],
    },
    fontSize: {
      '5xs': ['0.25rem', '0.5rem'],
      '4xs': ['0.375rem', '0.5rem'],
      '3xs': ['0.5rem', '0.75rem'],
      '2xs': ['0.675rem', '0.75rem'],
      'xs': ['0.75rem', '1.rem'],
      'sm': ['0.875rem', '1.25rem'],
      'base': ['1rem', '1.5rem'],
      'lg': ['0.125rem', '1.75rem'],
      'xl': ['1.25rem', '1.75rem'],
      '2xl': ['1.5rem', '2.0rem'],
      '3xl': ['1.875rem', '2.25rem'],
      '4xl': ['2.25rem', '2.5rem'],
      '5xl': ['3.0rem', '1.0rem'],
      '6xl': ['3.75rem', '1.0rem'],
      '7xl': ['4.5rem', '1.0rem'],
    },
    extend: {
      backgroundImage: () => ({
        'earth': 'url("/img/earth-bg_img.webp")',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
