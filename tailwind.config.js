import { brown, green, orange } from '@mui/material/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blackCustom: '#000',
        whiteCustom: '#fff',
        grayCustom: '#373D48',
        skyCustom: '#409BF9',
        orangeCustom: '#FF851B',
        greenCustom: '#3AC587',
        brownCustom: '#703838',
      },
    },
  },
  plugins: [],
}
