'use server'

import { db } from "@/lib/db";
import { HistoryTable } from "./history-table";



export async function HistoryClient() {

  const interviewee = await db.interviewee.findMany({
    include: {
      results: {
        select: {
          compatibilityTaroPercent: true,
          compatibilityAstroPercent: true,
        }
      }
    }
  });

	// const teams = await db.team.findMany({
	// 	where: {
	// 		id: interviewee.teamId
	// 	},
	// 	select: {
	// 		id: true,
	// 		name: true,
	// 	}
	// });
	const teamIds = [...new Set(interviewee.map(i => i.teamId))]

	const teamName = await db.team.findMany({
    where: {
      id: {
        in: teamIds
      }
    },
		select: {
			id: true,
			name: true,
		}
	});
	const results = await db.result.findMany({
		where: {
			//@ts-ignore
			intervieweeId: interviewee.id,
			//@ts-ignore
			teamId: interviewee.teamId
		},
		select: {
			compatibilityTaroPercent: true,
			compatibilityAstroPercent: true,
		}
	});

  return (
		<>
		{/* @ts-ignore */}
			<HistoryTable teamName={teamName} interviewee={interviewee} results={results} />
		</>
  );
}
