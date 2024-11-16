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

export async function getResultById(id: string, teamId: string) {
  try {
    const result = await db.result.findFirst({
      where: {
        intervieweeId: id,
        teamId: teamId,
      },
      select: {
        id: true,
        intervieweeId: true,
        teamId: true,
        cardId: true,
        compatibilityTaroPercent: true,
        compatibilityTaroDescription: true,
        compatibilityAstroPercent: true,
        compatibilityAstroDescription: true,
        date: true,
      },
    });

    // Return null instead of throwing error
    return result || null;

  } catch (error) {
    console.error("Error fetching result:", error);
    return null; // Return null on error
  }
}