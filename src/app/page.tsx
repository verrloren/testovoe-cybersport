import { ActionButtons } from "@/components/action-buttons";
import Container from "@/components/container";
import { ProjectsTable } from "@/components/projects-table";
import { ProjectsCombobox } from "@/components/ui/projects-combobox";

export default async function HomePage() {

	const result = await fetch(`${process.env.BACKEND_API_URL}/setcookie`, {
		method: 'GET',
		cache: 'force-cache',
		headers: {
			'Content-Type': 'application/json',
		}
	})
	console.log(result)

	






  return (
    <main className="min-h-screen w-full relative overflow-hidden ">

			<div className="radial-ellipse-dashboard w-full  aspect-square absolute -right-[10%] xl:-right-[50%] -top-[50%] xl:-top-[120%] overflow-hidden"></div>

			<Container>
				
			<div className="w-full relative pt-44 flex flex-col justify-center gap-y-16">
			
				<div className="flex flex-col md:flex-row gap-y-8 items-center md:justify-between">
					<ProjectsCombobox />
					<ActionButtons />
				</div>

				 <div className="h-full w-full">

						<ProjectsTable />
				</div> 


			</div>

			</Container>
    </main>
  );
}