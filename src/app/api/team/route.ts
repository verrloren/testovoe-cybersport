// import { createTeam } from "@/hooks/createTeam";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
// 	try {
// 		const body = await request.json();
// 		const { name, userId } = body;

		
//     if (!name || !userId) {
//       return NextResponse.json({ error: 'Name and userId are required' }, { status: 400 });
//     }


// 		const newTeam = await createTeam(name, userId);

// 		return NextResponse.json(newTeam, { status: 201 });
// 	} catch (error) {
// 		console.error("Error getting tarot cards:", error);
// 		return NextResponse.error();
// 	}
// }
