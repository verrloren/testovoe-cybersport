import Container from "@/components/container";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
// import { HistoryClient } from "@/components/history-client";
import { TeamDashboard } from "@/components/team-dashboard";
import { SparklesCore } from "@/components/ui/sparkles";

export default async function HomePage() {

	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		redirect('/auth/login')
	}

  return (
    <>
			<div className="w-full bg-gradient-to-b from-[#0D090E] to-black absolute inset-0 h-full -z-10">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#4a4a4a"
        />
      </div>
			<Container>
				
				<TeamDashboard  />
				{/* <HistoryClient /> */}

			</Container>
    </>
  );
}