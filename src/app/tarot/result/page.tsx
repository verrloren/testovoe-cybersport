/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TarotResultCard } from '@/components/tarot-result-card';
import { getIntervieweeById } from '@/hooks/getInterviewee';
import getTaroCard from '@/hooks/getTaroCard';
import { db } from '@/lib/db';


interface TarotResultPageProps {
	searchParams: {
		id: string;
		teamId: string;
	}
}

export default async function TarotResultPage({ searchParams }: TarotResultPageProps) {

	const { id, teamId } = await searchParams;

	if (!id || !teamId) {
    return <div className="text-red-500">Missing required parameters</div>;
  }
	const result = await db.result.findFirst({
		where: {
			intervieweeId: id,
			teamId: teamId,
		},
		include: {
			card: true, // Include related TaroCard data if needed
			team: true, // Include related Team data if needed
			interviewee: true, // Include related Interviewee data if needed
		},
	});



	// const result = await getResultTaro(id, teamId);

	if (!result) {
		return <div className="text-red-500">Результат не найден</div>;
	}

			//@ts-ignore
	const cardTarot = await getTaroCard(result.cardId);
	const interviewee = await getIntervieweeById(result.intervieweeId);

	if (!result) {
		return <div className="text-red-500">Результат не найден</div>;
	}

  return (
		<div className="w-full flex justify-center items-center">
			{/* @ts-ignore */}
			<TarotResultCard interviewee={interviewee} result={result} cardTarot={cardTarot}  />
	</div>
  );
}