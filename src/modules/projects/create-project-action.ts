'use server';
 
import { getToken } from "@/modules/auth/getToken";
import { projectsApi } from "./api";

export const createProjectAction = async (formData: FormData) => {
const { token } = await getToken();
	try {
		const res = await projectsApi.createProject(formData, token);
		return res;
	} catch (error) {
		console.error(error)
	}
}