import { CodeReview } from "@/shared/model/types";

export interface Project {
	id: number;
	name: string;
	user_id: number;
	file_path: string;
	last_edit_date: string; 
	project_status: string;
	code_reviews: CodeReview[];
}

export interface ProjectResponse {
  success: boolean;
  response: Project[];
}