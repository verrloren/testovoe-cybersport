"use server";

import { getIntervieweeByIdAstro } from "@/hooks/getInterviewee";
import { AstrogramaClient } from "../../../components/astrograma-client";
import { db } from "@/lib/db";
import { getTeamNameById } from "@/hooks/getTeams";

export default async function AstroResultPage({
  searchParams,
}: {
  searchParams: { id: string; teamId: string };
}): Promise<JSX.Element> {
  const { id, teamId } = await searchParams;


  const result = await db.result.findFirst({
    where: {
      intervieweeId: id,
      teamId,
    },
    include: {
      team: true, // Include related Team data if needed
      interviewee: true, // Include related Interviewee data if needed
    },
  });

  if (!result) {
    return <div className="text-red-500">Результат не найден</div>;
  }
  const interviewee = await getIntervieweeByIdAstro(result.intervieweeId);
  const team = await getTeamNameById(result.teamId);


  return (
    <div className="h-screen overflow-hidden">
      <AstrogramaClient
				// @ts-ignore
        team={team}
				// @ts-ignore
        interviewee={interviewee}
				// @ts-ignore
        result={result}
        id={id}
        teamId={teamId}
      />
    </div>
  );
}
