'use server';

import { getToken } from "@/features/auth";
import { styleGuidesApi } from "@/features/styleguides";

export const editStyleGuideAction = async (guideline_id: number, name: string) => {
const { token } = await getToken();
	try {
		const { success, response } = await styleGuidesApi.updateStyleGuide(guideline_id, name, token);
		return {success, response }
	} catch (error) {
		console.error(error)
	}
}