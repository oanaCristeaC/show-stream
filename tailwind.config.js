/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,js,vue}",
        "./src/**/**/*.{html,js,vue}",
    ],
    darkMode: 'class', // Enable dark mode support with a class
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#ffffff',
                    DEFAULT: '#ffffff',
                    dark: '#141414',
                },
            },
        },
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
    },
    plugins: [],
}

