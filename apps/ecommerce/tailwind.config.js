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
        background: '#F7F8FA',
        foreground: '#202020',
        brand: {
          DEFAULT: '#0052B4',
          hover: '#003F8A',
        },
        'nav-bg': '#ffffff',
        border: '#E2E8F0',
        muted: {
          DEFAULT: '#656565',
          bg: '#F0F0F0',
        },
        success: '#6DA544',
        warning: '#FFDA44',
        'header-top': '#ffffff',
        'header-nav': '#ffffff',
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
