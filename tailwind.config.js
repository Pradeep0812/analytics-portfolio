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
                // Carbon Graphite Executive Theme
                primary: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#9CA3AF',  // Steel Gray - main actions
                    600: '#D1D5DB',  // Steel Gray hover
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                    950: '#030712',
                },
                accent: {
                    50: '#ecfeff',
                    100: '#cffafe',
                    200: '#a5f3fc',
                    300: '#67e8f9',
                    400: '#67E8F9',  // Soft Cyan subtle
                    500: '#22D3EE',  // Soft Cyan - highlights
                    600: '#06b6d4',
                    700: '#0e7490',
                    800: '#155e75',
                    900: '#164e63',
                    950: '#083344',
                },
                surface: {
                    50: '#E5E7EB',   // Text primary (soft white)
                    100: '#9CA3AF',  // Text muted
                    200: '#6b7280',
                    300: '#4b5563',
                    400: '#374151',
                    500: '#1F2937',  // Border/divider
                    600: '#1F2933',  // Slate Carbon (elevated)
                    700: '#1F2933',  // Surface elevated
                    800: '#111827',  // Graphite (cards)
                    900: '#0B0F14',  // Carbon Black (main bg)
                    950: '#0B0F14',  // Carbon Black
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
};
