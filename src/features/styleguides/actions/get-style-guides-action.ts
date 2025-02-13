'use server';

import { StyleGuide } from "@/entities/styleguide";
import { styleGuidesApi } from "@/features/styleguides";
import { getToken } from "@/features/auth";


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