// sendStyleGuide.ts
'use server';

import { getToken } from "./getToken";

export const sendStyleGuide = async (formData: FormData) => {
  const { token } = await getToken();

  if (!token) {
    return { success: false, response: "No access token" };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/styleguide/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'API-Key': process.env.BACKEND_API_KEY as string,
				'id': formData.get('id') as string,
				'name': formData.get('subject') as string,
				'codelang_code': formData.get('codelang_code') as string,
      },
      body: formData.get('file') as Blob,
    });

    const responseJSON = await response.json();
    
    if (!responseJSON.success) {
      return { success: false, response: `HTTP error! status: ${response.status}` };
    }

    return responseJSON;
  } catch (error) {
    return { 
      success: false, 
      response: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
};