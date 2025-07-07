/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Apple's spacing system (8pt grid)
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
      },
      
      // Apple's subtle border radius
      borderRadius: {
        'apple': '12px',
        'apple-lg': '16px',
        'apple-xl': '20px',
        'apple-card': '24px',
      },
      
      // Apple's color palette
      colors: {
        'apple-gray-50': '#fafafa',
        'apple-gray-100': '#f5f5f7',
        'apple-gray-200': '#e8e8ed',
        'apple-gray-300': '#d2d2d7',
        'apple-gray-800': '#1d1d1f',
        'apple-gray-900': '#000000',
        'apple-blue': '#007aff',
        'apple-green': '#30d158',
      },
      
      // Apple's typography system
      fontFamily: {
        'apple': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
      },
      
      // Apple's subtle shadows
      boxShadow: {
        'apple': '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
        'apple-lg': '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
        'apple-glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      
      // Glass morphism backdrop blur
      backdropBlur: {
        'apple': '20px',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}; 