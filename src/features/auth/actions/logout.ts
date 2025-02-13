'use server';

import { cookies } from "next/headers";

import { validateToken } from "@/features/auth";
import { ResponseDto } from "@/shared";


export const logout = async (): Promise<ResponseDto> => {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get('access_token')?.value;
		if (token) {
			const { success } = await validateToken();
			if (!success) {
				return { success: false, response: "Invalid token" };
			}
		}
		cookieStore.delete('access_token');
		return { success: true, response: "Logged out successfully" };
	} catch (error) {
		console.error(error);
		return { success: false, response: "Error occurred" };
	}
}