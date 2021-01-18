const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = ({ env }) => ({
    plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
        env === "production" ? purgecss({
            content: ['public/*.html']
        }) : false,
        require('postcss-discard-comments'),
    ]
})