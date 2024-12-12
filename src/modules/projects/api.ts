import { ProjectDto } from "@/lib/types";
import { jsonApiInstance } from "@/shared/projects/api-instance";

interface ProjectsResponse {
  response: ProjectDto[];
}
interface ResponseDto {
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
	updateProject: (data: Partial<ProjectDto> & {id: number, name: string}, token: string|undefined) => {
		return jsonApiInstance<ResponseDto>(`/api/projects/edit`, {
				method: "POST",
				headers:{
					'Authorization': `Bearer ${token}`,
					'API-Key': process.env.BACKEND_API_KEY as string,
				},
				json: data
		})
	},
	deleteProject: (data: Partial<ProjectDto> & {id: number}, token: string|undefined) => {
		return jsonApiInstance<ResponseDto>(`/api/projects/delete`, {
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