
'use server';

import { getToken } from "../auth/getToken";
import { styleGuidesApi } from "./api";
import { ApiResponse } from "@/lib/types";

export const setDefaultStyleGuideAction = async (guidelineId: number): Promise<ApiResponse> => {
  const { token } = await getToken();
  try {
    return await styleGuidesApi.setDefaultStyleGuide(guidelineId, token);
  } catch (error) {
    return {
      success: false,
      response: error instanceof Error ? error.message : 'Failed to update style guide'
    };
  }
};