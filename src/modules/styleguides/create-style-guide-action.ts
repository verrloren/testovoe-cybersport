'use server';

import { getToken } from "../auth/getToken";
import { styleGuidesApi } from "./api";
// import { styleGuidesApi } from "./api";

export const createStyleGuideAction = async (formData: FormData) => {
  const { token } = await getToken();
  try {
		const result = await styleGuidesApi.createStyleGuide(formData, token);
		return await result.json();
  } catch (error) {
    return { 
      success: false, 
      response: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
};