import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
			fontFamily: {
        kings: ['Kings', 'sans-serif'],
        lancelot: ['Lancelot', 'serif'],
				libreFranklin: ['Libre_Franklin', 'sans-serif'],
				libreBaskerville: ['Libre_Baskerville', 'serif'],
			},
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
			borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
    },
  },
  plugins: [],
} satisfies Config;
