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
  baseKey: "projects",
  getProjects: async (token: string | undefined) => {
    const response = await jsonApiInstance<ProjectsResponse>("/api/projects", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "API-Key": process.env.BACKEND_API_KEY as string,
      },
      json: null,
    });
    return response.response;
  },
  // This means all ProjectDto fields are optional EXCEPT id
  updateProject: (
    data: Partial<ProjectDto> & { id: number; name: string },
    token: string | undefined
  ) => {
    return jsonApiInstance<ResponseDto>(`/api/projects/edit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "API-Key": process.env.BACKEND_API_KEY as string,
      },
      json: data,
    });
  },
  deleteProject: (
    data: Partial<ProjectDto> & { id: number },
    token: string | undefined
  ) => {
    return jsonApiInstance<ResponseDto>(`/api/projects/delete`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "API-Key": process.env.BACKEND_API_KEY as string,
      },
      json: data,
    });
  },
};

export const styleGuidesApi = {
  baseKey: "styleguides",
  getStyleGuides: async (token: string | undefined) => {
    const response = await jsonApiInstance<StyleGuidesResponse>(
      "/api/styleguide",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "API-Key": process.env.BACKEND_API_KEY as string,
        },
        json: null,
      }
    );
    return response.response;
  },
  sendStyleGuide: (formData: FormData, token: string | undefined) => {
    return fetch(`${process.env.BACKEND_API_URL}/api/styleguide/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "API-Key": process.env.BACKEND_API_KEY as string,
        id: formData.get("codelang_code") as string,
        name: formData.get("subject") as string,
      },
      body: formData.get("file") as Blob,
    });
  },
	
  setDefaultStyleGuide: (id: number, token: string | undefined) => {
    return jsonApiInstance<ResponseDto>(`/api/styleguide/change_default`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "API-Key": process.env.BACKEND_API_KEY as string,
      },
      json: { id }, // Changed from json: id to json: { id }
    });
  },
};
