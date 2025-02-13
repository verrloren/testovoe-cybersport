'use server';

import { ProjectDto } from "@/shared/model/types";
import { getToken } from "@/modules/auth/getToken";
import { projectsApi } from "./api";

export const getProjectsAction = async (): Promise<ProjectDto[]> => {
  try {
    const { token } = await getToken();
    const projects = await projectsApi.getProjects(token);
    return projects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return []; // Return empty array to prevent retrying
  }
};