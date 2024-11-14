import { db } from "@/lib/db";

export async function createTeam(name: string, userId: string) {
  try {
    const team = await db.team.create({
      data: {
        name,
        userId
      },
    });
    return team;
  } catch (error) {
    console.error("Error creating team:", error);
    throw error;
  }
}