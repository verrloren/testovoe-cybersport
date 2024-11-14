import { db } from "@/lib/db";


export async function getTeams() {
  try {
    const teams = await db.team.findMany({
      select: {
				id: true,
				name: true,
				members: {
					select: {
						id: true,
						name: true,
						taroCard: true,
						dateOfBirth: true,
					},
				},
			}
    });
    return teams.map(team => ({
      ...team,
    }));
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
}