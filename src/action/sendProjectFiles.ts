'use server';


 export const sendProjectFiles = async (formData: FormData) => {

		if (!formData) {
			return { error: "Invalid Files" };
		}

		try {
			const result = await fetch(`${process.env.BACKEND_API_URL}/api/upload/files`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'API-Key': process.env.BACKEND_API_KEY as string
				},
				body: formData
			})

			if (!result.ok) {
				throw new Error(`HTTP error! status: ${result.status}`);
			}

			const resultJSON = await result.json();

			return resultJSON;
		} catch (error) {
			console.error(error)
		}
 }