import { UseQueryOptions } from "react-query"
import { ProjectDto } from "@/shared/model/types"
import { jsonApiInstance } from "./api-instance"


export const projectsApi = {
	baseKey: 'projects',
	getProjectsQueryOptions: (): UseQueryOptions<ProjectDto[]> => {
		return {
			queryKey: projectsApi.baseKey,
			queryFn: meta =>
				jsonApiInstance<ProjectDto[]>('/api/projects', {
					meta: meta.signal,
					json: null
				})
		}
	}

}