/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Enterprise Stone Theme - Professional & Neutral
                primary: {
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    200: '#e7e5e4',
                    300: '#d6d3d1',
                    400: '#a8a29e',
                    500: '#78716c',  // Stone 500 - main actions
                    600: '#57534e',  // Stone 600 - hover
                    700: '#44403c',
                    800: '#292524',
                    900: '#1c1917',
                    950: '#0c0a09',
                },
                accent: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',  // Sky 500 - professional accent
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49',
                },
                surface: {
                    50: '#fafaf9',   // Stone 50 - lightest bg
                    100: '#f5f5f4',  // Stone 100
                    200: '#e7e5e4',  // Stone 200 - borders light
                    300: '#d6d3d1',  // Stone 300
                    400: '#a8a29e',  // Stone 400 - muted text
                    500: '#78716c',  // Stone 500
                    600: '#57534e',  // Stone 600
                    700: '#44403c',  // Stone 700 - borders dark
                    800: '#292524',  // Stone 800 - cards dark
                    900: '#1c1917',  // Stone 900 - main bg dark
                    950: '#0c0a09',  // Stone 950 - darkest
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                display: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Consolas', 'monospace'],
            },
            fontSize: {
                // Report-style typography scale
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.625rem' }],      // Comfortable reading
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.875rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1.15' }],
            },
            animation: {
                // Subtle, professional animations only
                'fade-in': 'fadeIn 0.3s ease-out',
                'slide-up': 'slideUp 0.4s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            boxShadow: {
                // Flat, subtle shadows for enterprise feel
                'sm': '0 1px 2px 0 rgb(0 0 0 / 0.03)',
                'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.05)',
                'md': '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                'lg': '0 10px 15px -3px rgb(0 0 0 / 0.05)',
            },
        },
    },
    plugins: [],
};
