'use server'

import { getInterviewees } from "@/hooks/getInterviewee";
import { HistoryTable } from "./history-table";
import { getResultTaro } from "@/hooks/getResult";



export async function HistoryClient() {

	const interviewees = await getInterviewees();
	const id = interviewees[0].id;
	const teamId = interviewees[0].teamId;
	const taroResult = await getResultTaro(id, teamId);

  return (
		<div>
			<HistoryTable taroResult={taroResult} interviewees={interviewees} />
    </div>
  );
}
