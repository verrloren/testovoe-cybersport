// import { getUser } from "@/action/getUser";

import Container from "@/components/container";
import { NpxInfo } from "@/components/npx-info";
import UploadComponent from "@/components/upload-component";

export default async function StartPage() {

	// const currentUser = await getUser();
	// console.log(currentUser)

  return (
    <Container>
			<main className="w-full h-screen relative flex flex-col md:flex-row 
			justify-center items-center xl:gap-x-12 2xl:gap-x-20 md:gap-x-8 overflow-x-hidden">
			
						<div className="md:block md:w-1/3 h-full hidden"></div>
			
						<div className="w-2/3 sm:w-1/2 md:w-2/3 mt-28 md:mt-0 h-full flex flex-row items-center justify-center relative">
							<UploadComponent />
						</div>

							<div className="w-full  md:w-1/3 h-full flex flex-col justify-center items-center md:items-start">
								<NpxInfo />
							</div>
			</main>
		</Container>
  );
}
