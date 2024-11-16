import Container from "@/components/container";
import { TarotForm } from "@/components/tarot-form";
import getTaroCards from "@/hooks/getTaroCards";
import { getTeams } from "@/hooks/getTeams";
import { TarotCardType, TeamType } from '../../lib/types';



export default async function TarotPage() {

	const taroCards: TarotCardType[] = await getTaroCards();
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-expect-error
	const teams: TeamType[] = await getTeams();
	console.log(teams)	

  return (
	<>
	{/* [#07050A pink 0D090E  blue040612 red0D0505 0a080d #777]  */}
    <Container>
      <div>
				{teams ? (
					<TarotForm teams={teams} taroCards={taroCards} />
				) : (
					<h3 className="text-white text-3xl text-bold mt-8 text-center">Сначала нужно создать команду</h3>
				)}
        


      </div>
    </Container>
		</>
  );
}
