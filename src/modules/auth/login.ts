"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { setSession } from "@/modules/auth/setSession";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    const result = await fetch(`${process.env.BACKEND_API_URL}/api/users/login`, {
      method: "POST",
			credentials: "include",
      headers: {
        "Content-Type": "application/json",
				"API-Key": process.env.BACKEND_API_KEY as string,
				'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const { success, access_token: token } = await result.json();

		if (success && token) {
			await setSession(token);
			return { success: true };
	} else {
			return { success: false, message: 'Login failed' };
	}

  } catch (error) {
    console.error(error);
    return { success: false, response: "Error occurred", cookies: [] };
  }
};
