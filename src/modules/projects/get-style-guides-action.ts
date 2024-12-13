'use server';

import { getToken } from "../auth/getToken";
import { styleGuidesApi } from "./api";


 export const getStyleGuidesAction = async () => {
		const { token } = await getToken();
		try {
			return await styleGuidesApi.getStyleGuides(token);
		} catch (error) {
			console.error(error)
		}
 }