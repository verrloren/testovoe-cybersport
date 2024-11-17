import { createIntervieweeTarot } from "@/hooks/createInterviewee";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, date, taroCard, teamId } = body;

    if (!name || !date || !taroCard || !teamId) {
      return NextResponse.json({ error: 'Name, surname, date, card, and teamId are required' }, { status: 400 });
    }


    const newInterviewee = await createIntervieweeTarot(name, teamId, new Date(date), taroCard);
    return NextResponse.json(newInterviewee, { status: 201 });
  } catch (error) {
    console.error("Error creating new interviewee:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
