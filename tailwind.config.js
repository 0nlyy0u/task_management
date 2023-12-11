/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            rotate: {
                '135': '135deg'
            },
            colors: {
                'primary': '#d50000',
                'primaryAlpha': 'rgba(213, 0, 0, 0.12)',
                'bgWindow': '#f8f8f8',
                'borderColor': '#ddd'
            }
        },
    },
    plugins: [],
}

