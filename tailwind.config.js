import { brown, green, orange } from '@mui/material/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      scale: {
        '150': '1.5',
        '200': '2',
        '250': '2.5',
        '300': '3',
      },
    },
  },
  plugins: [],
}
