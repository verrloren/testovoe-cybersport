import { getToken } from "./getToken";


export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {

	const { token } = await getToken();

	if (!token) {
		return { success: false, response: "No access token" };
	}

	const headers = {
		...options.headers,
		"Content-Type": "application/json",
		"X-API-KEY": process.env.BACKEND_API_KEY as string,
		'Authorization': `Bearer ${token}`,
	}

	const response = await fetch(url, {
		...options,
		headers
	})

	const responseJSON = await response.json();

  return responseJSON;
};