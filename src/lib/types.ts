export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string; // Consider using an enum for predefined roles
  projects: Project[];
  user_guidelines: UserStyleGuide[];
}

export interface Project {
  id: number;
  name: string;
  user_id: number;
  last_edit_date: string; 
  project_status: string;

  code_reviews: CodeReview[];
}

export interface ProjectDto {
  id: number;
  name: string;
  user_id: number;
  last_edit_date: string; 
  project_status: string;
  code_reviews: CodeReview[];
}



export interface CodeReview {
  id: number;
  project_id: number;
  project_review: string;
  issues: Issue[];
}

export interface Issue {
  id: number;
  codereview_id: number;
  type_of_issue: string; // Consider using an enum for issue types
  file_path: string;
  line_number: string;
  line_snippet: string;
  issue_body: string;
  suggestions: string;
  suggested_code: string;
}

export interface StyleGuide {
  id: number;
  codelang_code: string; // 'py', 'ts', 'sharp'
	isActive: boolean;
  name: string;
  text: string;
  user_guidelines: UserStyleGuide[];
}

export interface UserStyleGuide {
  id: number;
  guideline_id: number;
  user_id: number;
  is_default: boolean;
}
export interface StyleGuideUpload {
	id: number;
	name: string;
	codelang_code: string;
	file: File;
}

// types.ts
export interface ProjectResponse {
  success: boolean;
  response: Project[];
}

export interface StyleGuideResponse {
  success: boolean;
  response: StyleGuide[];
}