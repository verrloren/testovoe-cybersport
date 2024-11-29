'use server';

import { getToken } from "./getToken";


 export const sendProjectFiles = async (formData: FormData) => {

	const { token } = await getToken();

	if (!token) {
		return { success: false, response: "No access token" };
	}



	if (!formData) {
		return { success: false, response: "Invalid Files" };
	}

		try {

			const response = await fetch(`${process.env.BACKEND_API_URL}/api/upload/files`, {
				method: 'POST',
				body: formData,
				headers: {
					'Authorization': `Bearer ${token}`,
					'API-Key': process.env.BACKEND_API_KEY as string
				},
			});

			const responseJSON = await response.json();
			

			if (!responseJSON.success) {
				return { success: false, response: `HTTP error! status: ${response.status}` };
		}


			return responseJSON;
		} catch (error) {
			if (error instanceof Error) {
				return { success: false, response: error.message };
			} else {
				return { success: false, response: "An unknown error occurred" };
			}
		}
 }


// 'use server'

// import { cookies } from "next/headers";

// export const sendProjectFiles = async (formData: FormData): Promise<UploadResponse> => {
// 	try {
// 			const cookieStore = await cookies();
// 			const token = cookieStore.get('access_token')?.value;

// 			if (!token) {
// 					return { success: false, response: "No access token" };
// 			}

// 			// Ensure subject is explicitly a string
// 			const subject = formData.get('subject');
// 			if (!subject || typeof subject !== 'string') {
// 					return { success: false, response: "Subject must be a string" };
// 			}

// 			const response = await fetch(`${process.env.BACKEND_API_URL}/api/upload/files`, {
// 					method: 'POST',
// 					body: formData,
// 					headers: {
// 							'Authorization': `Bearer ${token}`,
// 							'API-Key': process.env.BACKEND_API_KEY as string,
// 							// Explicitly set content type
// 							'Accept': 'application/json', // Ensure backend expects JSON response
// 					},
// 			});

// 			if (!response.ok) {
// 					const errorText = await response.text();
// 					return { 
// 							success: false, 
// 							response: `Upload failed: ${response.status} - ${errorText}` 
// 					};
// 			}

// 			const data = await response.json();
// 			return { success: true, response: data };
// 	} catch (error) {
// 			return { 
// 					success: false, 
// 					response: error instanceof Error ? error.message : "Upload failed" 
// 			};
// 	}
// };