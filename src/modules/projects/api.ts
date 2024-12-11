import { ProjectDto } from "@/lib/types";
import { jsonApiInstance } from "@/shared/projects/api-instance";
import { UseQueryOptions } from "react-query";



export const projectsApi = {
	baseKey: "projects",
	getProjectsQueryOptions: ({ userId }: { userId: number }): UseQueryOptions<ProjectDto[]> => {
		return {
			queryKey: [projectsApi.baseKey, userId],
			queryFn: meta =>
				jsonApiInstance<ProjectDto[]>(
					'/projects',
					signal: meta.signal,
					json: null,
				)
		}
	}

	
}