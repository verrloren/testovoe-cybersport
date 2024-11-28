'use server';

import { fetchWithAuth } from "./fetchWithAuth";

type DataType = {
	success: boolean;
	response: string;
}

 export const getProjects = async () => {



		try {
			const result = await fetchWithAuth(`${process.env.BACKEND_API_URL}/projects/delete`, { method: 'DELETE' });

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