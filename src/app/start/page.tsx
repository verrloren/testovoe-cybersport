// import { getUser } from "@/action/getUser";

import Container from "@/components/container";
import UploadComponent from "@/components/upload-component";

export default async function StartPage() {

	// const currentUser = await getUser();
	// console.log(currentUser)

  return (
    <Container>
			<main className="w-full h-screen relative flex flex-col md:flex-row justify-center items-center xl:gap-x-12 md:gap-x-8">
			
						<div className="md:block md:w-1/3 h-full hidden"></div>
			
						<div className="w-full md:w-1/3 h-full flex flex-row items-center justify-center relative">
							<UploadComponent />
						</div>
							<section className="w-full md:w-1/3 h-full flex flex-col justify-center items-start">
								<h3 className="text-8xl font-poppins text-neutral-200 mb-2">OR</h3>
								<p className="text-neutral-600 text-lg font-ibmPlexMono">~ npx evrz analize</p>
							</section>
			</main>
		</Container>
  );
}
