'use server';

import { getToken } from "../auth/getToken";

type DataType = {
	success: boolean;
	response: string;
}

 export const getStyleGuides = async () => {

		const { token } = await getToken();

		try {
			const result = await fetch(`${process.env.BACKEND_API_URL}/api/styleguide`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'API-Key': process.env.BACKEND_API_KEY as string,
					'Authorization': `Bearer ${token}`,
				},
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