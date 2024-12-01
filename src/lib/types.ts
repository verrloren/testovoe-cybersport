




// export interface Project {
// 	id: string;
//   name: string;
// 	last_edit_date: Date;
//   status: string;

//   codeReview?: string; 

//   recommendations?: string; //arhitectural violations and recommendations

//   logs?: LogEntry[]; //array of logs
// }

// export interface LogEntry {
// 	id: string;
// 	header: string;
// 	status: string;
// 	code: string;
// }



// export interface IProject {
// 	id: string;
//   label: string;
// 	lastEditDate: Date;
//   status: string;

//   codeReview: ICodeReview; //code review: errors and solutions
//   recommendations: IRecommendations; //arhitectural violations and recommendations
// }

// export interface IRecommendations {

// 	overallProjectRecommendation?: {
// 		performance?: string[];
// 		seo?: string[];
// 		accessibility?: string[];
// 		security?: string[];
// 	};
	
// 	archIssues?: {
// 		id: string;

// 		label: string;
// 		fileName: string;
// 		lineNumber: number;

// 		solution: string;
// 	}[];

// }

// export interface ICodeReview {
// 	errors?: IError[];
// 	warnings?: IError[];

// 	namingIssues?: IError[];
// 	styleIssues?: IError[];
// 	standardIssues?: IError[];
// 	packageIssues?: IError[];
// }

// export interface IError {
// 	id: string;
// 	status: string;

// 	label: string;
// 	fileName?: string;
// 	lineNumber?: number;

// 	solution?: string;
// 	code?: string;
// }



// export interface StyleGuide {
//   id: number;
//   name: string;
// 	codelang_code: string;
//   styleGuide: string;
//   selectedFile?: StyleGuide;
// }

// export interface StyleGuideUpload {
//   id: string;
//   name: string;
// 	projectId: string;
//   file?: File;
// }


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
  last_edit_date: string; // Use ISO 8601 string format for dates
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
	id: string;
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