/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        extend: {
            animation: {
                neon: 'neon 1.5s ease-in-out infinite alternate',
                'neon-dark': 'neon-dark 1.5s ease-in-out infinite alternate',
            },
            keyframes: {
                neon: {
                    '0%, 100%': {
                        'text-shadow': '0 0 20px #000, 0 0 100px #000, 0 0 20px #000',
                    },
                    '50%': {
                        'text-shadow': '0 0 50px #000, 0 0 150px #000, 0 0 50px #000',
                        'color': 'white'
                    }
                },
                'neon-dark': {
                    '0%, 100%': {
                        'text-shadow': '0 0 20px #fff, 0 0 100px #fff, 0 0 20px #fff',
                    },
                    '50%': {
                        'text-shadow': '0 0 50px #fff, 0 0 150px #fff, 0 0 50px #fff',
                        'color': 'lightblue'
                    }
                },
            }
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
}

