import { db } from "@/lib/db";

export async function getResultTaro(id: string, teamId: string) {
	try {
    const result = await db.result.findFirst({
      where: {
        intervieweeId: id,
        teamId,
      },
    });

    return result
  } catch (error) {
    console.error('Error fetching result:', error);
  }
}
