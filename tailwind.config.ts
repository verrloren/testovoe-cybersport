import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/date-input.js"
  ],
  theme: {
    extend: {
			fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
				ibmPlexMono: ['IBM_Plex_Mono', 'monospace'],
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
} satisfies Config;
