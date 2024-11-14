import { db } from "@/lib/db";
import { TaroCard } from "@prisma/client";

export async function createInterviewee(
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