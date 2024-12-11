'use server';

import { getToken } from "@/modules/auth/getToken";


type DataType = {
	success: boolean;
	response: string;
}

 export const editProjectName = async (id: number, name: string) => {

	const { token } = await getToken();

		try {
			const result = await fetch(`${process.env.BACKEND_API_URL}/api/projects/edit`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'API-Key': process.env.BACKEND_API_KEY as string,
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({ id, name })
			})

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
 }