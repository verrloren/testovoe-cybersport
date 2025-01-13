'use server';
 
import { getToken } from "@/modules/auth/getToken";
import { styleGuidesApi } from "./api";

export const deleteStyleGuideAction = async (id: number) => {
const { token } = await getToken();
	try {
		const { success, response } = await styleGuidesApi.deleteStyleGuide(id, token);
		return {success, response }
	} catch (error) {
		console.error(error)
	}
}