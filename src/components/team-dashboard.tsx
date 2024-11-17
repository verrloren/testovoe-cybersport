'use server'

import { getTeams } from '@/hooks/getTeams';
import { TeamClient } from './team-client';
import { TeamType } from '@/lib/types';
import getTaroCards from '@/hooks/getTaroCards';
import { CreateTeamButton } from './ui/create-team-button';


// interface TeamDashboardProps {}

export async function TeamDashboard() {

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-expect-error

	const teams: TeamType[] = await getTeams();
	const taroCards = await getTaroCards();
	

	return (
		<div className='relative min-h-screen'>
			<CreateTeamButton />
			<TeamClient taroCards={taroCards} teams={teams}  />
		</div>
	)
}

