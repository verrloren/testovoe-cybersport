import { db } from "@/lib/db";
import { TaroCard } from "@prisma/client";

export async function createMember(teamId: string, name: string, date: Date, card: TaroCard) {
  try {
    const member = await db.member.create({
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
    return member;
  } catch (error) {
    console.error("Error adding member to team:", error);
    throw error;
  }
}