/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1a1a1a',
        foreground: '#f5f5f5',
        brand: '#0052B4',
        'brand-hover': '#003F8A',
        surface: '#2a2a2a',
        border: '#404040',
        muted: '#a0a0a0',
        'muted-bg': '#333333',
        success: '#6DA544',
        warning: '#FFDA44',
        danger: '#DC2626',
        nav: '#242424',
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
