module.exports = () => ({
    plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
        //require('postcss-discard-comments'),
        require('cssnano')({
            preset: ['advanced', {
                discardComments: {
                    removeAll: true,
                },
            }],
        }),
    ]
})