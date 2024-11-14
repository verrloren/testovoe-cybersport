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

export const createNotification = async (data: { userId: string, message: string }) => {

	const notification = await db.notification.create({ data });

	return notification;
}


export const getNotificationsByUser = async (userId: string) => {
	const notifications = await db.notification.findMany({ where: { userId }});

	return notifications;
}

export const getPriceDifference = async (userId: string) => {
	const notifications = await db.notification.findMany({
		where: {
			userId,
			message: {
				contains: "Price has increased"
			}
		}
	});

	return notifications;
}

export const deleteNotification = async (id: string) => {
	const notification = await db.notification.delete({ where: { id }});

	return notification;
}