module.exports = () => ({
    plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
        require('postcss-discard-comments'),
        require('postcss-csso')
    ]
})