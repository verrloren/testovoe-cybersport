'use server';

import { getToken } from "../auth/getToken";

type DataType = {
	success: boolean;
	response: string;
}

 export const deleteProject = async (id: number) => {

	const { token } = await getToken();



		try {
			const result = await fetch(`${process.env.BACKEND_API_URL}/api/projects/delete`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'API-Key': process.env.BACKEND_API_KEY as string,
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({ id })
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