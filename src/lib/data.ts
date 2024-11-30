// AngularJS Style Guide
// Common Lisp Style Guide
// C++ Style Guide
// C# Style Guide
// Go Style Guide
// HTML/CSS Style Guide
// JavaScript Style Guide
// Java Style Guide
// JSON Style Guide
// Markdown Style Guide
// Objective-C Style Guide
// Python Style Guide
// R Style Guide
// Shell Style Guide
// Swift Style Guide
// TypeScript Style Guide
// Dart style guide
// Cotlin style guide

import { Project } from "./types"

export const projects: Project[] = [
  {
    label: "Next.js",
		status: "error",
		lastEditDate: new Date(),
		codeReview: "Code review next.",
		recommendations: "Consider using a monorepo structure to manage multiple packages within a single repository. This can help with code sharing and dependency management. Additionally, implement server-side rendering (SSR) for better SEO and faster initial load times.Consider using a monorepo structure to manage multiple packages within a single repository. This can help with code sharing and dependency management. Additionally, implement server-side rendering (SSR) for better SEO and faster initial load times. Consider using a monorepo structure to manage multiple packages within a single repository. This can help with code sharing and dependency management. Additionally, implement server-side rendering (SSR) for better SEO and faster initial load times. Consider using a monorepo structure to manage multiple packages within a single repository. This can help with code sharing and dependency management. Additionally, implement server-side rendering (SSR) for better SEO and faster initial load times. Consider using a monorepo structure to manage multiple packages within a single repository. This can help with code sharing and dependency management. Additionally, implement server-side rendering (SSR) for better SEO and faster initial load times. Consider using a monorepo structure to manage multiple packages within a single repository. This can help with code sharing and dependency management. Additionally, implement server-side rendering (SSR) for better SEO and faster initial load times. Consider using a monorepo structure to manage multiple packages within a single repository. This can help with code sharing and dependency management. Additionally, implement server-side rendering (SSR) for better SEO and faster initial load times. ",
		logs: [
			{
				id: "1",
				header: "ReferenceError",
				status: "error",
				code: ` ⨯ ReferenceError: code is not defined
				at ProjectsTable (C:\Users\danil\Desktop\CODE\Next\hackathon-evrz\.next\server\chunks\ssr\[root of the server]__25cdd5._.js:958:35) digest: "3436924529"`,
			},
			{
				id: "2",
				header: "TypeError",
				status: "error",
				code: `
		TypeError: Failed to parse URL from /api/proxy
			at dedupeFetch (file://C%3A/Users/danil/Desktop/CODE/Next/hackathon-evrz/node_modules/next/dist/src/server/lib/dedupe-fetch.ts:59:12)
			at originFetch (file://C%3A/Users/danil/Desktop/CODE/Next/hackathon-evrz/node_modules/next/dist/src/server/lib/patch-fetch.ts:612:17)
			at doOriginalFetch (file://C%3A/Users/danil/Desktop/CODE/Next/hackathon-evrz/node_modules/next/dist/src/server/lib/patch-fetch.ts:958:17) {
		[cause]: TypeError: Invalid URL
				at dedupeFetch (file://C%3A/Users/danil/Desktop/CODE/Next/hackathon-evrz/node_modules/next/dist/src/server/lib/dedupe-fetch.ts:59:12)
				at originFetch (file://C%3A/Users/danil/Desktop/CODE/Next/hackathon-evrz/node_modules/next/dist/src/server/lib/patch-fetch.ts:612:17)
				at doOriginalFetch (file://C%3A/Users/danil/Desktop/CODE/Next/hackathon-evrz/node_modules/next/dist/src/server/lib/patch-fetch.ts:958:17) {
			code: 'ERR_INVALID_URL',
			input: '/api/proxy'`,
			},
		],
  },
  {
    label: "Astro",
		status: "warning",
		lastEditDate: new Date(),
		codeReview: "Code review astro.",
		recommendations: "Leverage Astro's partial hydration feature to improve performance by only hydrating the necessary parts of the page. Additionally, consider using a static site generation (SSG) approach for faster load times and better SEO.",
		logs: [
			{
				id: "1",
				header: "Eslint",
				status: "warning",
				code: `
				⨯ ./node_modules/@hashicorp/react-code-block/fragment.graphql
				Unknown module type
				This module doesn't have an associated type. Use a known file extension, or register a loader for it.
				`
			}
		]
  },
]

export const languagesStyleGuides = [

	{
		id: "typescript",
		name: "TypeScript",
		selectedFile: File,
		styleGuide: [
			"TypeScript Style Guide",
		],
	},
	{
		id: "python",
		name: "Python",
		selectedFile: File,
		styleGuide: [
			"Python Style Guide",
		]
	},
	{
		id: "csharp",
		name: "C#",
		selectedFile: File,
		styleGuide: [
			"C# Style Guide",
		]
	},
	
]





