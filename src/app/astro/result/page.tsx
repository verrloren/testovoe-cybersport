'use server';

import { getIntervieweeById } from '@/hooks/getInterviewee';
import { AstrogramaClient } from '../../../components/astrograma-client';

export default async function AstroResultPage({ searchParams }: { searchParams: { id: string; teamId: string } }): Promise<JSX.Element> {

	const { id, teamId } = await searchParams;

	const interviewee = await getIntervieweeById(id);

	return (
		<div>
			<AstrogramaClient interviewee={interviewee} id={id} teamId={teamId} />
		</div>
	)
}
