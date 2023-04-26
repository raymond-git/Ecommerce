/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    fontFamily: { 
      burtons: 'burtons',
      merriweather:['Merriweather', 'serif'],
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
    }
  },
  plugins: [],
}