import { ProjectDto } from "@/shared/model/types";
import { jsonApiInstance } from "@/shared/projects/api-instance";

interface ProjectsResponse {
  response: ProjectDto[];
}

interface ResponseDto {
  success: boolean;
  response: string;
}


export type ProjectStatus = 'pending' | 'processing' | 'success' | 'error';

export interface ProjectStatusResponse {
  response: ProjectDto;
}


export const projectsApi = {
  baseKey: "projects",
  baseUrl: "/api/projects",
  getProjects: async (token: string | undefined) => {
    const response = await jsonApiInstance<ProjectsResponse>("/api/projects", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-API-KEY": process.env.BACKEND_API_KEY as string,
      },
      json: null,
    });
    if (!response) {
      return [];
    }
    return response.response;
  },
  // This means all ProjectDto fields are optional EXCEPT id
  updateProject: (
    data: Partial<ProjectDto> & { id: number; name: string },
    token: string | undefined
  ) => {
    return jsonApiInstance<ResponseDto>(`/api/projects?id=${data.id}&name=${data.name}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-API-KEY": process.env.BACKEND_API_KEY as string,
      },
      json: null,
    });
  },
  deleteProject: (
    data: Partial<ProjectDto> & { id: number },
    token: string | undefined
  ) => {
    return jsonApiInstance<ResponseDto>(`/api/projects`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-API-KEY": process.env.BACKEND_API_KEY as string,
      },
      json: data,
    });
		
  },


  createProject: async (formData: FormData, token: string | undefined) => {
     return jsonApiInstance<ResponseDto>('/api/projects', {
      method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
        "X-API-KEY": process.env.BACKEND_API_KEY as string,
			},
      json: formData,
    });
  },
	checkProjectStatus: async (projectId: number, token: string | undefined): Promise<ProjectStatusResponse> => {
    return jsonApiInstance(`/api/projects?id=${projectId}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
        "X-API-KEY": process.env.BACKEND_API_KEY as string,
			},
			json: null
		});
  }
};


