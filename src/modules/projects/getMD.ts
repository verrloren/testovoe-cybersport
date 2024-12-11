// getMD.ts
'use server';

import { getToken } from "@/modules/auth/getToken";


type DataType = {
	success: boolean;
	response: string;
}

export const getMD = async (projectId: number) => {
  const { token } = await getToken();

  if (!token) {
    throw new Error("No access token");
  }
	try {
  const result = await fetch(`${process.env.BACKEND_API_URL}/api/report`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'API-Key': process.env.BACKEND_API_KEY as string,
      'id': `${projectId}`,
    },
  });

	const { success, response } = await result.json();

	const data: DataType = {
		success,
		response
	}

	if(!success || !response) {
		return data
	}

	return data;
} catch (error) {
	console.error(error)
}
	
};