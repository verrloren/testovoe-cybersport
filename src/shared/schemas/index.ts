import * as z from 'zod';

export const LoginSchema = z.object({
	email: z.string().email({
		message: 'Enter valid email'
	}),
	password: z.string().min(1, { message: 'Password is required' }),
});


export const RegisterSchema = z.object({
	email: z.string().email({
		message: 'Enter valid email'
	}),
	password: z.string().min(6, { message: 'Minimum 6 characters required' }),
	name: z.string().min(1, { message: 'Name is required' }),
});

export const createProjectSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  styleGuide: z.string().min(1, "Style guide is required"),
});

export const createStyleGuideSchema = z.object({
  styleGuideName: z.string().min(1, "Style Guide name is required"),
  architectureErrors: z.string().optional().or(z.literal('architectureErrors')),
  packageErrors: z.string().optional().or(z.literal('packageErrors')),
  structureErrors: z.string().optional().or(z.literal('structureErrors')),
  namingErrors: z.string().optional().or(z.literal('namingErrors')),
  styleErrors: z.string().optional().or(z.literal('styleErrors')),
  standartsErrors: z.string().optional().or(z.literal('standartsErrors')),
});



export type CreateProjectFormData = z.infer<typeof createProjectSchema>;
export type CreateStyleGuideFormData = z.infer<typeof createStyleGuideSchema>;