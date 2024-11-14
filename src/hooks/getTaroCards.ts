import { db } from "@/lib/db";
import { TarotCard } from "@/lib/types";

export default async function getTaroCards(): Promise<TarotCard[]> {
  try {
    const tarotCards = await db.taroCard.findMany();
    return tarotCards.map(card => ({
      ...card,
      meaning: card.meaning ?? undefined,
      strength: card.strength ?? undefined,
      weakness: card.weakness ?? undefined,
    }));
  } catch (error) {
    console.error("Error fetching tarot cards:", error);
    throw error;
  }
}