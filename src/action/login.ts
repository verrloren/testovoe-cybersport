'use server';

import { LoginSchema } from "@/schemas";
import * as z from "zod";

type DataType = {
	success: boolean;
	response: string;
	cookieHeader: string;
}


 export const login = async (values: z.infer<typeof LoginSchema>) => {
	  const validatedFields = LoginSchema.safeParse(values);

		if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const { email, password } = validatedFields.data;

		try {
			const result = await fetch(`${process.env.BACKEND_API_URL}/api/users/login`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					'API-Key': process.env.BACKEND_API_KEY as string,
					'Accept': 'application/json',
				},
				body: JSON.stringify({ email, password })
			})

			const cookieHeader = result.headers.get('set-cookie');

			const { success, response } = await result.json();

			const data: DataType = {
				success,
				response,
				cookieHeader
			}

			if(!success || !response || !cookieHeader) {
				return data
			}
	
			return data;

		} catch (error) {
			console.error(error)
		}
 }