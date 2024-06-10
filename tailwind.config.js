/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,vue,js,ts,jsx,tsx}",
        "./src/**/**/*.{vue,js,ts,jsx,tsx}",
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

