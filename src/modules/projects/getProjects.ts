'use server';

import { ProjectDto } from "@/lib/types";
import { getToken } from "@/modules/auth/getToken";
import { projectsApi } from "./api";


 export const getProjects = async (): Promise<ProjectDto[]> => {
	const { token } = await getToken();
	return await projectsApi.getProjects(token);
 }