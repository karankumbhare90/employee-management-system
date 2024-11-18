module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDuration: {
        '400': '400ms',
      },
      boxShadow: {
        'custom': 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
