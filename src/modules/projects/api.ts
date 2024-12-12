import { ProjectDto } from "@/lib/types";
import { jsonApiInstance } from "@/shared/projects/api-instance";

interface ProjectsResponse {
  response: ProjectDto[];
}
interface UpdateTodoResponse {
	success: boolean;
	response: string;
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
  },
	// This means all ProjectDto fields are optional EXCEPT id
	updateTodo: (data: Partial<ProjectDto> & {id: number, name: string}, token: string|undefined) => {
		return jsonApiInstance<UpdateTodoResponse>(`/api/projects/edit`, {
				method: "POST",
				headers:{
					'Authorization': `Bearer ${token}`,
					'API-Key': process.env.BACKEND_API_KEY as string,
				},
				json: data
		})
	},
	// updateTodo: (data: Partial<ProjectDto> & {id: number }) => {
	// 	return jsonApiInstance<ProjectDto>(`/tasks/${data.id}`, {
	// 			method: "PATCH",
	// 			json: data
	// 	})
	// },
}