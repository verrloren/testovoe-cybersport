import Container from "@/components/container";
import { TarotForm } from "@/components/tarot-form";
import getTaroCards from "@/hooks/getTaroCards";
import { getTeams } from "@/hooks/getTeams";
import { TarotCardType, TeamType } from '../../lib/types';
import { SparklesCore } from "@/components/ui/sparkles";



export default async function TarotPage() {

	const taroCards: TarotCardType[] = await getTaroCards();
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-expect-error
	const teams: TeamType[] = await getTeams();
	console.log(teams)	

  return (
	<>
	{/* [#07050A pink 0D090E  blue040612 red0D0505 0a080d #777]  */}
		<div className="w-full bg-gradient-to-b from-[#0a080d] to-black absolute inset-0 h-screen -z-10">
		<SparklesCore
			id="tsparticlesfullpage"
			background="transparent"
			minSize={0.6}
			maxSize={1.4}
			particleDensity={20}
			className="w-full h-full"
			particleColor="#777"
		/>
	</div>
    <Container>
      <div>
				{teams ? (
					<TarotForm teams={teams} taroCards={taroCards} />
				) : (
					<h3 className="font-libreFranklin text-white text-3xl text-bold mt-8 text-center">You need to create a team first.</h3>
				)}
        


      </div>
    </Container>
		</>
  );
}
