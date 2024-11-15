import { db } from "@/lib/db";
import { TarotCardType } from "@/lib/types";

export default async function getTaroCard(id: string): Promise<TarotCardType> {
  try {
    const tarotCard = await db.taroCard.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				name: true,
				url: true,
				meaning: true,
				strength: true,
				weakness: true,
		}});
		
		if (!tarotCard) {
		  throw new Error(`Tarot card with id ${id} not found`);
		}
		return tarotCard;
  } catch (error) {
    console.error("Error fetching tarot cards:", error);
    throw error;
  }
}