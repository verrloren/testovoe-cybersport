import { ActionButtons } from "@/components/action-buttons";
import Container from "@/components/container";
import { ProjectsTable } from "@/components/projects-table";
import { ProjectsCombobox } from "@/components/ui/projects-combobox";
import { projects } from "@/lib/data";

export default async function HomePage() {

  return (
		<>
		<main className="min-h-screen w-full relative">

			{/* sphere */}
			<div className="radial-ellipse-dashboard w-full aspect-square
			fixed right-0 -top-[20%] sm:-top-1/4 md:-top-1/4 lg:-top-[50%]
			  xl:-top-[60%] "></div>

			<Container>
				
			<div className="w-full relative pt-44 flex flex-col justify-center gap-y-6 md:gap-y-16">
			
				<div className="w-full flex flex-col md:flex-row gap-y-16 items-center justify-center md:justify-between">
					<ProjectsCombobox projects={projects} />
					<ActionButtons />
				</div>

				 <div className="h-full w-full">
						{projects.length > 0 && (
							<ProjectsTable projects={projects} />
						)}
				</div> 


			</div>

			</Container>
    </main>
		</>
  );
}


