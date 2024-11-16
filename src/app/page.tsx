import Container from "@/components/container";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { TeamDashboard } from "@/components/team-dashboard";

export default async function HomePage() {

	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		redirect('/auth/login')
	}

  return (
    <>
			<Container>
				
				<TeamDashboard  />

			</Container>
    </>
  );
}