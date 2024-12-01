// actions/checkUserProjects.ts
'use server';

import { getToken } from "./getToken";

export const checkUserProjects = async (): Promise<boolean> => {
  const { token } = await getToken();

  if (!token) {
    return false;
  }

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/projects`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'API-Key': process.env.BACKEND_API_KEY as string,
      },
    });

    const data = await response.json();
    return data.success && data.response.length > 0;
  } catch (error) {
    console.error('Error checking projects:', error);
    return false;
  }
};