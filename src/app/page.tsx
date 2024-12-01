/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getProjects } from "@/action/getProjects";
import { getStyleGuides } from "@/action/getStyleGuides";
import { ActionButtons } from "@/components/action-buttons";
import Container from "@/components/container";
import { ProjectsTable } from "@/components/projects-table";
import { ProjectsCombobox } from "@/components/ui/projects-combobox";
import { Project } from "@/lib/types";

export default async function HomePage() {

  const projectsResponse = await getProjects();
  const styleGuidesResponse = await getStyleGuides();
	const styleGuides = styleGuidesResponse?.response;

	console.log(projectsResponse);
	console.log(styleGuides);

	
  if (!projectsResponse?.success) {
    return <div>Failed to load projects</div>;
  }

	//@ts-expect-error
  const transformedProjects: Project[] = projectsResponse.response.map((project: Project) => ({
    id: project.id,
    name: project.name,
    project_status: project.project_status || 'warning',
    last_edit_date: project.last_edit_date,
    code_reviews: project.code_reviews || [],
  }));


  return (
		<>
		<main className="min-h-screen w-full relative">

			{/* sphere */}
			<div className="radial-ellipse-dashboard w-full aspect-square
			fixed right-0 -top-[20%] sm:-top-1/4 md:-top-1/4 lg:-top-[40%]
			  xl:-top-[60%] "></div>

			<Container>
				
			<div className="w-full relative pt-44 md:pt-52 lg:pt-60 2xl:pt-72 flex flex-col justify-center 
			gap-y-6 md:gap-y-16 xl:gap-y-20">
			
				<div className="w-full flex flex-col md:flex-row gap-y-16 items-center justify-center md:justify-between">
					<ProjectsCombobox projects={transformedProjects} />
					{/* @ts-expect-error */}
					<ActionButtons styleGuides={styleGuides} />
				</div>

				 <div className="h-full w-full">
						{transformedProjects.length > 0 && (
							<ProjectsTable />
						)}
				</div> 


			</div>

			</Container>
    </main>
		</>
  );
}


