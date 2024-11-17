import { db } from "@/lib/db";
import { TarotCardType } from "@/lib/types";

export async function createIntervieweeTarot(
  name: string,
  teamId: string,
  date: Date,
  taroCard: TarotCardType
) {
  try {
    const interviewee = await db.interviewee.create({
      data: {
        name,
        dateOfBirth: date,
        taroCard: {
          connect: { id: taroCard.id },
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