import { Project } from "@/entities/project";
import { StyleGuide } from "@/entities/styleguide";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  projects: Project[];
  user_guidelines: StyleGuide[];
}

export type UserDto = {
	id: number; 
	login: string; 
	password: string 
};