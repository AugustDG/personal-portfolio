module.exports = ({ env }) => ({
    plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
        require('postcss-mq-optimize'),
        require('postcss-discard-comments'),
        env === 'production' ? require('postcss-csso') : false,
    ]
})