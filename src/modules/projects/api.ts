import { ProjectDto } from "@/lib/types";
import { jsonApiInstance } from "@/shared/projects/api-instance";

interface ProjectsResponse {
  response: ProjectDto[];
}

export const projectsApi = {
  baseKey: 'projects',
  getProjects: async (token: string|undefined) => {
    const response = await jsonApiInstance<ProjectsResponse>('/api/projects', {
      method: 'GET',
			headers:{
				'Authorization': `Bearer ${token}`,
				'API-Key': process.env.BACKEND_API_KEY as string,

			},
      json: null,
    });
    return response.response;
  }
}