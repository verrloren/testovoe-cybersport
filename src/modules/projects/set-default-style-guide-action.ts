
'use server';

import { getToken } from "../auth/getToken";
import { styleGuidesApi } from "./api";
import { ApiResponse } from "@/lib/types";

export const setDefaultStyleGuideAction = async (selectedGuides: { guideline_id: number; codelang_code: string }[]): Promise<ApiResponse> => {
  const { token } = await getToken();
  try {
    return await styleGuidesApi.setDefaultStyleGuide(selectedGuides, token);
  } catch (error) {
    return {
      success: false,
      response: error instanceof Error ? error.message : 'Failed to update style guide'
    };
  }
};