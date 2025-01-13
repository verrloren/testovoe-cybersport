import { StyleGuide } from "@/shared/model/types";
import { jsonApiInstance } from "@/shared/projects/api-instance";

interface StyleGuidesResponse {
  response: StyleGuide[];
}
interface ResponseDto {
  success: boolean;
  response: string;
}

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
    if (!response) {
      return [];
    }
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
      json: { id } // Changed from json: id to json: { id }
    });
  },

	updateStyleGuide: (id: number, name: string, token: string | undefined) => {
    return jsonApiInstance<ResponseDto>(`/api/styleguide/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "API-Key": process.env.BACKEND_API_KEY as string,
      },
      json: { name }
    });
  },

  deleteStyleGuide: (id: number, token: string | undefined) => {
    return jsonApiInstance<ResponseDto>(`/api/styleguide`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"API-Key": process.env.BACKEND_API_KEY as string,
			},
			json: { id }
		});
  }
	
};
