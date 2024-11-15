import { db } from '@/lib/db';
import { NextApiRequest } from 'next';
import { createMember } from "@/hooks/createMember";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, { params }: { params: { teamId: string } }) {

	const { teamId } = params;

	if (!teamId) {
		return NextResponse.json({ error: 'Team ID is required' }, { status: 400 });
	}
  try {
    const members = await db.member.findMany({
      where: { teamId: teamId as string },
      include: {
        taroCard: true,
      },
    });

    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, date, card, teamId } = body;

    if (!name || !date || !card || !teamId) {
      return NextResponse.json({ error: 'Name, surname, date, card, and teamId are required' }, { status: 400 });
    }


    const newMember = await createMember(name, date, card, teamId);
    return NextResponse.json(newMember, { status: 201 });
		
  } catch (error) {
    console.error("Error creating new member:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}