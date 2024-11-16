
import { createIntervieweeAstro } from "@/hooks/createInterviewee";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, date, teamId, countryOfBirth, cityOfBirth } = body;


    if (!name || !date || !teamId || !countryOfBirth || !cityOfBirth) {
      return NextResponse.json({ error: 'Name, surname, date, card, and teamId are required' }, { status: 400 });
    }


    const newInterviewee = await createIntervieweeAstro(name, teamId, new Date(date), countryOfBirth, cityOfBirth);
    return NextResponse.json(newInterviewee, { status: 201 });
  } catch (error) {
    console.error("Error creating new interviewee:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
