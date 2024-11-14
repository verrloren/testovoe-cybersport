'use server';

import * as z from "zod";
import { LoginSchema } from "../schemas";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";
import { AuthError } from "next-auth";
import { signIn } from "../../auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    // Validate fields
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const { email, password } = validatedFields.data;

    try {
			const result: { error?: string } = await signIn("credentials", {
				email,
				password,
				redirectTo: DEFAULT_LOGIN_REDIRECT // Disable automatic redirect
		});

		if (result?.error) {
				return { error: result.error };
		}

			return { success: 'success' };
		
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }

        throw error;
    }
};

 