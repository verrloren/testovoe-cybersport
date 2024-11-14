import { db } from "@/lib/db";


export async function getMembers() {
	try {
		const members = await db.member.findMany({
			select: {
				id: true,
				name: true,
				taroCard: true,
				dateOfBirth: true,
			},
		});
		return members.map(member => ({
			...member,
		}));
	} catch (error) {
    console.error("Error fetching members:", error);
    throw error;
}
}