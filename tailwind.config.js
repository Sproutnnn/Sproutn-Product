export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f5ee',
          100: '#c3e6d5',
          200: '#9fd7bb',
          300: '#7bc8a1',
          400: '#57b987',
          500: '#2d8a63', // Main brand green
          600: '#267d59',
          700: '#1f6f4e',
          800: '#175c40',
          900: '#0f4932',
        },
        charcoal: {
          50: '#f5f6f7',
          100: '#e6e8ea',
          200: '#cfd3d7',
          300: '#b0b6bc',
          400: '#8c959e',
          500: '#3a4149', // Main brand dark gray
          600: '#343a41',
          700: '#2d3238',
          800: '#272a30',
          900: '#1f2226',
        }
      }
    }
  }
}