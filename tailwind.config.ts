import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
 
const config: Config = {
    darkMode: ['class'],
    content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        tactic: ['var(--font-tactic)', 'sans-serif'],
      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
				pink: '#EB0237',
				green: '#43AD28',
				dark: '#0B0E12',
				black: '#06080C',
				orange: '#EB6402',
				darkGrey: '#101318'
			},
    },
  },
  plugins: [tailwindcssAnimate],
}
export default config