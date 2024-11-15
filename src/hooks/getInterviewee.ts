import { db } from "@/lib/db";
import { IntervieweeType } from "@/lib/types";

export async function getInterviewees(): Promise<IntervieweeType[]> {
  try {
    const interviewee = await db.interviewee.findMany({
			select: {
				id: true,
				name: true,
				dateOfBirth: true,
				teamId: true
		}});
		
		if (!interviewee) {
		  throw new Error(`Tarot card with id not found`);
		}
		return interviewee;
  } catch (error) {
    console.error("Error fetching tarot cards:", error);
    throw error;
  }
}


export async function getIntervieweeById(id: string): Promise<IntervieweeType> {
  try {
    const interviewee = await db.interviewee.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				name: true,
				dateOfBirth: true,
				teamId: true
		}});
		
		if (!interviewee) {
		  throw new Error(`Tarot card with id ${id} not found`);
		}
		return interviewee;
  } catch (error) {
    console.error("Error fetching tarot cards:", error);
    throw error;
  }
}