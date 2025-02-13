'use server';

import { getToken } from "@/features/auth";
import { styleGuidesApi } from "@/features/styleguides";
 
export const deleteStyleGuideAction = async (id: number) => {
const { token } = await getToken();
	try {
		const { success, response } = await styleGuidesApi.deleteStyleGuide(id, token);
		return {success, response }
	} catch (error) {
		console.error(error)
	}
}