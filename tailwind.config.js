/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Antonio', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#f3f3f3',
        foreground: '#303030',
        card: '#ffffff',
        'text-main': '#303030',
        'text-muted': '#8f8f8f',
        accent: '#5e67e6',
        green: '#0bde66',
        primary: {
          DEFAULT: '#5e67e6',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f3f3f3',
          foreground: '#303030',
        },
        muted: {
          DEFAULT: '#8f8f8f',
          foreground: '#303030',
        },
      },
      letterSpacing: {
        tighter: '-0.03em',
        tightest: '-0.05em',
      }
    },
  },
  plugins: [],
}
