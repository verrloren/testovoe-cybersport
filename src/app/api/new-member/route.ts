import { createMember } from "@/hooks/createMember";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstname, surname, date, card, teamId } = body;

    if (!firstname || !surname || !date || !card || !teamId) {
      return NextResponse.json({ error: 'Name, surname, date, card, and teamId are required' }, { status: 400 });
    }

    const name = `${firstname} ${surname}`;
    const newMember = await createMember(teamId, name, date, card);
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error("Error creating new member:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}