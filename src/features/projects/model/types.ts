import { Project, StyleGuide } from "@/entities";

export type LoginResponse = {
  success: boolean;
} | {
  error: string;
};




export interface ProjectsResponse {
  response: Project[];
}

export interface UploadVariables {
  file: File;
  codelang_code: string;
}

export interface MutationContext {
  previousStyleGuides: StyleGuide[] | undefined;
}
