export interface StyleGuide {
  id: number;
	guideline_id: number;
  codelang_code: string; // 'py', 'ts', 'sharp'
	isActive: boolean;
  name: string;
  text: string;
  user_guidelines: StyleGuide[];
}

export interface StyleGuideResponse {
  success: boolean;
  response: StyleGuide[];
}

export interface StyleGuideMap {
  [key: string]: StyleGuide | null;
}

export type StyleGuideLanguage = 'typescript' | 'python' | 'sharp';

export interface StyleGuideUpload {
	id: number;
	name: string;
	codelang_code: string;
	file: File;
}

