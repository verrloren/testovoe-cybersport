import { ProjectDto, StyleGuide } from "@/lib/types";
import { jsonApiInstance } from "@/shared/projects/api-instance";

interface ProjectsResponse {
  response: ProjectDto[];
}
interface StyleGuidesResponse {
  response: StyleGuide[];
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
}



export const styleGuidesApi = {
  baseKey: 'styleguides',
  getStyleGuides: async (token: string|undefined) => {
    const response = await jsonApiInstance<StyleGuidesResponse>('/api/styleguide', {
      method: 'GET',
			headers:{
				'Authorization': `Bearer ${token}`,
				'API-Key': process.env.BACKEND_API_KEY as string,
			},
      json: null,
    });
    return response.response;
  },
	// updateProject: (data: Partial<ProjectDto> & {id: number, name: string}, token: string|undefined) => {
	// 	return jsonApiInstance<ResponseDto>(`/api/projects/edit`, {
	// 			method: "POST",
	// 			headers:{
	// 				'Authorization': `Bearer ${token}`,
	// 				'API-Key': process.env.BACKEND_API_KEY as string,
	// 			},
	// 			json: data
	// 	})
	// },
	// deleteProject: (data: Partial<ProjectDto> & {id: number}, token: string|undefined) => {
	// 	return jsonApiInstance<ResponseDto>(`/api/projects/delete`, {
	// 			method: "POST",
	// 			headers:{
	// 				'Authorization': `Bearer ${token}`,
	// 				'API-Key': process.env.BACKEND_API_KEY as string,
	// 			},
	// 			json: data
	// 	})
	// },
}