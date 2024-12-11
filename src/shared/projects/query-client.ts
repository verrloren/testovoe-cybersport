import { QueryClient } from 'react-query'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1 * 60 * 1000,
		},
	},
});