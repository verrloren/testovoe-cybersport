'use server';

import { getToken } from "@/features/auth";
import { styleGuidesApi } from "@/features/styleguides";

export const createStyleGuideAction = async (formData: FormData) => {
  const { token } = await getToken();
  try {
		const { success, response } = await styleGuidesApi.createStyleGuide(formData, token);
		return { success, response }
  } catch (error) {
    return { 
      success: false, 
      response: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
};