import { db } from "@/lib/db"

export const getUserByEmail = async (email: string) => {
	try {
		const user = await db.user.findUnique({ where: { email}});

		return user;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
	return null;
}}

export const getUserById = async (id: string) => {
	try {
		const user = await db.user.findUnique({ where: { id}});

		return user;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
	return null;
}}

