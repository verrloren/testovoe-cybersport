'use server';

import { getToken } from "./getToken";

export const getPdf = async (projectId: number): Promise<Blob> => {
  const { token } = await getToken();

  if (!token) {
    throw new Error("No access token");
  }

  const response = await fetch(`${process.env.BACKEND_API_URL}/api/projects/${projectId}/pdf`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'API-Key': process.env.BACKEND_API_KEY as string
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to get PDF: ${response.statusText}`);
  }

  return response.blob();
};