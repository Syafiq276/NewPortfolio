import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                lunar: {
                    dark: '#0B132B',
                    light: '#1C2541',
                    card: 'rgba(28, 37, 65, 0.45)',
                    border: 'rgba(224, 225, 221, 0.12)',
                },
                pearl: {
                    light: '#F4F5F7',
                    base: '#E0E1DD',
                    muted: '#8D99AE',
                },
                gold: {
                    light: '#F5D061',
                    base: '#D4AF37',
                    dark: '#A9861B',
                    glow: 'rgba(212, 175, 55, 0.25)',
                }
            },
        },
    },

    plugins: [forms],
};
