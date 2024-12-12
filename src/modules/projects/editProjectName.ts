'use server';

import { getToken } from "@/modules/auth/getToken";
import { projectsApi } from "./api";

 export const editProjectName = async (id: number, name: string) => {
	const { token } = await getToken();
		try {
			const { success, response } = await projectsApi.updateTodo({ id, name }, token);
			return {success, response }
		} catch (error) {
			console.error(error)
		}
 }