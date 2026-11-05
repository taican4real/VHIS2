/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/payload/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#A80028',
        'primary-dark': '#600000',
        'primary-light': '#F3DDE3',
        secondary: '#680019',
        accent: '#DB903A',
        background: '#F8F5F2',
        surface: '#FFFEFA',
        'text-primary': '#1C2926',
        'text-secondary': '#655D5D',
        border: '#DEDFD8',
        success: '#2F684B',
        warning: '#855B1F',
        error: '#A33333',
        'on-primary': '#FFFEFA',
        focus: '#A8753D',
      },
      fontFamily: {
        display: ['var(--font-manrope)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '24px',
        '6': '32px',
        '7': '48px',
        '8': '64px',
        '9': '96px',
      },
      borderRadius: {
        control: '0px',
      },
    },
  },
  plugins: [],
}