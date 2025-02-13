'use server';

import { getToken } from "@/features/auth";
import { projectsApi } from "@/features/projects";


export const createProjectAction = async (formData: FormData) => {
const { token } = await getToken();
	try {
		const { success, response } = await projectsApi.createProject(formData, token);
		return { success, response };
	} catch (error) {
		console.error(error)
	}
}