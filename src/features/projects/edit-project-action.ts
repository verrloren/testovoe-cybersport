'use server';

import { getToken } from "@/modules/auth/getToken";
import { projectsApi } from ".";

 export const editProjectAction = async (id: number, name: string) => {
	const { token } = await getToken();
		try {
			const { success, response } = await projectsApi.updateProject({ id, name }, token);
			return {success, response }
		} catch (error) {
			console.error(error)
		}
 }