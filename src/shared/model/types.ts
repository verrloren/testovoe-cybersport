export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  projects: Project[];
  user_guidelines: StyleGuide[];
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
  type_of_issue: string; 
  line_number: string;
  line_snippet: string;
  issue_body: string;
  suggestions: string;
  suggested_code: string;
}

export interface StyleGuide {
  id: number;
	guideline_id: number;
  codelang_code: string; // 'py', 'ts', 'sharp'
	isActive: boolean;
  name: string;
  text: string;
  user_guidelines: StyleGuide[];
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

export type StyleGuideLanguage = 'typescript' | 'python' | 'sharp';

export interface StyleGuideMap {
  [key: string]: StyleGuide | null;
}

export interface ApiResponse {
  success: boolean;
  response: string;
}