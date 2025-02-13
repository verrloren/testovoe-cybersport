

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

export interface ResponseDto {
	success: boolean;
	response: string;
}