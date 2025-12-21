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
        'nana-green': '#469ADC',
        'nana-lime': '#4ADE80',
        'nana-purple': '#C084FC',
        'nana-stone': '#A8A29E',
        primary: {
          black: '#000000',
          white: '#FFFFFF',
          green: '#469ADC',
        },
        text: {
          primary: '#000000',
          secondary: '#666666',
          tertiary: '#999999',
          disabled: '#CCCCCC',
          inverse: '#FFFFFF',
        },
        background: {
          primary: '#FFFFFF',
          secondary: '#F6F6F6',
          tertiary: '#EEEEEE',
        },
        border: {
          light: '#E0E0E0',
          medium: '#CCCCCC',
          dark: '#999999',
        },
        semantic: {
          success: '#06C167',
          warning: '#F0B323',
          error: '#E8594F',
        },
      },
      borderRadius: {
        20: '20',
        sm: '0.25rem',   // 4px - Zepto style
        md: '0.375rem',  // 6px - Zepto style
        lg: '0.5rem',    // 8px - Zepto style
        xl: '0.75rem',   // 12px
      },
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
      },
      fontFamily: {
        Omnes: ['Omnes', 'sans-serif'],
        primary: ['Omnes', 'sans-serif'],
      },
      boxShadow: {
        'nana-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'nana-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'nana-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'nana-xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
