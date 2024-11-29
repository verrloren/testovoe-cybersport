


export interface Project {

  label: string;
	lastEditDate: Date;
  status: string;

  codeReview: string; 

  recommendations: string; //arhitectural violations and recommendations

  logs: LogEntry[]; //array of logs
}

export interface LogEntry {
	id: string;
	header: string;
	status: string;
	code: string;
}



export interface IProject {
	id: string;
  label: string;
	lastEditDate: Date;
  status: string;

  codeReview: ICodeReview; //code review: errors and solutions
  recommendations: IRecommendations; //arhitectural violations and recommendations
}

export interface IRecommendations {

	overallProjectRecommendation: {
		performance?: string[];
		seo?: string[];
		accessibility?: string[];
		security?: string[];
	};
	
	archIssues?: {
		id: string;

		label: string;
		fileName: string;
		lineNumber: number;

		solution: string;
	}[];

}

export interface ICodeReview {
	errors?: IError[];
	warnings?: IError[];

	namingIssues?: IError[];
	styleIssues?: IError[];
	standardIssues?: IError[];
	packageIssues?: IError[];
}

export interface IError {
	id: string;
	status: string;

	label: string;
	fileName?: string;
	lineNumber?: number;

	solution?: string;
	code?: string;
}