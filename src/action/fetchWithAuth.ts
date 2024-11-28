import { cookies } from "next/headers";


export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {

	const cookieStore = await cookies();
	const token = cookieStore.get('access_token')?.value;

	if (!token) {
		return { success: false, response: "No access token" };
	}

	const headers = {
		...options.headers,
		"Content-Type": "application/json",
		"API-Key": process.env.BACKEND_API_KEY as string,
		'Authorization': `Bearer ${token}`
	}

	const response = await fetch(url, {
		...options,
		headers
	})

  return response;
};