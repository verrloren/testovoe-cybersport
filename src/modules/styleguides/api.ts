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
      "/api/guidelines",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-API-KEY": process.env.BACKEND_API_KEY as string,
        },
        json: null,
      }
    );
    if (!response) {
      return [];
    }
    return response.response;
  },
  createStyleGuide: (formData: FormData, token: string | undefined) => {
    return fetch(`${process.env.BACKEND_API_URL}/api/guidelines?&name=${formData.get('name')}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-API-KEY": process.env.BACKEND_API_KEY as string,
      },
      body: formData.get("file") as Blob,
    });
  },
	
  setDefaultStyleGuide: (id: number, token: string | undefined) => {
    return jsonApiInstance<ResponseDto>(`/api/styleguide/change_default`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-API-KEY": process.env.BACKEND_API_KEY as string,
      },
      json: { id }
    });
  },

	updateStyleGuide: (guideline_id: number, name: string, token: string | undefined) => {
    return jsonApiInstance<ResponseDto>(`/api/guidelines?name=${name}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-API-KEY": process.env.BACKEND_API_KEY as string,
      },
      json: { id: guideline_id }
    });
  },

  deleteStyleGuide: (id: number, token: string | undefined) => {
    return jsonApiInstance<ResponseDto>(`/api/guidelines`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"X-API-KEY": process.env.BACKEND_API_KEY as string,
			},
			json: { id }
		});
  }
	
};
