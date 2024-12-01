// actions/updateDefaultStyleGuides.ts
'use server';

import { getToken } from "./getToken";


export const sendDefaultStyleGuide = async (guidelineId: number) => {
  const { token } = await getToken();

  if (!token) {
    return { success: false, response: "No access token" };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/styleguide/change_default`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'API-Key': process.env.BACKEND_API_KEY as string,
      },
      body: JSON.stringify({ id: guidelineId }),
    });

    const data = await response.json();
    return { success: data.success, response: data.response };
  } catch (error) {
		console.error('Failed to update style guides:', error);
    return { success: false, response: "Failed to update style guides" };
  }
};