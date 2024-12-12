'use server';
 
import { getToken } from "@/modules/auth/getToken";
import { projectsApi } from "./api";

export const deleteProjectAction = async (id: number) => {
const { token } = await getToken();
	try {
		const { success, response } = await projectsApi.deleteProject({ id }, token);
		return {success, response }
	} catch (error) {
		console.error(error)
	}
}