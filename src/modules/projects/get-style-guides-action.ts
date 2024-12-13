'use server';

import { getToken } from "../auth/getToken";
import { styleGuidesApi } from "./api";
import { StyleGuide } from "@/lib/types";

export const getStyleGuidesAction = async (): Promise<StyleGuide[]> => {
  const { token } = await getToken();
  try {
    const guides = await styleGuidesApi.getStyleGuides(token);
    return guides || [];
  } catch (error) {
    console.error('Failed to fetch style guides:', error);
    return [];
  }
};