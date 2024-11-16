import { db } from "@/lib/db";
import { TaroCard } from "@prisma/client";

export async function createIntervieweeTarot(
  name: string,
  teamId: string,
  date: Date,
  card: TaroCard
) {
  try {
    const interviewee = await db.interviewee.create({
      data: {
        name,
        dateOfBirth: date,
        taroCard: {
          connect: { id: card.id },
        },
        team: {
          connect: { id: teamId },
        },
      },
    });
    return interviewee;
  } catch (error) {
    console.error("Error creating interviewee:", error);
    throw error;
  }
}
export async function createIntervieweeAstro(
  name: string,
  teamId: string,
  date: Date,
	countryOfBirth: string,
	cityOfBirth: string
) {
  try {
    const interviewee = await db.interviewee.create({
      data: {
        name,
				countryOfBirth,
				cityOfBirth,
        dateOfBirth: date,
        team: {
          connect: { id: teamId },
        },
      },
    });
    return interviewee;
  } catch (error) {
    console.error("Error creating interviewee:", error);
    throw error;
  }
}