export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                darkBg: '#050510',
                neonBlue: '#00f3ff',
                neonPurple: '#9d00ff',
                neonCyan: '#00ffcc'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif']
            }
        },
    },
    plugins: [],
}