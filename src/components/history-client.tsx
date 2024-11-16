'use server'

import { getInterviewees } from "@/hooks/getInterviewee";
import { HistoryTable } from "./history-table";
import { getResultById } from "@/hooks/getResult";
import { getTeamNameById } from "@/hooks/getTeams";



export async function HistoryClient() {

	const interviewees = await getInterviewees();
	const teamId = interviewees[0]?.teamId;
	const teamsName = teamId ? await getTeamNameById(teamId) : '';

  const results = await Promise.all(
    interviewees.map(async (interviewee) => 
      getResultById(interviewee.id, interviewee.teamId)
    )
  );

	console.log(results);
  return (
		<>
			<HistoryTable 
				teamsName={teamsName} t
				aroResult={results} 
				interviewees={interviewees} 
			/>
		</>
  );
}
