
'use server';

import { getToken } from "../auth/getToken";
import { ApiResponse } from "@/shared/model/types";
import { styleGuidesApi } from "../styleguides/api";

export const setDefaultStyleGuideAction = async (id: number): Promise<ApiResponse> => {
  const { token } = await getToken();
  try {
    return await styleGuidesApi.setDefaultStyleGuide(id, token);
  } catch (error) {
    return {
      success: false,
      response: error instanceof Error ? error.message : 'Failed to update style guide'
    };
  }
};