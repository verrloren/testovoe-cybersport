// 'use server';

// type DataType = {
// 	success: boolean;
// 	response: string;
// }

//  export const getProjects = async () => {


// 		try {
// 			const result = await fetch(`${process.env.BACKEND_API_URL}/api/projects`, {
// 				method: 'DELETE',
// 				credentials: 'include',
// 				cache: 'force-cache',
// 				headers: {
// 					'Content-Type': 'application/json',
// 					'API-Key': process.env.BACKEND_API_KEY as string
// 				},
// 			})

// 			const { success, response } = await result.json();

// 			const data: DataType = {
// 				success,
// 				response
// 			}

// 			if(!success || !response) {
// 				return data
// 			}
	
// 			return data;

// 		} catch (error) {
// 			console.error(error)
// 		}
//  }