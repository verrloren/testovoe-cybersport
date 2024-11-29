'use server';
import { cookies } from "next/headers";
import { validateToken } from "./validateToken";


export const logout = async () => {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get('access_token')?.value;

		if (token) {
			const { success } = await validateToken();

			if (!success) {
				return { success: false, response: "Invalid token" };
			}

			if (success) {
				cookieStore.delete('access_token');
			}

		}

		return Response.json({ success: true, response: "Logged out successfully" });
	} catch (error) {
		console.error(error);
		return { success: false, response: "Error occurred" };
	}
}