import Container from "@/components/container";
import getTaroCards from "@/hooks/getTaroCards";
import { getTeams } from "@/hooks/getTeams";
import { TarotCardType, TeamType } from '../../lib/types';
import { AstroForm } from "@/components/astro-form";



export default async function AstroPage() {

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-expect-error
	const teams: TeamType[] = await getTeams();
	console.log(teams)	

  return (
	<>
    <Container>
      <div>
				{teams ? (
					<AstroForm teams={teams} />
				) : (
					<h3 className="text-white text-3xl text-bold mt-8 text-center">Сначала нужно создать команду</h3>
				)}
        


      </div>
    </Container>
		</>
  );
}
