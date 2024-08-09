// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'text-error-red': '#ec1414'
      }
    }
  },
  variants: {
    extend: {}
  },
  // eslint-disable-next-line no-undef
  plugins: [require('tailwindcss-primeui')]
}
