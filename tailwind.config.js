/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'media',
    theme: {
        extend: {
            fontFamily: {
                mono: ['Fira Code', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
            },
            colors: {
                terminal: {
                    bg: {
                        dark: '#0a0a0a',
                        light: '#fafafa',
                    },
                    text: {
                        primary: {
                            dark: '#ffffff',
                            light: '#1a1a1a',
                        },
                        secondary: {
                            dark: '#a1a1aa',
                            light: '#525252',
                        },
                    },
                    accent: {
                        green: '#10b981',
                        amber: '#f59e0b',
                        cyan: '#06b6d4',
                        magenta: '#ec4899',
                        blue: '#3b82f6',
                        purple: '#8b5cf6',
                    },
                    prompt: {
                        dark: '#22c55e',
                        light: '#16a34a',
                    },
                    frame: {
                        dark: '#262626',
                        light: '#e5e5e5',
                    },
                },
            },
            animation: {
                'cursor-blink': 'cursor-blink 1s infinite',
            },
            keyframes: {
                'cursor-blink': {
                    '0%, 50%': { opacity: '1' },
                    '51%, 100%': { opacity: '0' },
                },
            },
        },
    },
    plugins: [],
};
