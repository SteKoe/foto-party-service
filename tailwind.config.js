/** @type {import('tailwindcss').Config} */
const { heroui } = require('@heroui/react');

module.exports = {
    content: [
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            animation: {
                indeterminate: "indeterminate 1.5s infinite linear",
            },
            keyframes: {
                indeterminate: {
                    "0%": { left: "-50%" },
                    "100%": { left: "100%" },
                },
            },
        },
    },
    darkMode: 'class',
    plugins: [
        heroui(),
    ],
};
