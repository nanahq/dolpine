import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nana-blue': '#469ADC',
        'nana-lime': '#4ADE80',
        'nana-purple': '#C084FC',
        'nana-stone': '#A8A29E',
      },
      borderRadius: {
        20: '20',
      },
        screens: {
          sm: '375px',
          md: '768px',
          lg: '1024px',
          xl: '1440px',
        },
      },
      fontFamily: {
        Omnes: ['Omnes', 'sans-serif'],
      },
    },
  }
export default config;
