'use server';

import { getToken } from "@/modules/auth/getToken";
import { styleGuidesApi } from "./api";

 export const editStyleGuideAction = async (guideline_id: number, name: string) => {
	const { token } = await getToken();
		try {
			const { success, response } = await styleGuidesApi.updateStyleGuide(guideline_id, name, token);
			return {success, response }
		} catch (error) {
			console.error(error)
		}
 }