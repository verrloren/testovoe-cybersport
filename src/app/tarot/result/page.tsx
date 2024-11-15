/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TarotResultCard } from '@/components/tarot-result-card';
import { getIntervieweeById } from '@/hooks/getInterviewee';
import { getResultTaro } from '@/hooks/getResult';
import getTaroCard from '@/hooks/getTaroCard';


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

	const result = await getResultTaro(id, teamId);
	//@ts-expect-error
	const cardTarot = await getTaroCard(result.cardId);
	//@ts-expect-error
	const interviewee = await getIntervieweeById(result.intervieweeId);

	if (!result) {
		return <div className="text-red-500">Result not found</div>;
	}

	console.log(result);

  return (
		<div className="w-full flex justify-center items-center">
			<TarotResultCard interviewee={interviewee} result={result} cardTarot={cardTarot}  />
	</div>
  );
}