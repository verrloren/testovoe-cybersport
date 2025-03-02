import { matchesApi } from "../api/api";



export const useGetMatches = async () => {
	try {
		const matches = await matchesApi.getMatches();
		return matches;
	} catch (error) {
		console.error(error)
	}
}