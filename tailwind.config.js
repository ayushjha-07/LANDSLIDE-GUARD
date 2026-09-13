/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Kadence WordPress Theme Clean Sans Typography
        sans: [
          'Inter',
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"Segoe UI"', 
          'Roboto', 
          'Oxygen', 
          'Ubuntu', 
          'Cantarell', 
          '"Helvetica Neue"', 
          'sans-serif'
        ],
        heading: [
          'Inter',
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"Segoe UI"', 
          'Roboto', 
          'Oxygen', 
          'Ubuntu', 
          'Cantarell', 
          '"Helvetica Neue"', 
          'sans-serif'
        ],
      },
      colors: {
        // Kadence Cobalt Blue palette mapped to forest for seamless theme integration
        forest: {
          50: '#ebf8ff',
          100: '#bee3f8',
          200: '#90cdf4',
          300: '#63b3ed',
          400: '#4299e1',
          500: '#2b6cb0', // Kadence Primary Accent (Global Palette 1)
          600: '#2c5282', // Kadence Accent Hover
          700: '#1a365d', // Kadence Dark Accent
          800: '#152c4d',
          900: '#0e1e36',
          950: '#0a1526',
        },
        earth: {
          50: '#f7fafc',
          100: '#edf2f7',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#a0aec0',
          500: '#718096',
          600: '#4a5568',
          700: '#2d3748',
          800: '#1a202c',
          900: '#0e131f',
        },
        nature: {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        kadence: {
          primary: '#2b6cb0',
          hover: '#2c5282',
          heading: '#1a202c',
          body: '#2d3748',
          muted: '#718096',
          border: '#e2e8f0',
          canvas: '#f7fafc',
          darkCanvas: '#0e131f',
          darkSurface: '#1a202c',
          darkBorder: '#2d3748',
        },
        hazard: {
          amber: '#f59e0b',
          orange: '#ea580c',
          red: '#dc2626',
        }
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'soft-dark': '0 4px 20px -4px rgba(0, 0, 0, 0.35)',
        'kadence': '0 4px 14px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
