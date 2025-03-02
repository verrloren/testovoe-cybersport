import { UseQueryOptions } from "@tanstack/react-query";
import { jsonApiInstance, Match } from "@/shared";

export const matchesApi = {
  baseKey: "matches",
  getMatches: (): UseQueryOptions<Match[]> => {
    return {
      queryKey: [matchesApi.baseKey],
      queryFn: async ({ signal }) => {
        const response = await jsonApiInstance<{ ok: boolean; data: { matches: Match[] } }>(
          `/fronttemp`,
          {
            signal,
            json: null,
          }
        );
				if(!response.ok) throw new Error("Error fetching matches");
        return response.data.matches;
      },
    };
  },
};